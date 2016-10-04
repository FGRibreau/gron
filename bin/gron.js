#!/usr/bin/env node

const s = process.openStdin();
let d = '';
s.on('data', c => d += c).on('end', () => console.log(JSON.stringify(require('flat')(JSON.parse(d)), null, 1).slice(1, -1).replace(/ /g, '').trim()));
