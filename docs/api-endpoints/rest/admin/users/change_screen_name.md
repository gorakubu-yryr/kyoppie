# POST /admin/users/change_screen_name

指定されたユーザーのスクリーンネームを変更します。

- This API is Auth Required
- This API is Web and Admin User Only

- [Params](#params)
- [API Code](/kyoppie/kyoppie-api/blob/master/src/endpoints/admin/users/change_screen_name.js)
- [Handle Code](/kyoppie/kyoppie-api/blob/master/src/handlers/web/admin/users/change_screen_name.js)

## params


name|description
---|---
id|スクリーンネームを変更するユーザーのID
newScreenName|新しいスクリーンネーム
