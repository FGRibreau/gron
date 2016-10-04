#!/usr/bin/env node

const JSON5 = require('json5');
const unflatten = require('flat').unflatten;
const s = process.openStdin();
let d = '';
s.on('data', c => d += c).on('end', () => console.log(JSON.stringify(unflatten(JSON5.parse('{' + d + '}')), null, 2)));
