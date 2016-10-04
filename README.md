<div align="center">
  <br><p><strong>gron</strong> - Make JSON greppable!.</p>
</div>

=========================================

<!-- [![Build Status](https://img.shields.io/circleci/project/FGRibreau/gron.svg)](https://circleci.com/gh/FGRibreau/gron/) [![Coverage Status](https://img.shields.io/coveralls/FGRibreau/gron/master.svg)](https://coveralls.io/github/FGRibreau/gron?branch=master)  -->

[![Deps](	https://img.shields.io/david/FGRibreau/gron.svg)](https://david-dm.org/FGRibreau/gron) [![NPM version](https://img.shields.io/npm/v/gron.svg)](http://badge.fury.io/js/gron)
<!-- [![Downloads](http://img.shields.io/npm/dm/gron.svg)](https://www.npmjs.com/package/gron) -->

[![available-for-advisory](https://img.shields.io/badge/available%20for%20consulting%20advisory-yes-ff69b4.svg?)](http://bit.ly/2c7uFJq) ![extra](https://img.shields.io/badge/actively%20maintained-yes-ff69b4.svg)

<!-- ![NPM](https://nodei.co/npm/gron.png?downloadRank=true) ![NPM](https://nodei.co/npm-dl/gron.png?months=3&height=2) -->

Make JSON greppable!

> gron transforms JSON into discrete assignments to make it easier to grep for what you want and see the absolute 'path' to it. It eases the exploration of APIs that return large blobs of JSON but have terrible documentation.

```
▶ curl -s https://jsonplaceholder.typicode.com/users | gron | fgrep "company.name"
json[0].company.name = "Romaguera-Crona";
json[1].company.name = "Deckow-Crist";
json[2].company.name = "Romaguera-Jacobson";
json[3].company.name = "Robel-Corkery";
json[4].company.name = "Keebler LLC";
json[5].company.name = "Considine-Lockman";
json[6].company.name = "Johns Group";
json[7].company.name = "Abernathy Group";
json[8].company.name = "Yost and Sons";
json[9].company.name = "Hoeger LLC";
```

gron can work backwards too, enabling you to turn your filtered data back into JSON:


```
▶ curl -s https://jsonplaceholder.typicode.com/users | gron | fgrep "company.name" | ungron
[
  {
    "company": {
      "name": "Romaguera-Crona"
    }
  },
  {
    "company": {
      "name": "Deckow-Crist"
    }
  },
  ...
  ...
```


## Installation

Install with [npm](https://npmjs.org/package/gron).

    npm install -g gron

### Usage

Get JSON from a file:

```
▶ cat testdata/two.json | gron
json = {};
json.name = "FGRibreau";
json.github = "https://github.com/fgribreau/";
json.likes = [];
json.likes[0] = "code";
json.likes[1] = "cheese";
json.likes[2] = "meat";
json.contact = {};
json.contact.email = "github@fgribreau.com";
json.contact.twitter = "@FGRibreau";
```

From a URL:

```
▶ curl -s http://headers.jsontest.com/ | gron
json = {};
json.X-Cloud-Trace-Context = "e6bb50fada05a9f8152091463863382a/4805449055235230110";
json.Host = "headers.jsontest.com";
json.User-Agent = "curl/7.43.0";
json.Accept = "*/*";
```

Grep for something and easily see the path to it:

```
▶ cat testdata/two.json | gron | grep twitter
json.contact.twitter = "@FGRibreau";
```

gron makes diffing JSON easy too:

```
▶ diff <(cat two.json | gron) <(cat two-b.json | gron)
10c10
< json.contact.twitter = "@FGRibreau";
---
> json.contact.twitter = "@fgribreau";
```

The output of gron is valid JavaScript:

```
▶ cat testdata/two.json | gron > tmp.js
▶ echo "console.log(json);" >> tmp.js
▶ nodejs tmp.js
{ name: 'FGRibreau',
  github: 'https://github.com/fgribreau/',
  likes: [ 'code', 'cheese', 'meat' ],
  contact: { email: 'github@fgribreau.com', twitter: '@FGRibreau' } }
```

## ungronning

gron can also turn its output back into JSON:

```
▶ cat testdata/two.json | gron | ungron
{
  "name": "FGRibreau",
  "github": "https://github.com/fgribreau/",
  "likes": [
    "code",
    "cheese",
    "meat"
  ],
  "contact": {
    "email": "github@fgribreau.com",
    "twitter": "@FGRibreau"
  }
}
```

This means you use can use gron with grep and other tools to modify JSON:

```
▶ cat testdata/two.json | gron | grep likes | ungron
{
  "likes": [
    "code",
    "cheese",
    "meat"
  ]
}
```

To preserve array keys, arrays are padded with null when values are missing:

```
▶ cat testdata/two.json | gron | grep likes | grep -v cheese
json.likes = [];
json.likes[0] = "code";
json.likes[2] = "meat";
▶ cat testdata/two.json | gron | grep likes | grep -v cheese | ungron
{
  "likes": [
    "code",
    null,
    "meat"
  ]
}
```

## [Changelog](CHANGELOG.md)

## Todo

This whole projet (up to v2.0.1, from idea to this README) was done in 1 hour, so there is some missing features in this implementation (if you can call 3 line of codes an implementation):

- [ ] add color highlighting


## Credits

This module is entirely inspired by [tomnomnom/gron](https://github.com/tomnomnom/gron) but instead of reinventing the wheel it relies on nodejs+[flat](https://github.com/hughsk/flat).

## You want to support my work?

I maintain this project in my free time, if it helped you, well, I would be grateful to buy a beer thanks to your [paypal](https://paypal.me/fgribreau) or [Bitcoins](https://www.coinbase.com/fgribreau), donation!

[Francois-Guillaume Ribreau](http://fgribreau.com) (npm@fgribreau.com)
