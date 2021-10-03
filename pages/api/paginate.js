const BASE_URL = 'https://www.udemy.com/api-2.0/';
const headers = new Headers({
  Accept: 'application/json, text/plain, */*',
  Authorization: `Basic ${process.env.AUTH}`,
  'Content-Type': 'application/json;charset=utf-8',
  'Access-Control-Allow-Origin': '*',
});
let params = new URLSearchParams({
  price: 'price-free',
  page_size: 12,
});

async function paginateHandler(req, res) {
  if (req.method === 'POST') {
    let index = JSON.parse(req.body);
    params.set('page', index.page);
    params.set('category', index.category);

    try {
      const data = await fetch(BASE_URL + 'courses?' + params, { headers });
      const coursesJSON = await data.json();
      res.status(200).json({ coursesJSON });
    } catch (error) {
      res.status(500).send({ msg: 'Error fetching courses' });
    }
  }
}

export default paginateHandler;
