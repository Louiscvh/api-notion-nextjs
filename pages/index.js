import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
const { Client } = require("@notionhq/client");

const notion = new Client({ auth: process.env.NOTION_API_KEY });

export default function Home({ students }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Mes élèves</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Bienvenue sur ma liste d'élèves !</h1>

        <p className={styles.description}>
          Modify the content of the 
          <code className={styles.code}>Elèves</code> database for refresh the page content. 
        </p>

        <div className={styles.grid}>
          {students.map((student) => (
            <a
              key={student.id}
              href="https://nextjs.org/docs"
              className={styles.card}
            >
              <h2>{student.properties.Name.title[0]?.text.content || 'No name'} &rarr;</h2>
              <p>{student.properties.Age.number || 'No age'}</p>
              <div className={styles.card__grid}>
              {student.properties.Knowledge.multi_select.map(know => (
                <span>{know.name}</span>
              ))}
              </div>
            </a>
          ))}
        </div>
      </main>

      <footer className={styles.footer}>
        <p>Made by Louis Cavecchi</p>
      </footer>
    </div>
  );
}

export async function getStaticProps() {
  const response = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID,
  });

  return {
    props: {
      students: response.results,
    },
    revalidate: 1
  };
}
