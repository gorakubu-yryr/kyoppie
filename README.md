# kyoppie-api

[![Build Status](https://travis-ci.org/kyoppie/kyoppie-api.svg?branch=master)](https://travis-ci.org/kyoppie/kyoppie-api)
  
kyoppie is a Yuru Open Source SNS.

## how to run
前提:コンピュータにMongoDBとRedisがインストールされていて、実行されていること
MongoDBが同じホストで動いていない場合は`MONGO_HOST`にホスト名/IPアドレスを入力(例:`MONGO_HOST=mongodb.local`)
Redisが同じホストで動いていない場合は`REDIS_HOST`にホスト名/IPアドレスを入力(例:`REDIS_HOST=redis.local`)


```
npm install
npm run migrate
npm start
```


## LICENSE
MIT. [see license](LICENSE)
