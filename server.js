const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
  const now = new Date().toString();
  const log = `${now}: ${req.method} ${req.url}`;
  console.log(`${now}: ${req.method} ${req.url}`);
  fs.appendFileSync('server.log', log + '\n');
  next();
});

// --- Maintenance overlay
// app.use((req, res) => {
//   res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('toUpperCase', text => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  res.render('welcome.hbs', {
    pageTitle: 'Welcome',
    welcomeMessage: 'Welcome to my shitty website'
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page'
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Server is down. Ты даун'
  });
});

app.listen(3000, () => {
  console.log('Serever is up on port 3000');
});
