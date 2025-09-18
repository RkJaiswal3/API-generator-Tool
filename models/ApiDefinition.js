const mongoose = require('mongoose');

const apiDefinitionSchema = new mongoose.Schema({
  name: { type: String, required: true },         // API name
  method: { type: String, required: true },       // GET, POST, PUT, DELETE
  endpoint: { type: String, required: true },     // /users, /tasks
  requestBody: { type: Object },                  // Sample request body
  responseBody: { type: Object },                 // Sample response
  createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model("ApiDefinition", apiDefinitionSchema);