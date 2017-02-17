# GET /admin/users/show

ユーザーの情報を取得します。

- This API requires Auth
- This API can only be called from Admin User at Web

- [Params](#params)
- [API Code](/src/endpoints/admin/users/show.js)
- [API Handler Code](/src/handlers/web/admin/users/show.js)

## params

name|description
---|---
screenName|取得したいユーザーのスクリーンネーム
id|取得したいユーザーのID
