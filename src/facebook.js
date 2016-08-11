/*
* @Author: ziggy
* @Date:   2016-08-09 16:57:22
* @Last Modified by:   ziggy
*/

'use strict';

import {Facebook} from 'fb';
import Photo from './models/photo';
import config from './config/config';

const fb = new Facebook();
let photos = [];
let photo_ids = [];


fb.setAccessToken(config.facebook.apiKey);

function insert_if_not_exists(p){
  let photo = new Photo({
    id: p.id,
    width: p.width,
    height: p.height,
    source: p.source
  });
  let upsertData = photo.toObject();
  delete upsertData._id;
  Photo.update({_id: photo.id}, upsertData, {upsert: true}, (error) => {
    if (error){
      console.log(error);
    }
  });
}

export function facebook_get_albums(resp){
  fb.api(config.facebook.userId + "/albums", function (res) {
      if(!res || res.error) {
       console.log(!res ? 'error occurred' : res.error);
       resp.send({error: true, payload: {message: res.error}})
       return;
      }
      //compile album ids
      //pass to function
      //recursively set photos
      //return response
      let albums = []
      res.data.forEach(function(element, index){
        //only get from whitelisted albums... if applicable
        if(config.facebook.whiteListedAlbums.length > 0){
          if(config.facebook.whiteListedAlbums.indexOf(element.name) > -1){
            albums.push(element.id);
          }
        } else{
          albums.push(element.id);
        }
          
      });
      if(albums.length > 0)
        get_all_photos(albums, resp)
      else {
        resp.send({error: true, payload: {message: 'No albums found.'}})
      }
    });
} 


function get_all_photos_request(albums, album_id, page_id, resp){
  fb.api('/' + album_id + '/photos?after=' + page_id, 
    (response)=> {
      if(response && !response.error){
        //add all the photos
        //check if there is a next
        response.data.forEach(function(element, index){
          let photo = {};
          if(photo_ids.indexOf(element.id) === -1){
            photo_ids.push(element.id);
            photo.id = element.id;  
            photo.source = element.source;
            photo.height = element.height;
            photo.width = element.width;
            photos.push(photo);  
            insert_if_not_exists(photo);
          }
        });
        //are there 'pages' of photos
        if(response.paging && response.paging.cursors && response.paging.cursors.after && response.paging.cursors.after.length > 0){
          return get_all_photos_request(albums, album_id, response.paging.cursors.after, resp);
        } else if (albums.length > 0){ //are there more albums
          let next_album_id = albums.pop();
          return get_all_photos_request(albums, next_album_id, '', resp);
        } else {
          console.log(photos.length);
          return resp.send({error: false, payload: {photos}});
        }
      }
    });
}

export function get_all_photos(albums, resp) {
  const album_id = albums.pop();
  get_all_photos_request(albums, album_id, '', resp);
}

export function retrieve_local_photos(resp){
  Photo.find({}, function(err, photos) {
    let myPhotos = [];
    resp.send(photos);  
  });
}