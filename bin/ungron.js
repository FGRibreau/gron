#!/usr/bin/env node

const _ = require('lodash');
const s = process.openStdin();
const vm = require('vm');
let d = '';
s.on('data', c => d += c).on('end', () => console.log(JSON.stringify(gronToObject(d), null, 2)));

function gronToObject(str) {
  const sandbox = {};

  // setup sandbox
  _.compact(str.trim().split('\n')).reduce((obj, line) => {
    const [rawKey, rawValue]  = line.split('=');
    return _.set(obj, rawKey.trim(), null);
  }, sandbox);

  const script = new vm.Script(str);
  const context = new vm.createContext(sandbox);
  script.runInContext(context);
  return sandbox.json;
}
