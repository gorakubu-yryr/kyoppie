# POST /admin/users/change_password

指定されたユーザーのパスワードを変更します

- This API is Auth Required
- This API is Web and Admin User Only

- [Params](#params)
- [API Code](/src/endpoints/admin/users/change_password.js)
- [Handle Code](/src/handlers/web/admin/users/change_password.js)

## params


name|description
---|---
id|パスワードを変更するユーザーのID。
password|新しいパスワード
