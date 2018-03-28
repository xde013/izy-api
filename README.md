# izypay

> A simple REST API for izypay, to see it in action head to live demo [here](https://izypay.herokuapp.com/api/transactions "API live demo"). You can also find a live example UI exploiting the API using VueJS [here](https://izy-1337.firebaseapp.com "Live UI example using VueJS")

## Run localy
``` bash
# install dependencies
npm install

# serve with nodejs
npm run dev
```
------------
### API endpoints
- ***api/transactions*** > Return all transactions.
- ***api/top/:n***  > Return TOP n events with most transactions in desc order.
- ***api/events/:name***  > Return all transactions by event_:name.


