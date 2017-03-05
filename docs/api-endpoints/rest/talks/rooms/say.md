# POST /talks/rooms/say

トークルームに投稿します

- This API requires Auth

- [Params](#params)
- [API Code](/src/endpoints/talks/rooms/say.js)
- [API Handler Code](/src/handlers/web/talks/rooms/say.js)

## params

name|description
---|---
id|投稿先のトークルームID。
text|投稿内容。
files|投稿に添付するファイルID。区切る場合は`,`を利用。(例: `a,b,c`) 今のところ1個しか添付できません。
