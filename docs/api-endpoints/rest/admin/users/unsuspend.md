# POST /admin/users/unsuspend

ユーザーの凍結を解除します。

- This API requires Auth
- This API can only be called from Admin User at Web

- [Params](#params)
- [API Code](/src/endpoints/admin/users/unsuspend.js)
- [API Handler Code](/src/handlers/web/admin/users/unsuspend.js)

## params

name|description
---|---
id|凍結を解除するユーザーのID
