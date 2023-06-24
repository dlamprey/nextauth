import Head from "next/head";
import styles from '../../styles/Home.module.css';
import Link from "next/link";
import { Card, Col, Container, Row } from 'react-bootstrap';

export default function Page() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Next Auth - Magic Link Sent</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container>
        <Row className="justify-content-center">
          <Col xs={12} md={8} xl={5} className="pt-5">
          <div className="text-center my-3">
              <Link href="/">Back to Home</Link>
            </div>
            <h1>Almost there...</h1>
            <p>
              We sent a login link to your email address. You should receive it
              momentarily. Be sure to check your spam / promotions folders if it
              is not in your inbox.
            </p>
            <Card>
              <Card.Header className="justify-content-center text-center">
                <h3 className="mb-0">IMPORTANT</h3>
              </Card.Header>
              <Card.Body>
                <b></b>The link will allow you to{' '}
                <b>login from the device where it is used</b> and can{' '}
                <b>only be used once</b>. If you need to login from another
                device, you will need to login again from that device to have
                another link sent.
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
