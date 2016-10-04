#!/usr/bin/env node

const JSON5 = require('json5');
const unflatten = require('flat').unflatten;
const _ = require('lodash');
const s = process.openStdin();
let d = '';
s.on('data', c => d += c).on('end', () => console.log(JSON.stringify(gronToObject(d), null, 2)));

function gronToObject(str) {
  return _.compact(str.trim().split('\n')).reduce((obj, line) => {
    const [rawKey, rawValue]  = line.split('=');
    const val = JSON.parse(rawValue.trim().replace(';', ''));
    return _.set(obj, rawKey.trim(), val);
  }, {}).json;
}
