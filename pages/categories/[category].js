import Head from 'next/head';

import Card from '../../components/card/Card';
import { getAllCourses } from '../../category-data/category';

export default function Category({ category }) {
  console.log('here');
  return (
    <div>
      <Head>
        <title>Freedemy | {category}</title>
      </Head>
      <h1>Path: {category}</h1>
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
  return {
    props: {
      title: params.singleCategory.title,
    },
  };
}
