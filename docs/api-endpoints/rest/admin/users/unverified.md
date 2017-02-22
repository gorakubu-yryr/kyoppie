# POST /admin/users/unverified

ユーザーを認証済みアカウントでなくします。

- This API requires Auth
- This API can only be called from Admin User at Web

- [Params](#params)
- [API Code](/src/endpoints/admin/users/unverified.js)
- [API Handler Code](/src/handlers/web/admin/users/unverified.js)

## params

name|description
---|---
id|認証済みでなくするユーザーのID
