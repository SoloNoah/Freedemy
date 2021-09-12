import Head from 'next/head';

import Card from '../components/card/Card';

import { getData } from '../helper';

export default function Home({ courses }) {
  return (
    <div>
      <Head>
        <title>Freedemy | Home</title>
      </Head>
      <h1>This is a home page for freedemy</h1>
      <ul>
        {courses.map((course) => {
          return <Card course={course} key={course.id} />;
        })}
      </ul>
    </div>
  );
}

export async function getStaticProps() {
  const coursesJSON = await getData();
  const courses = coursesJSON.results.slice(0, 3);

  return {
    props: {
      courses,
    },
  };
}
