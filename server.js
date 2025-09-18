const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const apiRouter = require('./routes/apiRoutes');
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");


dotenv.config();



//middleware
const app = express();

app.use(cors());
app.use(bodyParser.json());

// Swagger Docs Route
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api", apiRouter)

const PORT = process.env.PORT || 5000;
if (connectDB()) {
  app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
}