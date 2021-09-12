import Head from 'next/head';

import Card from '../../components/card/Card';

import { getData } from '../../helper';

import fs from 'fs';
import path from 'path';

export default function Category({ category, courses }) {
  if (!category) {
    return <p>Loading...</p>;
  }
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
  const filePath = path.join(process.cwd(), 'category-data', 'category.json');
  const jsonData = fs.readFileSync(filePath);
  const allCategory = JSON.parse(jsonData);
  const categoryPaths = allCategory.categories.map((singleCategory) => {
    {
      return { params: { category: singleCategory.title } };
    }
  });

  return {
    paths: categoryPaths,
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const filePath = path.join(process.cwd(), 'category-data', 'category.json');
  const jsonData = fs.readFileSync(filePath);
  const allCategory = JSON.parse(jsonData);
  const foundCategory = allCategory.categories.find((singleCategory) => singleCategory.title === params.category);

  if (!foundCategory) {
    return { notFound: true };
  }
  // const BASE_URL = 'https://www.udemy.com/api-2.0/';
  // const searchParams = new URLSearchParams({
  //   price: 'price-free',
  //   category: params.category,
  // });
  // const headers = {
  //   Accept: 'application/json, text/plain, */*',
  //   Authorization: `Basic ${process.env.AUTH}`,
  //   ContentType: 'application/json;charset=utf-8',
  // };

  try {
    const coursesJSON = await getData(params.category);
    const courses = coursesJSON.results;

    if (courses.length === 0) {
      return { notFound: true };
    }

    return {
      props: {
        category: params.category,
        courses,
      },
      revalidate: 60,
    };
  } catch (error) {
    return { notFound: true };
  }
}
