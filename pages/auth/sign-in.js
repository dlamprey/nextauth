import Head from "next/head";
import styles from "../../styles/Home.module.css";
import { getCsrfToken, getProviders, signIn } from "next-auth/react";
import { getServerSession, authOptions } from "next-auth/next";
import { Col, Container, Row, Button, Form, Alert } from "react-bootstrap";
import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Page({ csrfToken, providers }) {
  const router = useRouter();
  const { callbackUrl, error } = router.query;
  const [errorToDisplay, setErrorToDisplay] = useState(error);

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container>
        <Row className="justify-content-center">
          <Col xs={12} sm={8} md={6} xl={4}>
            <div className="text-center my-3">
              <Link href="/">Back to Home</Link>
            </div>
            {errorToDisplay && (
              <Alert
                variant="warning"
                dismissible
                onClose={() => setErrorToDisplay("")}
              >
                Invalid credentials.
              </Alert>
            )}

            {Object.values(providers)
              .filter((p) => p.id !== "email")
              .map((provider) => (
                <div key={provider.name}>
                  <Button
                    size="lg"
                    className="w-100 mb-3"
                    onClick={() => signIn(provider.id, { callbackUrl })}
                  >
                    Sign in with {provider.name}
                  </Button>
                </div>
              ))}
            <p className="text-muted text-center mt-3 mb-3">- Or -</p>
            <form method="post" action="/api/auth/signin/email">
              <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
              <input
                name="callbackUrl"
                type="hidden"
                defaultValue={callbackUrl}
              />
              <div className="form-group">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  id="email"
                  name="email"
                  required
                  placeholder="name@address.com"
                />
              </div>
              <Button size="lg" type="submit" className="w-100 my-3">
                Sign in with Email
              </Button>
            </form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);

  // If the user is already logged in, redirect.
  // Note: Make sure not to redirect to the same page
  // To avoid an infinite loop!
  if (session) {
    return { redirect: { destination: "/" } };
  }

  const promises = [getCsrfToken(context), getProviders()];
  const [csrfToken, providers] = await Promise.all(promises);

  return {
    props: { csrfToken, providers: providers ?? [] },
  };
}
