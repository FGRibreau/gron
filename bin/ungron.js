const s = process.openStdin();
let d = '';
s.on('data', c => d += c).on('end', () => console.log(JSON.stringify(JSON.parse('{' + d + '}'), null, 2)));
