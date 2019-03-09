const express = require('express');
const parser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const axios = require('axios');
const path = require('path');
const app = express();
const PORT = 80;

const suggestionsServer =
  'http://ec2-18-216-119-172.us-east-2.compute.amazonaws.com:3002';
const searchServer =
  'http://ec2-18-217-232-247.us-east-2.compute.amazonaws.com:3003';
const productServer =
  'http://ec2-18-216-194-137.us-east-2.compute.amazonaws.com:3002';
const reviewsServer =
  'http://ec2-13-59-217-231.us-east-2.compute.amazonaws.com:3005';

app.use(cookieParser());
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cors());

app.get('/', (req, res) => {
  let id = Math.floor(Math.random() * 100);
  res.clearCookie('id');
  res.cookie('id', id);
  res.sendFile(path.resolve(__dirname, './public/index.html'));
});

app.get('/styles.css', (req, res) => {
  res.sendFile(path.resolve(__dirname, './public/styles.css'));
});

app.get('/suggestions', (req, res) => {
  axios
    .get(suggestionsServer + '/suggestions', {
      params: {
        id: req.cookies.id
      }
    })
    .then(({ data }) => res.send(JSON.stringify(data)))
    .catch(err => res.send(JSON.stringify(err)));
});

app.get('/search/:keyword', (req, res) => {
  let keyword = req.params.keyword;
  axios
    .get(searchServer + `/search/${keyword}`)
    .then(({ data }) => res.send(JSON.stringify(data)))
    .catch(err => console.log(err));
});

app.get('/abibas/product', (req, res) => {
  axios
    .get(productServer + '/abibas/product/' + req.cookies.id)
    .then(({ data }) => res.send(data))
    .catch(err => res.send(err));
});

app.get('/reviews', (req, res) => {
  axios
    .get(reviewsServer + '/reviews', {
      params: {
        id: req.cookies.id
      }
    })
    .then(({ data }) => res.send(JSON.stringify(data)))
    .catch(err => res.send(err));
});

app.get('/reviews/stats', (req, res) => {
  axios
    .get(reviewsServer + '/reviews/stats', {
      params: {
        id: req.cookies.id
      }
    })
    .then(({ data }) => res.send(JSON.stringify(data)))
    .catch(err => res.send(err));
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
