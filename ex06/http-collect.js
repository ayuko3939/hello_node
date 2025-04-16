const args = process.argv;

if (args.length < 3)
{
	console.error('not enough arguments');
	process.exit(1);
}

const http = require('http');
const url = args[2];

let data = '';

http.get(url, (response) =>
{
	response.on('data', (content) =>
	{
		data += content.toString();
	});
	
	response.on('end', () =>
	{
		console.log(data.length);
		console.log(data);
	});
}).on('error', (error) =>
{
	console.error(error.message);
	process.exit(1);
});
