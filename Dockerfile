# 1. Node.js v12 イメージをベースに
FROM node:12

# 2. 作業ディレクトリを /usr/src/app に設定
WORKDIR /usr/src/app

# 3. ホストのファイルをすべてコンテナにコピー
COPY . .

# 4. デフォルトのコマンドを node に設定
ENTRYPOINT ["node"]