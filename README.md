# hello_node - 42Tokyo課題

42Tokyoのhello_nodeプロジェクト - Node.jsの基本を学ぶための課題です。

## 構成

```
hello_node/
├── Dockerfile          # Node.js v12環境のDockerfile
├── ex00/               # Hello World
│   └── hello-world.js
├── ex01/               # 変数と型
│   └── vars.js
├── ex02/               # コマンドライン引数の処理
│   └── sum_args.js
├── ex03/               # ファイル入出力
│   └── io.js
├── ex04/               # 非同期処理
│   └── asyncio.js
├── ex05/               # HTTPクライアント
│   └── http-client.js
├── ex06/               # HTTPデータ収集
│   └── http-collect.js
├── ex07/               # 非同期HTTPデータ収集
│   └── async-http-collect.js
├── ex08/               # タイムサーバー
│   └── time-server.js
└── ex09/               # HTTP JSON APIサーバー
    └── http-json-api-server.js
```

## 実行方法

### Dockerを使用する場合
```bash
# Dockerイメージをビルド
docker build -t hello_node .

# 各課題を実行
docker run hello_node ex00/hello-world.js
docker run hello_node ex01/vars.js
docker run hello_node ex02/sum_args.js 1 2 3
```

### ローカル環境で実行する場合
```bash
# 各課題を実行
node ex00/hello-world.js
node ex01/vars.js
node ex02/sum_args.js 1 2 3
```

## 各課題の内容

- **ex00**: Hello Worldを出力
- **ex01**: JavaScript変数と型の基本（const, let, var）
- **ex02**: コマンドライン引数の合計値を計算
- **ex03**: ファイル入出力の基本
- **ex04**: 非同期処理の基本
- **ex05**: HTTPクライアントの基本
- **ex06**: HTTPレスポンスデータの収集
- **ex07**: 非同期HTTPデータ収集
- **ex08**: タイムサーバーの実装
- **ex09**: HTTP JSON APIサーバーの実装
