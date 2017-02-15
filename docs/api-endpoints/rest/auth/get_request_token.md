# POST /auth/get_request_token

リクエストトークンを取得します。
関連: [APIの認証について](/docs/auth.md)


- [Params](#params)
- [API Code](/src/endpoints/auth/get_request_token.js)
- [API Handler Code](/src/handlers/web/auth/get_request_token.js)

## params


name|description
---|---
appKey|アプリケーションのappKey。
appSecret|アプリケーションのappSecretとsigHashを結合してsha256にしたもの
sigKey|appSecretのhashに使ったsignatureのsigKey。
