# POST /admin/users/suspend

ユーザーを凍結します。

- This API requires Auth
- This API can only be called from Admin User at Web

- [Params](#params)
- [API Code](/src/endpoints/admin/users/suspend.js)
- [API Handler Code](/src/handlers/web/admin/users/suspend.js)

## params

name|description
---|---
id|凍結するユーザーのID
