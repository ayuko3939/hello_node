// [ 'node', 'ex02/sum_args.js', '1', '2', '3' ]
const args = process.argv;

if (args.length < 3)
{
	console.log('not enough arguments');
	return;
}

let sum = 0;
for (let i = 2; i < args.length; i++)
{
	sum += parseInt(args[i]);
}

console.log(sum);

