# POST /admin/file_servers/add

ファイルサーバーを追加します。

- This API requires Auth
- This API can only be called from Admin User at Web

- [Params](#params)
- [API Code](/src/endpoints/admin/file_servers/add.js)
- [API Handler Code](/src/handlers/web/admin/file_servers/add.js)

## params

name|description
---|---
name|ファイルサーバーの管理用の名前
url|ファイルサーバーのインターネット上からアクセスできるURL
