const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0", // OpenAPI version
    info: {
      title: "API Generator Tool",
      version: "1.0.0",
      description: "A mini Postman/Swagger-like API Generator built with Node.js + MongoDB"
    },
    servers: [
      {
        url: "http://localhost:5000/api", // base URL for routes
      },
    ],
  },
  apis: ["./routes/*.js"], // scan routes folder for docs
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
