// fs モジュールを使用してファイルを読み込む
const fs = require('fs');
const arr = process.argv;

if (arr.length < 3)
{
	console.log('not enough arguments');
	return;
}

try
{
	const content = fs.readFileSync(arr[2]);
	const text = content.toString();

	let count = 0;
	for (let i = 0; i < text.length; i++)
	{
		if (text[i] === '\n')
			count++;
	}

	console.log(count);
}
catch (error)
{
	console.log(error.message);
}


/*
import と require の違い

<import>
 - ES6のモジュールシステムで使用される
 - 非同期で読み込まれる
 - モジュールの読み込み時にエラーが発生する
 - クライアントサイド(ブラウザ)での実行

<require>
 - CommonJSのモジュールシステムで使用される
 - 同期で読み込まれる
 - モジュールの読み込み時にエラーが発生しない
 - サーバサイドでの実行


== と === の違い
 - == は型変換を行う
 - === は型変換を行わない

 例)
	console.log(1 == '1'); // true
	console.log(1 === '1'); // false

*/
