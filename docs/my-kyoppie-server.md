# 自分のkyoppieサーバーを立てる場合の注意点

自分のkyoppieサーバーを立てる場合は、以下のことに注意してください。

## @adminのscreenNameを変更しない
@adminのscreenNameは変更されることが考えられていない（し、今後考慮されることもない）ので、変更すると重要なものが含まれる一部の機能が壊れます。
そのため、@adminのscreenNameを変更しないでください。

## isWeb属性が立っているアプリのappKey/appSecretを公開しない
isWeb属性が立っているアプリのappKey/appSecretを公開すると、やばいことをされるので、絶対に公開しないでください。