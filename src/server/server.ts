import * as express from 'express';
import * as bodyParser from 'body-parser'
import { PRODUCTS_DB } from './product';
import {ORDER_DB, USER_DB } from './user';

export const app = express();
const port = 3000;
export const delay = 500;

let USER_ID = 1;
let ORDER_ID = 1;


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
    const user = {id: ++USER_ID, ...req.body};
    const userInDb = USER_DB.find(u => u.email === user?.email);

    setTimeout(() => {

        if (userInDb) {
            return res.status(401).send('The email you have entered already exists.');
        }

        const newUser = {...user, isAdmin: false}

        if(!user.username) {
            newUser.username = user.email;
        }

        USER_DB.push(newUser);

        const userProfile = {
            userId: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            isAdmin: false
        };

        console.log('USERS: ', USER_DB)

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
            userId: userInDb.id,
            firstName: userInDb.firstName,
            lastName: userInDb.lastName,
            email: userInDb.email,
            isAdmin: userInDb.isAdmin
        };
    
        return res.send(userProfile);

    }, delay)


})

app.post('/api/checkout', (req, res) => {
    setTimeout(() => {        
        const cart = ORDER_DB;
        const order = {orderId: ++ORDER_ID,...req.body};
    
        cart.push(order);

        console.log('ORDERS: ', ORDER_DB);
    
        return res.send(order);
    }, delay);
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})