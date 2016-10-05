const t = require('chai').assert;
const execSync = require('child_process').execSync;
const DIR = require('path').resolve(__dirname, '..');
const readFileSync = require('fs').readFileSync;

describe('gron', () => {

  it('should work', () => {
    t.strictEqual(execSync(`cat ${DIR}/testdata/commits.json | ${DIR}/bin/gron.js`).toString('utf8'), readFileSync(`${DIR}/testdata/commits.gron`, 'utf8'));
  });

  describe('dot attributes', () => {
    it('should work', () => {
      t.strictEqual(execSync(`echo '{"foo.bar": 123}' | ${DIR}/bin/gron.js`).toString('utf8').trim(), `json = {};\njson["foo.bar"] = 123;`);
    });

    it('should work', () => {
      t.strictEqual(execSync(`echo '{"foo.bar": 123}' | ${DIR}/bin/gron.js | ./bin/ungron.js`).toString('utf8').trim(), `{\n  "foo.bar": 123\n}`);
    });

    it('should work', () => {
      t.strictEqual(execSync(`echo '{"foo.bar": {"foo2.bar2": 123}}' | ${DIR}/bin/gron.js`).toString('utf8').trim(), `json = {};\njson["foo.bar"] = {};\njson["foo.bar"]["foo2.bar2"] = 123;`);
    });

  });
});
