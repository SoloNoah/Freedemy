import Head from 'next/head';

import CourseLink from '../../components/link/CourseLink';

import fs from 'fs';
import path from 'path';

export default function Categories({ categories }) {
  return (
    <div>
      <Head>
        <title>Freedemy | Categories</title>
      </Head>
      <div>This is categories</div>
      <ul>
        {categories.map((course) => {
          return (
            <li key={course.id}>
              <CourseLink course={course.title}></CourseLink>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export async function getStaticProps({ params }) {
  const filePath = path.join(process.cwd(), 'category-data', 'category.json');
  const jsonData = fs.readFileSync(filePath);
  const allCategory = JSON.parse(jsonData);


  if (allCategory.length === 0) {
    return { notFound: true };
  }
  return {
    props: {
      categories: allCategory.categories,
    },
    revalidate: 60,
  };
}
