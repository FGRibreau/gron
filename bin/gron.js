#!/usr/bin/env node

const flat = require('flat');
const _ = require('lodash');
const s = process.openStdin();
let d = '';
s.on('data', c => d += c).on('end', () => console.log(objectToGron(JSON.parse(d))));

function preserveDotInKeyName(k){
  return k.replace(/\./g, '__*__');
}

function objectToGron(objectOrArray) {
  const gron = {
    json: _.mapKeys(objectOrArray, (v, k) => preserveDotInKeyName(k))
  };

  let seenPath = {};

  return _.map(flat(gron), (v, k) => {

      // add preambule
      return _.toPath(k).reduce((m, kPart) => {

        m.walkedPath.push(kPart);
        const path = m.walkedPath.join('.');

        if (!_.has(seenPath, path)) {
          seenPath[path] = true;

          if (path !== k) { // we did not joined the final key name
            const nodeValue = _.get(gron, path);
            m.output.push(line(key(path), val(Array.isArray(nodeValue) ? [] : {})));
          } else {
            m.output.push(line(key(k), val(v)));
          }
        }

        return m;

      }, {
        walkedPath: [],
        output: []
      }).output.join('\n');
    })
    .join('\n')
    .trim();
}

function sortObject(obj) {
  return _.chain()
}

function line(k, v) {
  return `${k} = ${v};`;
}

function key(k) {
  return k.replace(/(\.([0-9]+))/g, '[$2]').replace(/\.(\w+)__\*__(\w+)/, '["$1.$2"]');
}

function val(v) {
  return JSON.stringify(v);
}
