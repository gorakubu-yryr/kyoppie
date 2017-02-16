# POST /applications/get_my_access_token

指定されたアプリケーション名義で、自分のアクセストークンを取得します。

- This API requires Auth
- This API can only be called from Web

- [Params](#params)
- [API Code](/src/endpoints/applications/get_my_access_token.js)
- [API Handler Code](/src/handlers/web/applications/get_my_access_token.js)

## params

name|description
---|---
id|自分のアクセストークンを取得するアプリケーションのID
