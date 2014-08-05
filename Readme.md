
# helpscout

  A Helpscout API for node. Modified from https://github.com/segmentio/helpscout

## Installation

    $ npm install git://github.com/SeptiyanAndika/helpscout.git

## Example

Create a new Helpscout instance and query for mailboxes: 

```js
var helpscout = require('helpscout')('apikey');
```

query mailboxes:

```
helpscout.mailboxes.list(function (err, mailboxes) {
  // ..
});
```


query list customers:

```
helpscout.customers.list(function (err, customers) {
  // ..
});
```


query get detail customer:

```
helpscout.customers.get(Id,function (err, customer) {
  // ..
});
```

Or select a mailbox:

```js
var mailbox = require('helpscout')('apikey', 6314);
```

Then you can query mailbox conversations:

```js
mailbox.conversations.list(function (err, conversations) {
  // ..
});
```

## API

#### new Helpscout(apiKey)

Create a new `Helpscout` client to query `Mailboxes`.

#### #mailboxes.list([options,] callback)

Returns a [list of mailboxes](http://developer.helpscout.net/help-desk-api/mailboxes/list/), with options defaulted to:

```js
{
    page: 1
}
```

Create a new `Helpscout` client to query `Customers`.

#### #customers.list([options,] callback)

Returns a [list of customers](http://developer.helpscout.net/help-desk-api/customers/list/), with options defaulted to:

```js
{
    page: 1
}
```


#### #customers.get(Id callback)

Returns a [detail of customers](http://developer.helpscout.net/help-desk-api/customers/get/)


#### new Helpscout(apiKey, mailboxId)

Create a new `Mailbox` client.

##### #conversations.list([options,] callback)

Returns a [list of conversations](http://developer.helpscout.net/help-desk-api/conversations/list/), with options defaulted to:

```js
{
    page: 1,
    status: 'all'
    tag: null
}
```



## License

MIT