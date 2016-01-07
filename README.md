# generator-go-negroni-pat-angular [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]
> Create microservice base on AngularJS + Go + Negroni + Pat

## Installation

First, install [Yeoman](http://yeoman.io) and generator-go-negroni-pat-angular using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
  npm install -g yo
  npm install -g generator-go-negroni-pat-angular
```

## Creating a Go (Pat + Negroni) service

In a new directory, generate the service:

```bash
  yo go-negroni-pat-angular
```

Please run this next commands in your GOPATH folder.

Make sure you install Godep first, you can install by running:
```bash
  go get github.com/tools/godep
```
Get the dependencies:

```bash
  godep restore
  godep get
```

Run the server:

```bash
  go run server.go
```

Your service will run at [http://localhost:5050](http://localhost:5050).

A client-side AngularJS application will now be available by running

```bash
	grunt server
```

The Grunt server will run at [http://localhost:5051](http://localhost:5051).
It will proxy REST requests to Go server running at [http://localhost:5050](http://localhost:5050).

The Grunt server supports hot reloading of client-side HTML/CSS/Javascript file changes.
## Getting To Know Yeoman

Yeoman has a heart of gold. He&#39;s a person with feelings and opinions, but he&#39;s very easy to work with. If you think he&#39;s too opinionated, he can be easily convinced. Feel free to [learn more about him](http://yeoman.io/).

## License

MIT © [idochetrit]()


[npm-image]: https://badge.fury.io/js/generator-go-negroni-pat-angular.svg
[npm-url]: https://npmjs.org/package/generator-go-negroni-pat-angular
[travis-image]: https://travis-ci.org/idoch/generator-go-negroni-pat-angular.svg?branch=master
[travis-url]: https://travis-ci.org/idoch/generator-go-negroni-pat-angular
[daviddm-image]: https://david-dm.org/idoch/generator-go-negroni-pat-angular.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/idoch/generator-go-negroni-pat-angular
