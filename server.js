const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

// mongoose boilerplate
db.once('open', () => {
  console.log('DB is connected');
  app.listen(PORT, () => console.log('express server running'));
});