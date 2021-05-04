const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');

const app = express();
const PORT = process.env.PORT || 3001;

const sequelize = require('./config/connection');

const hbs = exphbs.create({});

// the following lines of code set up Handlebars.js as the app's template engine of choice
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// The express.static() method is a built-in Express.js middleware function that can take all of the contents of a folder and serve them as static assets. This is useful for front-end specific files like images, style sheets, and JavaScript files.
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('./controllers/'));

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
