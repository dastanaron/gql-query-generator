const QueryBuilder  = require('./QueryBuilder.js');


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