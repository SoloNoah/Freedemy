import Head from 'next/head';

import Card from '../../components/card/Card';
import { getAllCourses } from '../../category-data/category';

export default function Category({ category, courses }) {
  return (
    <div>
      <Head>
        <title>Freedemy | {category}</title>
      </Head>
      <h1>Path: {category}</h1>
      <ul>
        {courses.map((course) => {
          return <Card course={course} key={course.id} />;
        })}
      </ul>
    </div>
  );
}

export async function getStaticPaths() {
  const allCategory = getAllCourses();
  const categoryPaths = allCategory.map((singleCategory) => {
    {
      return { params: { category: singleCategory.title } };
    }
  });

  return {
    paths: categoryPaths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const BASE_URL = 'https://www.udemy.com/api-2.0/';
  const searchParams = new URLSearchParams({
    price: 'price-free',
    page_size: 100,
    category: params.category,
  });
  const headers = {
    Accept: 'application/json, text/plain, */*',
    Authorization: `Basic ${process.env.AUTH}`,
    ContentType: 'application/json;charset=utf-8',
  };
  const data = await fetch(BASE_URL + 'courses?' + searchParams, { headers });
  const coursesJSON = await data.json();
  const courses = coursesJSON.results;
  return {
    props: {
      category: params.category,
      courses,
    },
  };
}
