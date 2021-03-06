
var debug = require('debug')('helpscout:customers');
var defaults = require('defaults');
var request = require('superagent');

/**
 * Expose `Customers`.
 */

module.exports = Customers;

/**
 * Initialize a new helpscout `Customers` client with an `apiKey`
 *
 * @param {String} apiKey
 */

function Customers (apiKey) {
  if (!(this instanceof Customers)) return new Customers(apiKey);
  if (!apiKey) throw new Error('Conversations requires an apiKey.');
  this.apiKey = apiKey;
  
}

/**
 * List the Customers
 *
 * @param {Object} options
 * @param {Function} callback
 */

Customers.prototype.list = function (options, callback) {
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

Customers.prototype.get = function (Id, callback) {
  if (!Id) throw new Error('get Customer requires Id.');
  if (typeof options === 'function') {
    callback = options;
    options = {};
  }
  debug('requesting Customer with id %d ..', Id);
  request
    .get('https://api.helpscout.net/v1/customers/'+Id+'.json')
    .auth(this.apiKey, 'X')
    .end(function (err, res) {
      if (err) return callback(err);
      if (res.statusCode !== 200) return callback(new Error('Bad response: ' + res.text));
      debug('got %s %s Customer for id %d', res.body.item.firstName, res.body.item.lastName,res.body.item.id);
      return callback(null, res.body);
    });
};



/**
 * update  Customer
 *
 * @param {Number} Id 
 * @param {Object} data 
 * @param {Boolean} reload
 * @param {Function} callback
 */

Customers.prototype.update = function (Id,data, reload, callback) {
  if (!Id) throw new Error('get Customer requires Id.');
  
  if (typeof data === 'function') {
    callback = data;
    data = {};
    reload = false;
  }

  if (typeof reload === 'function') {
    callback = reload;
    reload = false;
  }

  debug('updating Customer with id %d ..', Id);
  request
    .put('https://api.helpscout.net/v1/customers/'+Id+'.json?reload='+reload)
    .auth(this.apiKey, 'X')
    .set('Content-Type', 'application/json')
    .send(data)
    .end(function (err, res) {
      if (err) return callback(err);
      if (res.statusCode !== 200&&res.statusCode!==201) return callback(new Error('Bad response: ' + res.text));
      debug('update Customer for id %d', Id);
      return callback(null, res.body);
    });
};


/**
 * update  Customer
 *
 * @param {Object} data 
 * @param {Function} callback
 */

Customers.prototype.create = function (data, reload, callback) {
  
  if (typeof data === 'function') {
    callback = data;
    data = {};
    reload = false;
  }

  if (typeof reload === 'function') {
    callback = reload;
    reload = false;
  }

  debug('Creating Customer..');
  request
    .post('https://api.helpscout.net/v1/customers.json?reload='+reload)
    .auth(this.apiKey, 'X')
    .set('Content-Type', 'application/json')
    .send(data)
    .end(function (err, res) {
      if (err) return callback(err);
      if (res.statusCode !== 200&&res.statusCode!==201) return callback(new Error('Bad response: ' + res.text));
      debug('Customer created with id %d', res.body.item.id);
      return callback(null, res.body);
    });
};

