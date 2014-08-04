
var debug = require('debug')('helpscout:customers');
var defaults = require('defaults');
var request = require('superagent');

/**
 * Expose `Customers`.
 */

module.exports = Customers;

/**
 * Initialize a new helpscout `Customers` client with an
 * `apiKey`
 *
 * @param {String} apiKey
 */

function Conversations (apiKey) {
  if (!(this instanceof Conversations)) return new Conversations(apiKey, mailboxId);
  if (!apiKey) throw new Error('Conversations requires an apiKey.');
  this.apiKey = apiKey;
}

/**
 * List the Customers
 *
 * @param {Object} options
 * @param {Function} callback
 */

Conversations.prototype.list = function (options, callback) {
  if (typeof options === 'function') {
    callback = options;
    options = {};
  }
  options = defaults(options, { page: 1 });
  debug('requesting Customers [page %d] ..', options.page);
  request
    .get('https://api.helpscout.net/v1/customers.json')
    .auth(this.apiKey, 'X')
    .query(options)
    .end(function (err, res) {
      if (err) return callback(err);
      if (res.statusCode !== 200) return callback(new Error('Bad response: ' + res.text));
      debug('got %d Customers for page %d', res.body.items.length, res.body.page);
      return callback(null, res.body);
    });
};


/**
 * get the Customer
 *
 * @param {Number} Id 
 * @param {Function} callback
 */

Conversations.prototype.get = function (Id, callback) {
  if (typeof options === 'function') {
    callback = options;
    options = {};
  }
  debug('requesting Customer with id %d ..', Id);
  request
    .get('https://api.helpscout.net/v1/customers/'+Id+'.json')
    .auth(this.apiKey, 'X')
    .query(options)
    .end(function (err, res) {
      if (err) return callback(err);
      if (res.statusCode !== 200) return callback(new Error('Bad response: ' + res.text));
      debug('got %s %s Customer for id %d', res.body.items.firstName, res.body.items.lastName,res.body.items.id);
      return callback(null, res.body);
    });
};