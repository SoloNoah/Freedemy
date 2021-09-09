import Image from 'next/image';

const Card = ({ course }) => {
  const { headline, title, visible_instructors, image_240x135 } = course;

  return (
    <div>
      <h1>{title}</h1>
      <p>{headline}</p>
      <Image src={image_240x135} alt={title} blurDataURL={image_240x135} placeholder='blur' width={240} height={135} />
      <ul>
        {visible_instructors.map((instructor) => {
          return <li key={instructor.url}>{instructor.title}</li>;
        })}
      </ul>
    </div>
  );
};

export default Card;
