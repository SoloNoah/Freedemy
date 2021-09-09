import Link from 'next/link';

const CourseLink = (props) => {
  const { course } = props;
  const link = `/categories/${course}`;
  return (
    <Link href={link} as={link}>
      <a>{course}</a>
    </Link>
  );
};

export default CourseLink;
