# POST /auth/get_access_token

アクセストークンを取得します。
関連: [APIの認証について](/docs/auth.md)

- [Params](#params)
- [API Code](/src/endpoints/auth/get_access_token.js)
- [API Handler Code](/src/handlers/web/auth/get_access_token.js)

## params

name|description
---|---
appKey|アプリケーションのappKey。
appSecret|アプリケーションのappSecretとsigHashを結合してsha256にしたもの。
sigKey|appSecretのhashに使ったsignatureのsigKey。
pinCode|
requestToken|リクエストトークン。
