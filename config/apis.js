module.exports.apis = {
  facebook: {
    id: process.env.API_KEY_FACEBOOK_ID || 'ENTER_YOUR_CLIENT_ID',
    secret: process.env.API_KEY_FACEBOOK_SECRET || 'ENTER_YOUR_SECRET'
  },

  foursquare: {
    id: process.env.API_KEY_FOURSQUARE_ID || 'ENTER_YOUR_CLIENT_ID',
    secret: process.env.API_KEY_FOURSQUARE_SECRET || 'ENTER_YOUR_SECRET'
  }
};
