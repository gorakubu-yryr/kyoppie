# GET /posts/timeline

(現時点では)自分と、自分がフォローしているユーザーの投稿が時系列に並んでいるタイムラインを取得します。

- This API requires Auth

- [Params](#params)
- [API Code](/src/endpoints/posts/timeline.js)
- [API Handler Code](/src/handlers/web/posts/timeline.js)

## params

name|description
---|---
sinceId|このパラメータを指定すると、指定された投稿IDより新しい投稿が取得できます。
maxId|このパラメータを指定すると、指定された投稿IDより古い投稿が取得できます。
limit|一度に帰ってくる通知の最大個数を指定します。デフォルトは100個です。