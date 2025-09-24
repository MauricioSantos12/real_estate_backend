# Real Estate Backend

A RESTful API for a real estate platform that allows users to save their favourite properties, add comments to each property, and view all the properties and their comments.

## Features

* User registration and login
* Property creation and deletion
* Property image upload and deletion
* Comment creation and deletion
* View all properties and their comments

## Technologies Used

* Node.js
* Express.js
* MySQL
* Zod for schema validation
* Knex for database queries

## How to use

1. Clone the repository
2. Run `npm install` to install the dependencies
3. Run `npm run dev` to start the server
4. Use a tool such as Postman to test the API endpoints

## API Endpoints

### User Endpoints

* `POST /api/users` - Register a new user
* `POST /api/users/login` - Login a user
* `GET /api/users` - Get all users

### Property Endpoints

* `POST /api/properties` - Create a new property
* `GET /api/properties` - Get all properties
* `GET /api/properties/:id` - Get a property by ID
* `PUT /api/properties/:id` - Update a property by ID
* `DELETE /api/properties/:id` - Delete a property by ID

### Property Image Endpoints

* `POST /api/properties/images` - Upload a new property image
* `GET /api/properties/images` - Get all property images
* `GET /api/properties/images/:id` - Get a property image by ID
* `DELETE /api/properties/images/:id` - Delete a property image by ID

### Comment Endpoints

* `POST /api/comments` - Create a new comment
* `GET /api/comments` - Get all comments
* `GET /api/comments/:id` - Get a comment by ID
* `PUT /api/comments/:id` - Update a comment by ID
* `DELETE /api/comments/:id` - Delete a comment by ID

