Traavlr Getaways - Full Stack Web Application

Project Overview
Travlr Getaways is a ful lstack travel application comprised of
- A customer Facing Sit (Express + Handlebars) for browsing trips
- An admin SPA (Angular) for managing trips with secure login (not done)
- A REST API (Express) backend power by MongoDB and Mongoose

Architecture
Frontend 
In this project I used three related but different frontend approaches:
1: Express with HTML and Handlebars
- Server rendered pages for the public facing site. Express routes load data and pass it into Handlebar templates. This is a simple solution thats good for mostly static content with dynamic data being loaded in
2: Javascript
- Used on the public side where needed for interactivity, but the main page content still comes from the server
3: Angular
- A single page application that loads once and updates the UI without full page reloads. Routing, forms and HTTP calls all happen in the browser. This works better for the admin workflow (list, add, edit, trips) because the app runs within a single page, not having to navigate a lot of pages.

MongoDB (NoSQL)
- MongoDB was a fit for this project because the trip data is document shaped and does not require heavy relational joins. Mongoose made it easy to define a schema, seed data and expose CRUD through the API. Being a NoSQL database, MongoDB makes sense to use in an iterative design as its very flexible when it comes to changes

Functionality
JSON vs Javasdcript
- Javascript is a programing language using logic, control flow and objects in memory
- JSON is a dat format for exchanging structured data

The backend returns JSON from endpoints (i.e. GET /api/trips). The Angular admin uses HTTPClient to call those endpoints and work with the JSON as an object. The public Express site can also consume the same API. JSON is the shared contract between layers, same trip fields on the server, in the database and in the SPA

Refactoring and Reusable UI components
Examples of refactoring that improve the app:
- Moving from static trip data in the ANgular app to a TripData service that calls the REST API
- Splitting the trip listing into TripListing and the TripCard components so each car is reusable and easier to maintain
- HTTP Logic in one service (getTrips, addTrip, getTrip, updateTrip) insteads of duplicating calls in components
- Adding routing so listing, adding and editing are separate views insteads of one overloaded page

Benefits of Reusable UI Components: Less duplicated markup, consistent styling, easier updates (change the card once, it updates everywhere), and clearer separation of concerns.

Testing
REST endpoints are tested by method and path
- GET /api/trips - Returns a list of trips
- POST /api/trips - Creates a trip
- GET /api/trips/:tripCode - Returns one trip
- PUT /api/trips/:tripCode - Updates a trip
- POST /api/login - For authentication (not working yet)

I used tools like Edge, Angular UI and Postman. 

Reflection
This course helped me build a complete path from UI to data base, server rendered pages, a REST API, a document database and a modern SPA with forms and routing. I practiced debugging real integration issues with things like CORS, route registration form modules in Angular and JWT endpoints.

Skills that make me more marketable:
- Full stack workflow experience (Express, MongoDB, Angular)
- REST API design and testing
- Component based frontend structure and services
- More Github experience
