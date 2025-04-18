// http モジュールを読み込む（httpはHTTP通信を扱うための標準ライブラリ）
// url モジュールを読み込む（urlはURLを扱うための標準ライブラリ）
const http = require('http');
const url = require('url');

// 1. コマンドライン引数からポート番号を取得する
const args = process.argv;
if (args.length < 3)
{
	console.error('not enough arguments');
	process.exit(1);
}

const port = Number(args[2]);
if (Number.isNaN(port) || port < 0 || port > 65535)
{
	console.error('invalid port number');
	process.exit(1);
}

// 2. サーバーを作成する
const server = http.createServer((req, res) =>
{
	// 3. リクエストのURLを解析する
	const parsedUrl = url.parse(req.url, true);
	const pathname = parsedUrl.pathname;
	const iso = parsedUrl.query.iso;
	if (!iso)
	{
		res.writeHead(400, { 'Content-Type': 'application/json' });
		res.end(JSON.stringify({ error: 'missing iso query parameter' }));
		return;
	}

	const date = new Date(iso);
	let result;

	// 4. リクエストのパスに応じて処理を分岐する
	if (pathname === '/api/parsetime')
	{
		// ISO形式の日時を取得する
		result = {
			hour: date.getUTCHours(),
			minute: date.getUTCMinutes(),
			second: date.getUTCSeconds()
		};
	}
	else if (pathname === '/api/unixtime')
	{
		// UNIX時間を取得する
		result = {
			unixtime: date.getTime()
		};
	}
	else
	{
		res.writeHead(404, { 'Content-Type': 'application/json' });
		res.end(JSON.stringify({ error: 'not found' }));
		return;
	}

	// 5. JSON形式でレスポンスを返す
	res.writeHead(200, { 'Content-Type': 'application/json' });
	res.end(JSON.stringify(result) + '\n');
});
server.on('error', (error) =>
{
	console.error(error.message);
	process.exit(1);
});

server.listen(port);


/*
<url.parse()>
 - 構文
   - url.parse(urlString[, parseQueryString[, slashesDenoteHost]])
 - 引数
   - urlString : 解析するURL文字列
   - parseQueryString : trueの場合、クエリ文字列をオブジェクトとして解析する
   - slashesDenoteHost : trueの場合、スラッシュがホスト名を示すとみなす
 - 戻り値
   - url : 解析されたURLオブジェクト
		- properties
			- protocol : プロトコル
			- slashes : スラッシュ
			- auth : 認証情報
			- host : ホスト名
			- port : ポート番号
			- hostname : ホスト名
			- hash : ハッシュ
			- search : クエリ文字列
			- query : クエリ文字列
			- pathname : パス名
			- path : パス名とクエリ文字列
			- href : 完全なURL
 - 例
	url.parse('/api/parsetime?iso=2020-12-15T17:10:15.474Z') // subject

	// return value
	{
		pathname: '/api/parsetime',
		query: {
			iso: '2020-12-15T17:10:15.474Z'
		}
	}

<HTTP status codes>
 - 200 OK
 - 201 Created
 - 204 No Content
 - 400 Bad Request
 - 401 Unauthorized
 - 403 Forbidden
 - 404 Not Found
 - 500 Internal Server Error

*/

/*
server > node http-json-api-server.js 8080

client > curl 'localhost:8080/api/parsetime?iso=2020-12-15T17:10:15.474Z'
		 -> {"hour":17,"minute":10,"second":15}

client > curl 'localhost:8080/api/unixtime?iso=2020-12-15T17:10:15.474Z'
		 -> {"unixtime":1608052215474}
*/