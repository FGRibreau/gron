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

The module is entirely inspired by [tomnomnom/gron](https://github.com/tomnomnom/gron) but instead of reinventing the wheel it relies on nodejs+[flat](https://github.com/hughsk/flat).

### Usage

```
▶ curl -s https://jsonplaceholder.typicode.com/users | gron | fgrep "company.name"
"0.company.name":"Romaguera-Crona",
"1.company.name":"Deckow-Crist",
"2.company.name":"Romaguera-Jacobson",
"3.company.name":"Robel-Corkery",
"4.company.name":"KeeblerLLC",
"5.company.name":"Considine-Lockman",
"6.company.name":"JohnsGroup",
"7.company.name":"AbernathyGroup",
"8.company.name":"YostandSons",
"9.company.name":"HoegerLLC",
```

## Installation

Install with [npm](https://npmjs.org/package/gron).

    npm install -g gron

## [Changelog](CHANGELOG.md)

## You want to support my work?

I maintain this project in my free time, if it helped you, well, I would be grateful to buy a beer thanks to your [paypal](https://paypal.me/fgribreau) or [Bitcoins](https://www.coinbase.com/fgribreau), donation!

[Francois-Guillaume Ribreau](http://fgribreau.com) (npm@fgribreau.com)
