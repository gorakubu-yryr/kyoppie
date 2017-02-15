# POST /admin/users/change_password

指定されたユーザーのパスワードを変更します

- This API requires Auth
- This API can only be called from Admin User at Web

- [Params](#params)
- [API Code](/src/endpoints/admin/users/change_password.js)
- [API Handler Code](/src/handlers/web/admin/users/change_password.js)

## params

name|description
---|---
id|パスワードを変更するユーザーのID。
password|新しいパスワード
