/*
* @Author: ziggy
* @Date:   2016-08-11 11:58:17
* @Last Modified by:   ziggy
*/

let config = {
  mongo: {
    url: 'localhost/fb-photos'
  },
  facebook: {
    apiKey: '',
    userId: '',
    whiteListedAlbums: ['Timeline Photos', 'Mobile Uploads'] //if this is populated, it will only grab from these albums
  }
}

export default config;