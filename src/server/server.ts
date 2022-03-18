import * as express from 'express';
import { PRODUCTS_DB } from './product';

const app = express();
const port = 3000;
const delay = 3000;

app.get('/api/products', (req, res) => {
    setTimeout(() => { res.send(PRODUCTS_DB) }, delay);
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})