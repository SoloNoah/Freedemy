const BASE_URL = 'https://www.udemy.com/api-2.0/';
let params = new URLSearchParams({
  price: 'price-free',
});
const headers = {
  Accept: 'application/json, text/plain, */*',
  Authorization: `Basic ${process.env.AUTH}`,
  ContentType: 'application/json;charset=utf-8',
};

export async function getData(query = null) {
  if (query) {
    params.append('category', query);
  }
  const data = await fetch(BASE_URL + 'courses?' + params, { headers });
  const coursesJSON = await data.json();
  return coursesJSON;
}