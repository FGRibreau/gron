#!/usr/bin/env node
'use strict';

const _ = require('lodash');
const s = process.openStdin();
const vm = require('vm');
let d = '';
s.on('data', c => d += c).on('end', () => console.log(JSON.stringify(gronToObject(d), null, 2)));

function gronToObject(str) {
  const sandbox = {};

  // setup sandbox
  _.compact(str.trim().split('\n')).reduce((obj, line) => {
    const splitLine = line.split('=');
    const rawKey = splitLine[0];
    const rawValue = splitLine[1];
    return _.set(obj, rawKey.trim(), null);
  }, sandbox);

  const script = new vm.Script(str);
  const context = new vm.createContext(sandbox);
  script.runInContext(context);
  return sandbox.json;
}
