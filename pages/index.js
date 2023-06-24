import Head from "next/head";
import styles from "../styles/Home.module.css";
import { Col, Container, Row } from "react-bootstrap";
import LoginButton from "../components/LoginButton";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Next Auth Example</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Container>
          <Row className="my-4">
            <Col>
              <LoginButton />
            </Col>
          </Row>
        </Container>
      </main>

      <footer>
        Powered by{" "}
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="/vercel.svg" alt="Vercel" className={styles.logo} />
        </a>
      </footer>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}
