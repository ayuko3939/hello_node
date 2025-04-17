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
			hour: date.getHours(),
			minute: date.getMinutes(),
			second: date.getSeconds()
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
			- auth : 認証情報
			- host : ホスト名
			- port : ポート番号
			- search : クエリ文字列
			- query : クエリオブジェクト
			- pathname : パス名
			- path : パス名とクエリ文字列を結合したもの
			- etc...
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
• Write an HTTP server that serves JSON data when it receives a GET request to
the path ’/api/parsetime’. Expect the request to contain a query string with a key
’iso’ and an ISO-format time as the value.
• The JSON response should contain only ’hour’, ’minute’ and ’second’ properties.
For example:
{
"hour": 14,
"minute": 23,
"second": 15
}
• Add second endpoint for the path ’/api/unixtime’ which accepts the same query
string but returns UNIX epoch time in milliseconds (the number of milliseconds
since 1 Jan 1970 00:00:00 UTC) under the property ’unixtime’. For example:
{ "unixtime": 1376136615474 }
• Your server should listen on the port provided by the first argument to your program.
?>node http-json-api-server.js 8080
?>curl 'localhost:8080/api/parsetime?iso=2020-12-15T17:10:15.474Z'
{"hour":17,"minute":10,"second":15}
?>
?>curl 'localhost:8080/api/unixtime?iso=2020-12-15T17:10:15.474Z'
{"unixtime":1608052215474}
?>
*/