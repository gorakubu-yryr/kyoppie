# POST /posts/create

投稿を作成します。

- This API requires Auth

- [Params](#params)
- [API Code](/src/endpoints/posts/create.js)
- [API Handler Code](/src/handlers/web/posts/create.js)

## params

name|description
---|---
text|投稿内容。
files|投稿に添付するファイルID。区切る場合は`,`を利用。(例: `a,b,c`) 今のところ1個しか添付できません。
replyTo|リプライ先の投稿ID。
