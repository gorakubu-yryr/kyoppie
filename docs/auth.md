# APIの認証について (予定)
- appKey → 晒してもいいもの
- appSecret → 秘密

`POST /auth/get_sigkey?appKey=appKey`
```
{
    "result": true,
    "response": {
        "sigHash": "hoge",
        "sigKey": "foo"
    }
}
```
が帰ってくるので
`appSecret`に`sigHash`を付けてsha256する

例:`appSecret`がfooで`sigHash`が`test`だったら`footest`をsha256

これを`appSecretHash`とする

`POST /auth/get_request_token?appKey=appKey&appSecret=appSecretHash&sigKey=sigKey`
```
{
    "requestToken":"hoge"
}
```
注意:この時点で先程の`sigKey`、`sigHash`、`appSecretHash`は失効する
この`requestToken`を`/auth/confirm?request_token=`に付ける
例:`requestToken`が`test`だったら`/auth/confirm?request_token=test`
これをブラウザで開くと確認画面が出るのでスクリーンネーム/パスワードを入力するとPINコードが出る
そうしたら`appSecretHash`の方法で`appSecretHash2`を作る

`POST /auth/get_access_token?appKey=appKey&appSecret=appSecretHash2&sigKey=sigKey2&pinCode=pinCode`
```
{
    "accessToken":"hage"
}
```

このaccessTokenを`appKey`+`accessToken`+`appSecret`でsha256したものを使う(以下`accessTokenHash`)

実際にアクセスする際は`appKey`と`accessTokenHash`を使う