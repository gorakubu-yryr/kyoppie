# GET /posts/public_timeline

すべての投稿が流れるPublic Timelineを取得します。

- [Params](#params)
- [API Code](/src/endpoints/posts/public_timeline.js)
- [API Handler Code](/src/handlers/web/posts/public_timeline.js)

## params


name|description
---|---
sinceId|このパラメータを指定すると、指定された投稿IDより新しい投稿が取得できます。
maxId|このパラメータを指定すると、指定された投稿IDより古い投稿が取得できます。
limit|一度に帰ってくる通知の最大個数を指定します。デフォルトは100個です。
