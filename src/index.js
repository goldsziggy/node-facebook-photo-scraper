import http from 'http';
import express from 'express'
import mongoose from 'mongoose';
import config from './config/config.js';
import * as actions from './facebook';

const app = express();

mongoose.connect('mongodb://' + config.mongo.url, function (error) {
    if (error) {
        console.log(error);
    }
  });

app.get('/photos/aggregate', function (req, res) {
  actions.facebook_get_albums(res);
});

app.get('/photos', function (req, res) {
  actions.retrieve_local_photos(res, req.query.limit);
});

app.listen(1337, function () {
  console.log('Example app listening on port 1337!');
});

