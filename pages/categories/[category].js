import Head from 'next/head';

import Card from '../../components/card/Card';
import CheckList from '../../components/checklist/CheckList';
import { getData, getSubCategory } from '../../helper';
import { useState, useEffect } from 'react';

import fs from 'fs';
import path from 'path';

export default function Category({ category, coursesJSON, subCategories, next, previous }) {
  const [page, setPage] = useState(1);
  const [loadedCourses, setLoadedCourses] = useState([]);
  const [previousPage, setPrevious] = useState(previous);
  const [nextPage, setNext] = useState(next);

  useEffect(() => {
    let courses = coursesJSON.results;
    setLoadedCourses(courses);
  }, [setLoadedCourses, coursesJSON]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [loadedCourses]);

  const handleChange = async (value) => {
    let courses = await getSubCategory(category, value);
  };

  const handlePaginate = (e) => {
    let value = e.target.value;

    if (next && value === 'next') {
      setPage(page + 1);
      const request = {
        page: page + 1,
        category,
      };
      fetch('/api/paginate', {
        method: 'POST',
        body: JSON.stringify(request),
      })
        .then((response) => response.json())
        .then((data) => {
          let newCourses = data.coursesJSON;
          newCourses.next ? setNext(true) : setNext(false);
          newCourses.previous ? setPrevious(true) : setPrevious(false);
          setLoadedCourses(newCourses.results);
        });
    }
    if (next && value === 'back') {
      setPage(page - 1);
      const request = {
        page: page - 1,
        category,
      };
      fetch('/api/paginate', {
        method: 'POST',
        body: JSON.stringify(request),
      })
        .then((response) => response.json())
        .then((data) => {
          let newCourses = data.coursesJSON;
          newCourses.next ? setNext(true) : setNext(false);
          newCourses.previous ? setPrevious(true) : setPrevious(false);
          setLoadedCourses(newCourses.results);
        });
    }
  };

  if (!category) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Head>
        <title>Freedemy | {category}</title>
      </Head>
      <h1>Path: {category}</h1>
      <div>
        <CheckList subCategories={subCategories} handleChange={handleChange} />
        <ul>
          {loadedCourses.map((course) => {
            return <Card course={course} key={course.id} />;
          })}
        </ul>
      </div>
      <div>
        {nextPage ? (
          <button onClick={handlePaginate} value='next'>
            Next
          </button>
        ) : (
          <></>
        )}
        {previousPage ? (
          <button onClick={handlePaginate} value='back'>
            Previous
          </button>
        ) : (
          <></>
        )}
      </div>
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
  const subCategories = [...foundCategory.subCategories];

  if (!foundCategory) {
    return { notFound: true };
  }

  try {
    const coursesJSON = await getData(params.category);
    const courses = coursesJSON.results;
    const { next, previous } = coursesJSON;
    if (courses.length === 0) {
      return { notFound: true };
    }

    return {
      props: {
        category: params.category,
        coursesJSON,
        subCategories,
        next,
        previous,
      },
      revalidate: 60,
    };
  } catch (error) {
    return { notFound: true };
  }
}
