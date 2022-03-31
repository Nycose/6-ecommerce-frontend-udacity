# Storefront Frontend Project

This project is for the [Udacity Full Stack JavaScript Developer Nanodegree](https://www.udacity.com/course/full-stack-javascript-developer-nanodegree--nd0067).


## Setup instructions for Udacity Reviewer

```
npm install
```

### Server Information

The server is built as a Node.js application with Express. Instead of persisting data to the Postgres database that was setup during the last project, data is retrevied and modified using plain JavaScript obect literals that simulate a database. This decision was made to keep the code review focused on the project, an Angular app, and not on dealing with additional dependencies and configuring a local database.

Because data is not persisted, but rather an object in memory on the server, restarting the server will revert the data to it's initial state. However, as long as the server is running, any accounts created or orders placed will be saved, allowing for authentication, authorization, order management, and most other functionality you would find on an ecommerce application.

To simulate latency between requests, setTimeout() is used with a 'delay' constant that can be configured in the server.ts file.

```
npm run server
```

### Serve the application

```
npm run start
```

### Testing

```
npm run test
```


## Feature highlights

### Architectural notes

- This application is based heavily on a reactive programming paradigm, specifically utilizing RxJs.
- Services provide Observable-based APIs for the rest of the application to consume.
- RxJs pipes and operators are used to derive new observables from source observables. 
- State is managed through "Store Services" (regular Angular Service purposed for state management) 
- These services use Observables derived from private BehaviorSubjects which multicasts state to consumers.


### Products

- A "Products Home" component encapulates the product list and product card components, providing data to them through a service.
  - The service provides an observable based API for fetching and manipulating products. 
  - The API is consumed by the "Products Home" component template via the async pipe and passed as input to the product list and product card components.
  - This makes the product list and product card components highly reusable as they are not aware of how they are receiving their data.
  - This pattern of separating Smart/Container components from Dumb/Presentational componenets appears frequently throughout the rest of the app.
- Only 1 HTTP request is made to fetch products. As you navigate to different screens and then revisit the products page, no additonal requsts will be made. This state management makes for a much better user experience.


### Cart

- The Cart allows users to add and remove products.
- Removing a product caches the removed product in memory, allowing the user to undo the action which adds the removed product back to the cart.
- Cart items are stored in local storage and persist through browser refreshes.
- The Cart component will not allow users to checkout with an empty cart.


### Checkout

- The checkout page uses reactive forms to manage the form model explicitly in the component, apply validation functions, and create an immutable structure that follows the already present reactive and observable based paradigm. 
- The page includes a complex, multi-step form using the Material Stepper.
- Each individual form control and form group has synchrounous and/or asynchronous validators, each accompanied with an appropriate validation error message. 
- If the user is not logged in, the checkout page will prompt for account information. If the user is logged in, it will not.
- When creating an account, if entering a username that already exists, an asynchronous validator will provide immediate feedback once the control is blurred.
- The valueChanges() observable is utilized to enable and disable certain controls based on the value of another control. 
- The final step in the form displays the last 4 digits of the user's card number through a custom Angular Pipe. The pipe is pure, instead of change detection running a function each time a change detection cycle is triggered, the pure pipe provides a cached result and increased performance.


### Loading

 - A loading component can be displayed by any part of the application that needs it via a shared service.
 - The service provides a showLoadingUntilComplete() method that will turn the loading indivator on until an Observable that is passed to the method has completed. 


### Errors

- An error message component can be displayed by any part of the application that needs it via a shared service.
- Any authentication, authorization, network, or other errors can be caught and passed to the error message service which communicates with the component. 


### Tests

- Tests cover Services, Pipes, Container/Smart Components
- The HttpTestingController is being used to mock and flush http requests
- The ComponentFixture and DebugElement is being used for access to a components and its template
- Jasmine spies are used to fake dependencies
