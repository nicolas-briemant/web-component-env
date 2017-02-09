![paperplane](/paperplane.png)

# web-component-env
[![NPM](https://nodei.co/npm/web-component-env.png?downloads=true&downloadRank=true)](https://nodei.co/npm/web-component-env/)
[![NPM](https://nodei.co/npm-dl/web-component-env.png?months=6&height=3)](https://nodei.co/npm/web-component-env/)

This boilerplate is designed to help front-end development by providing a bunch of configurable common commands.  
Ideally, this boilerplate should remain as unopiniated as possible but there is still a few conventions to follow.

The philosophy behind this boilerplate is to have a portable development environment which explains why this is not 
an empty project to clone but an npm package to install as a devDependency.  
If the development environment has to be updated, this could be spread easily among dependents.

## Table of Contents
1. [Features](#features)
1. [Requirements](#requirements)
1. [Setup](#setup)
1. [Application Structure](#application-structure)
1. [Commands](#commands)
  1. [start](#start)
  1. [lint](#lint)
  1. [test](#test)
  1. [bundle](#bundle)
  1. [build](#build)
1. [Transversal features](#features)
  1. [Analyzer](#analyzer)

## Features
* [webpack](https://github.com/webpack/webpack)
* [babel](https://github.com/babel/babel)
* [mocha](https://mochajs.org/)
* [chai](http://chaijs.com/)
* [eslint](http://eslint.org)
* [less](http://lesscss.org/)

## Requirements
* node `^4.4.0`
* npm `^3.4.0`

## Setup
Install it as a devDendency:

```bash
$ npm i web-component-env --save-dev
```

Once the installation is done, the main command `wce` is accessible in the `bin` folder of `node_modules`:

```bash
$ ./node_modules/.bin/wce
```

A list of available subcommand shoud appear:

|`./node_modules/.bin/wce <command>`|description|
|-----------------------------------|-----------|
|`start`|serves the app at `localhost:3000` with hmr|
|`lint`|lint all `.js` files|
|`test`|runs unit tests with mocha and generates coverage report with nyc|
|`bundle`|compiles the application to disk|
|`build`|transpile es6 into es5 with babel (npm dependency usage)|

*find below detailed documentation about the commands*

## Application Structure

The application structure is free apart few conventions:

```
.
├── src                      # application source code
│   ├── app.js               # application bootstrap and rendering
│   ├── index.js             # library bootstrap and rendering
└── test                     # unit tests
```

*I strongly suggest to adopt a [modular-based structure](https://gist.github.com/nicolas-briemant/0b29950369ec385b16d4b43ca5585e62) 
which generally leads to more scalable and maintainable applications.*

## Commands

### start

```bash
$ ./node_modules/.bin/wce start
```

Serves the application from `src/app.js`.  
It relies on webpack and provides **hot module replacement** and **sourcemaps** to ease developments.  
Currently, the `index.html` template is automatically generated by wce.

Host and port can be configured (default is `localhost:3000`):

```bash
$ ./node_modules/.bin/wce start --host localhost --port 3000
# or
$ ./node_modules/.bin/wce start -h localhost -p 3000
# or
$ HOST=localhost PORT=3000 ./node_modules/.bin/wce start
```

*The process can be terminated by writting kill, Windows often fails to terminate all nodes processes by using ctrl+c.*

### lint

```bash
$ ./node_modules/.bin/wce lint
```

Lint all `.js` files.  
A [default configuration](https://github.com/nicolas-briemant/web-component-env/blob/master/.eslintrc) is provided and can currently not be overridden.

Target files can be configured (default is `src/**/*.js* test/**/*.js*`):

```bash
$ ./node_modules/.bin/wce lint --pattern src/my-module
# or
$ ./node_modules/.bin/wce lint --p src/**/reducer.js test/test.js
```

*Pattern option accepts globbing and several entries.*

### test

```bash
$ ./node_modules/.bin/wce test
```

Runs unit tests with mocha and generates coverage report with nyc.  
Test runner is mocha, default test library is chai and coverage tool is nyc.

Target files can be configured (default is `test/**/*.js*`):

```bash
$ ./node_modules/.bin/wce test --pattern test/my-module
# or
$ ./node_modules/.bin/wce test --p src/not-in-test.js
```

*Coverage report is currently available in text only.*

### bundle

The bundle command compiles the application for static deployments.  
There are 2 different bundles that serves different purposes.

#### application bundle

The application bundle is used for stand-alone applications.

```bash
$ ./node_modules/.bin/wce bundle --application
# or
$ ./node_modules/.bin/wce bundle -a
```

The entry point of the application build is `src/app.js`.  
The output folder is `dist`.  
The bundled application is `${package.name}.app.js`.

#### library bundle

The library bundle is used to produce libraries that can be required as npm packages or as universal modules.

```bash
$ ./node_modules/.bin/wce bundle --library
# or
$ ./node_modules/.bin/wce bundle -l
```

The entry point of the library build is `src/index.js`.  
The output folder is `dist`.  
The bundled application is `${package.name}.lib.js`.  
In the `package.json` of the application, a special entry `externals` can be defined to exclude dependencies:

```json
{
  "devDependencies": {
    "web-component-env": "2.0.0"
  },
  "dependencies": {
    "d3": "^3.0.0",
    "lodash": "^4.14.1"
  },
  "externals": {
    "d3": "d3",
    "lodash": "_"
  }
}
```

### build

```bash
$ ./node_modules/.bin/wce build
```

Transpile es6 into es5 with babel (npm dependency usage) in `lib/`.  
`lib/` should not be ignored by git.

## Transversal features

### Analyzer

An analyze of the bundle is made by using the options `stats`:

```bash
$ ./node_modules/.bin/wce bundle -a -s
# or
$ ./node_modules/.bin/wce bundle -a --stats
# or
$ ./node_modules/.bin/wce bundle -as
```

When the bundle is shipped, the default local browser is opened with the report.
