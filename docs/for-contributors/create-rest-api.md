# REST APIを作る

## エンドポイントを決める
`posts/create`のようなエンドポイントを決めましょう。
**基本的にissueからREST APIを作ることになると思うので、その場合にはissueに書いてあるエンドポイント名で作ってください**
命名時には[このへん](/src/routes.js)とか参考にするといいかもしれません

## `src/endpoints/エンドポイント名.js`にファイルを作る
ないディレクトリは作って構いません。
テンプレート↓
```
var models = require("../../models")
module.exports = async function (){
}
```
基本的に、ここでreturnしたものが*クライアント向けに整形されてから*返ります。
(例えば、ユーザーのパスワードハッシュを送信しないようにするなど)
Redisに対応したい場合は`posts/create`の最後の方を参考にしてください。(**RedisはStreaming APIのためのみに利用してください！！**)

## `src/handlers/web/エンドポイント.js`にファイルを作る
ないディレクトリは以下略。
`src/handlers/web/*/*.js`を参考に。

## `src/routes.js`に追記する
`{name:"エンドポイント",method:"(get|post)"}`
- 認証必要ないなら`login:false`を追加。
- Webからのみ呼び出せるAPIなら`isWeb:true`を追加。
- 管理者のみ呼び出せるAPIなら`isAdmin:true`を追加。(**これとは別途`src/endpoints`側でもフラグチェックが必要**)

## 動作確認をする
kyoppie-webのサーバーが立ってるならkyoppie-webのサーバーのページを開いた状態でJavaScriptコンソールで`$.api.get`または`$.api.post`でAPIコールができる。

## Pull Requestをする
適当に投げてくれればOK
