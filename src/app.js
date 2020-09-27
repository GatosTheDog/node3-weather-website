const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

//define paths for express config
const public_dir_path = path.join(__dirname, '../public');
const views_path = path.join(__dirname, '../templates/views')
const partials_path = path.join(__dirname, '../templates/partials')

//setup handlebars engine and views lovation
app.set('view engine', 'hbs');
app.set('views', views_path);
hbs.registerPartials(partials_path);

//setup static directory to serve
app.use(express.static(public_dir_path));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather app',
    name: 'Manos '
  });
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About me',
    name: 'Manos '
  });
})

app.get('/help', (req, res) => {
  res.render('help', {
    message: 'help me',
    title: 'Help',
    name: 'Manos'
  });
})

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide an address'
    })
  }

  geocode(req.query.address, (error, {
    latitude,
    longtitude,
    location
  } = {}) => {
    if (error) {
      return res.send({
        error: error
      })
    }

    forecast(latitude, longtitude, (error, forecast_data) => {
      if (error) {
        return res.send({
          error: error
        })
      }
      res.send({
        forecast: forecast_data,
        location: location,
        address: req.query.address
      })
    })
  })
})

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term'
    })
  }

  res.send({
    products: []
  });
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Manos',
    error_message: 'help page not found :('
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Manos',
    error_message: 'page not found'
  })
})

app.listen(3000, () => {
  console.log('server is up on port 3000');
})
