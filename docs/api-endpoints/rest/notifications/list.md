# GET /notifications/list

通知一覧を取得します。

- This API is Auth Required

- [Params](#params)
- [API Code](/src/endpoints/notifications/list.js)
- [API Handler Code](/src/handlers/web/notifications/list.js)

## params


name|description
---|---
sinceId|このパラメータを指定すると、指定された通知IDより新しい通知が取得できます。
maxId|このパラメータを指定すると、指定された通知IDより古い通知が取得できます。
limit|一度に帰ってくる通知の最大個数を指定します。デフォルトは100個です。
