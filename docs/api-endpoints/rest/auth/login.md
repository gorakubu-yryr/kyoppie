# POST /auth/login

パスワードとスクリーンネームを利用して、pinCodeを生成します。
関連: [APIの認証について](/docs/auth.md)

- [Params](#params)
- [API Code](/src/endpoints/auth/login.js)
- [API Handler Code](/src/handlers/web/auth/login.js)

## params


name|description
---|---
requestToken|リクエストトークン。
screenName|スクリーンネーム。
password|パスワード。
