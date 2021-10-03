const BASE_URL = 'https://www.udemy.com/api-2.0/';
let params = new URLSearchParams({
  price: 'price-free',
  page: 1,
});

const headers = new Headers({
  Accept: 'application/json, text/plain, */*',
  Authorization: `Basic ${process.env.AUTH}`,
  'Content-Type': 'application/json;charset=utf-8',
  'Access-Control-Allow-Origin': '*',
});

export async function getData(query = null) {
  if (query) {
    params.append('category', query);
  }

  const data = await fetch(BASE_URL + 'courses?' + params, { headers });
  const coursesJSON = await data.json();
  return coursesJSON;
}

export async function getSubCategory(category, query) {
  // params.append()
  const data = await fetch(BASE_URL + 'courses?' + params, { headers });
  const coursesJSON = await data.json();
  return coursesJSON;
}
