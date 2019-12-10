gql-query-generator
=========================

This package is a class that allows you to compose a `GraphQL` query from a set of arrays and objects of any nested filter or query body.

Build
-------------------------

Clone this repository

```bash
git clone git@github.com:dastanaron/gql-query-generator.git
```
Go to folder

```bash
cd js-graphql-query-builder
```
and run command

```bash
yarn install
yarn run build
```

You can also `npm` for build and install ependencies

Install
-----------------------

```bash
npm i gql-query-generator
```

or

```bash
yarn add gql-query-generator
```

You can install old version with npm
```bash
npm install js-graphql-query-lib
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
const QueryBuilder = require('./dist/GraphQLBuilder.js').default;


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

console.log(QueryObject.getQuery());
```

output:

```graphql
{User(lang: "en", id: 755, DateOfBirth: ["2018-04-23 00:00:00", "2018-04-23 23:59:59"], favorites: true){id account{bill transaction country } name passport{placeofissue{country city } seria number } }}
```

See example.js

```bash
node example.js
```

example to RunKit

[click here to go worked example](https://runkit.com/dastanaron/runkit-npm-js-graphql-query-lib)
