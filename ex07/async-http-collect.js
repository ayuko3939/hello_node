const args = process.argv;

if (args.length < 5)
{
	console.error('not enough arguments');
	process.exit(1);
}

let results = [null, null, null];

