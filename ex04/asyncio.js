const { exit } = require('process');

const arr = process.argv;

if (arr.length < 3)
{
	console.log('not enough arguments');
	return;
}

try
{
	const fs = require('fs');
	fs.readFile(arr[2], 'utf-8', (err, content) =>
	{
		const text = content.toString();
		const lines = text.split('\n');
		console.log(lines.length - 1);
	});
}
catch (error)
{
	console.log(error.message);
}


/*
readFileSync と readFile の違い

<readFileSync>
 - 同期的にファイルを読み込む(ブロッキング) : ファイルの読み込みを待ってから後続処理をしたい場合
 - コールバック関数を指定する必要がない
 - 例外処理は try-catch で行う

<readFile>
 - 非同期的にファイルを読み込む(ノンブロッキング) : ファイルの読み込みを待たずに後続処理をしたい場合
 - コールバック関数を指定する必要がある
 - 例外処理はコールバック関数の引数で行う

 */