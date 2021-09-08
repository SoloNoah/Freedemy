import Head from 'next/head';

import CourseLink from '../../components/link/CourseLink';

import { getAllCourses } from '../../category-data/category';

export default function Categories() {
  const allCategory = getAllCourses();
  return (
    <div>
      <Head>
        <title>Freedemy | Categories</title>
      </Head>
      <div>This is categories</div>
      <ul>
        {allCategory.map((course) => {
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
