GraphQl Query Builder
=========================

This package is a class that allows you to compose a `GraphQL` query from a set of arrays and objects of any nested filter or query body.

Install
-------------------------

npm install js-graphql-query-lib

Into your project added:

```js
import QueryBuilder from 'js-graphql-query-lib/QueryBuilder';
```
or

```js
const QueryBuilder  = require('js-graphql-query-lib/QueryBuilder');
```

Params
-----------------

```js

let Query = new QueryBuilder('Alias', filter, select);
```
**Alias** - Database index;
**filter** - filter (must be Object)
**select** - query body (must be an array with nested objects)


Example
-----------------

```js
import QueryBuilder from 'js-graphql-query-lib/QueryBuilder';

let filter = {
    lang: 'en',
    id: 755,
    
    DateOfBirth: ["2018-04-23 00:00:00", "2018-04-23 23:59:59"],
    favorites: true,
};

let select = [
    'id',
    {
        account: ['bill', 'transaction', 'country']
    },
    'name',
    {
        passport: [
            {placeofissue: ['country', 'city']},
            'seria', 'number'
        ]
    }
,
];

let QueryObject = new QueryBuilder('User', filter, select);

console.log(QueryObject.query);

```

output:

```graphql
{User(lang: "en", id: 755, DateOfBirth: ["2018-04-23 00:00:00", "2018-04-23 23:59:59"], favorites: true){id account{bill transaction country } name passport{placeofissue{country city } seria number } }}
```

See example.js

```bash
node example.js
```
