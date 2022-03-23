export const USER_DB = [
    {
        id: 1,
        firstName: 'Admin',
        lastName: 'User',
        username: 'udacity',
        email: 'admin@udacity.com',
        password: 'Welcome',
        isAdmin: true
    }
]


export const ORDER_DB = [
    {
        userId: 1,
        orderId: 1,
        cart: [{
            id: 1,
            title: 'Salad w/ Protein',
            price: 10.75,
            category: 'Salad',
            description: 'Lorem ipsum',
            image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80',
            quantity: 3,
            total: 3 * 10.75
        }],
    }
]