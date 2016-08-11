# node-facebook-photo-scraper

This project is designed to take in a Facebook User Access token, and from that token utilize the Facebook API to dynamically access all of the users photos from thier photo-albums (or only white-listed albums).  As the package crawls through the photo JSON it stores the useful access information within a Mongo Database.  It then provides a URL to serve these stored images.

### Routes

[GET] `/photos`

This route will give the user valid JSON containing all of the mined image JSON from Facebook.

[GET] `/photos/aggregate`

THis route will have the server perform an aggregation/web-crawl of the users photos and albums.  It will then proceed to store the images within it's local DB for access later.

## Configuration

To use this project, rename the file
`src/config/config.example.js`

to 

`src/config/config.js`

and set all of the items within the config file.