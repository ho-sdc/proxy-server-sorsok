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
const productServer = 'http://ec2-18-212-94-82.compute-1.amazonaws.com:3004';
const reviewsServer =
  'http://ec2-13-59-217-231.us-east-2.compute.amazonaws.com:3005';

app.use(cookieParser());
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cors());

app.get('/suggestions', (req, res) => {
  axios
    .get(suggestionsServer + '/suggestions', {
      params: {
        id: id
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
    .get(productServer + '/abibas/product/' + id)
    .then(({ data }) => res.send(data))
    .catch(err => res.send(err));
});

app.get('/reviews', (req, res) => {
  axios
    .get(reviewsServer + '/reviews', {
      params: {
        id: id
      }
    })
    .then(({ data }) => res.send(JSON.stringify(data)))
    .catch(err => res.send(err));
});

app.get('/reviews/stats', (req, res) => {
  axios
    .get(reviewsServer + '/reviews/stats', {
      params: {
        id: id
      }
    })
    .then(({ data }) => res.send(JSON.stringify(data)))
    .catch(err => res.send(err));
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
