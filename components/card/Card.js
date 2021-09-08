import Image from 'next/image';

const Card = ({ course }) => {
  const { headline, title, visible_instructors } = course;

  return (
    <div>
      <h1>{title}</h1>
      <p>{headline}</p>

      <ul>
        {visible_instructors.map((instructor) => {
          return <li key={instructor.url}>{instructor.title}</li>;
        })}
      </ul>
    </div>
  );
};

export default Card;
