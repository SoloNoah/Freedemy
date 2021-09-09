import Head from 'next/head';

import Card from '../components/card/Card';

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
  const BASE_URL = 'https://www.udemy.com/api-2.0/';
  const params = new URLSearchParams({
    price: 'price-free',
  });
  const headers = {
    Accept: 'application/json, text/plain, */*',
    Authorization: `Basic ${process.env.AUTH}`,
    ContentType: 'application/json;charset=utf-8',
  };
  const data = await fetch(BASE_URL + 'courses?' + params, { headers });
  const coursesJSON = await data.json();
  const courses = coursesJSON.results.slice(0, 3);

  return {
    props: {
      courses,
    },
  };
}
