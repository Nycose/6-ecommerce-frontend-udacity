import * as express from 'express';
import * as bodyParser from 'body-parser'
import { PRODUCTS_DB } from './product';
import {USER_DB } from './user';

export const app = express();
const port = 3000;
export const delay = 500;

app.use(bodyParser.json())

app.get('/api/products', (req, res) => {
    setTimeout(() => {
        return res.send(PRODUCTS_DB);
    }, delay);  
})

app.get('/api/users', (req, res) => {
    setTimeout(() => {
        return res.send(USER_DB);
    }, delay);  
})


app.get('/api/products/:productId', (req, res) => {
    setTimeout(() => {
        const {productId} = req.params
        const product = PRODUCTS_DB.find(product => product.id === Number(productId));
        return res.send(product);
    }, delay);    
})


app.post('/api/products', (req, res) => {
    setTimeout(() => {        
        const product = req.body;
        PRODUCTS_DB.push(product);
        return res.send(product);
    }, delay);
})


app.post('/api/register', (req, res) => {
    const user = req.body;
    const userInDb = USER_DB.find(u => u.email === user?.email);

    setTimeout(() => {

        if (userInDb) {
            return res.status(401).send('The email you have entered already exists.');
        }

        const newUser = {...user, isAdmin: false}

        USER_DB.push(newUser);

        const userProfile = {
            userId: 1,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            isAdmin: false
        };

        console.log(USER_DB)

        return res.send(userProfile)


    }, delay)
});

app.post('/api/login', (req, res) => {
    const user = req.body;
    const userInDb = USER_DB.find(u => u.email === user?.email);

    setTimeout(() => {

        if (!userInDb || userInDb.password !== user.password) { 
            return res.status(401).send('The email or password you have entered is incorrect.');
        }

        const userProfile = {
            firstName: userInDb.firstName,
            lastName: userInDb.lastName,
            email: userInDb.email,
            isAdmin: userInDb.isAdmin
        };
    
        return res.send(userProfile);

    }, delay)


})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})