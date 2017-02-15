# POST /admin/site_config/set

Site Configを設定します。

- This API requires Auth
- This API can only be called from Admin User at Web

- [Params](#params)
- [API Code](/src/endpoints/admin/site_config/set.js)
- [API Handler Code](/src/handlers/web/admin/site_config/set.js)

## params

name|description
---|---
name|設定するSite Configの名前
content|設定するSite Configの内容
