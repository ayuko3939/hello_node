// http モジュールを読み込む（httpはHTTP通信を扱うための標準ライブラリ）
const http = require('http');

// URLのwebページを取得する関数
function my_fetch(url)
{
	return new Promise((resolve, reject) =>
	{
		http.get(url, (response) =>
		{
			let data = '';

			response.on('data', (content) =>
			{
				data += content.toString();
			});

			response.on('end', () =>
			{
				resolve(data);
			});
		}).on('error', (error) =>
		{
			reject(error);
		});
	});
}

async function main()
{
	const urls = process.argv.slice(2);

	if (urls.length < 3)
	{
		console.error('not enough arguments');
		process.exit(1);
	}
	
	try
	{
		let results = [];
		
		// 3つのWebページを順番に取得する
		for (let i = 0; i < urls.length; i++)
		{
			const content = await my_fetch(urls[i]);
			results.push(content);
		}

		// 3つのWebページの中身を順番に表示する
		results.forEach((result) =>
		{
			console.log(result);
			// console.log('\n----------------------------------------------------------------------\n');
		});
	}
	catch (error)
	{
		console.error(error.message);
		process.exit(1);
	}
}

main();

// http://www.google.com

/*
<Promise>
 - Promiseは組み込みクラス（Built-in class）
 - 「まだ終わってない処理の結果を、後で渡します」という約束のこと
 - すぐに結果が出ない非同期処理（例：ネットワーク通信）の結果を表すオブジェクト
 - Promise は3つの状態を持つ：
    - pending	：まだ結果が出ていない状態（保留中）
    - fulfilled	：処理が成功した状態（成功）
    - rejected	：処理が失敗した状態（失敗）
 - 非同期処理が成功した場合は resolve()メソッド を、失敗した場合は reject()メソッド を呼び出す
 - 非同期処理の結果を待つためのメソッド/キーワード
    - then()メソッド
    - catch()メソッド
    - finally()メソッド
    - awaitキーワード : async関数の中でしか使えない
    - asyncキーワード : async関数を定義するためのキーワード
*/