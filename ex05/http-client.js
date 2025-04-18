// http モジュールを読み込む（httpはHTTP通信を扱うための標準ライブラリ）
const http = require('http');
const args = process.argv;

if (args.length < 3)
{
	console.error('not enough arguments');
	process.exit(1);
}

const url = args[2];

const request = http.get(url, (response) =>
{
	response.on('data', (content) =>
	{
		console.log(content.toString());
	});
});

request.on('error', (error) =>
{
	console.error(error.message);
	process.exit(1);
});

// http://www.google.com
