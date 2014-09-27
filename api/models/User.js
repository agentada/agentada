/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  adapter: 'mongodbServer',

  attributes: {
    uid: {
      type: 'STRING',
      required: true,
      unique: true
    },
    provider: 'STRING',
    name: 'STRING',
    email: 'STRING',
    firstname: 'STRING',
    lastname: 'STRING',
    interests: {
      collection: 'interest',
      via: 'owner'
    }
  }
};
