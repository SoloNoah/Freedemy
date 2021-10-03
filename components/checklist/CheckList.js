const CheckList = ({ subCategories, handleChange }) => {
  const handleClick = (event) => {
    handleChange(event.target.value);
  };

  const sub = subCategories.map((category) => {
    return (
      <div key={category.id} onChange={handleClick}>
        <input type='radio' id='subcategory' name='subcategory' value={category.title} />
        <label>{category.title}</label>
      </div>
    );
  });

  return <div>{sub}</div>;
};

export default CheckList;
