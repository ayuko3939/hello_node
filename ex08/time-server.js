// net モジュールを読み込む（netはTCP通信を扱うための標準ライブラリ）
const net = require('net');

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

// 4. 現在の日時を取得して "YYYY-MM-DD hh:mm" 形式に整形する
function getDateString()
{
	// Dateオブジェクトを生成 = 現在の時刻を取得
	const now = new Date();
	let date = '';

	// 年月日-時間を取得
	const year = now.getFullYear();		// 年
	const month = now.getMonth() + 1;	// 月（0-11なので+1）
	const day = now.getDate();			// 日
	const hour = now.getHours();		// 時間
	const min = now.getMinutes();		// 分

	// YYYY-MM-DD hh:mm 形式に整形した文字列を作成（例：2023-10-04 14:30）
	date += String(year) + '-';
	date += String(month).padStart(2, '0') + '-';	// 1桁の月を2桁にする
	date += String(day).padStart(2, '0') + ' ';		// 1桁の日を2桁にする
	date += String(hour).padStart(2, '0') + ':';	// 1桁の時間を2桁にする
	date += String(min).padStart(2, '0') + '\n';	// 1桁の分を2桁にする

	return (date);
}

// 2. TCPサーバーを作成
const server = net.createServer((socket) =>
{
	// 現在の日時を取得してclientに送信
	const date = getDateString();
	socket.write(date);
	socket.end();
});
server.on('error', (error) =>
{
	console.error(error.message);
	process.exit(1);
});

// 3. 指定ポートで待ち受ける
server.listen(port);


// server > node ex08/time-server.js 3000
// client > nc localhost 3000
// curl : HTTPクライアント、HTTPサーバーにリクエストを送るためのツール


/*
TCP と HTTP の違い

<TCP>
 - 通信のためのプロトコル
 - データをバイナリとして扱う
 - 2つのコンピュータ（アプリ）同士が"会話"するためのパイプ
 
 <HTTP>
 - TCP上で動くWebの通信プロトコル
 - データをテキストとして扱う
 - リクエストとレスポンスの形式でデータをやり取りする
 - ヘッダーとボディの形式でデータをやり取りする
 - リクエストメソッド（GET, POST, PUT, DELETE）を使用する
*/