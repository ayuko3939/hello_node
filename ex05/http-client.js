const args = process.argv;

if (args.length < 3)
{
	console.error('not enough arguments');
	process.exit(1);
}

const http = require('http');
const url = args[2];

const request = http.get(url, (response) =>
{
	response.on('data', (content) =>
	{
		process.stdout.write(content.toString() + '\n');
	});
});

request.on('error', (error) =>
{
	console.error(error.message);
	process.exit(1);
});
