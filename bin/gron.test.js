const t = require('chai').assert;
const execSync = require('child_process').execSync;
const DIR = require('path').resolve(__dirname, '..');
const readFileSync = require('fs').readFileSync;
console.log(DIR);
describe('gron', () => {

  it('should work', () => {
    t.strictEqual(execSync(`cat ${DIR}/testdata/commits.json | ${DIR}/bin/gron.js`).toString('utf8'), readFileSync(`${DIR}/testdata/commits.gron`, 'utf8'));
  });
});
