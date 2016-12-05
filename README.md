# web-component-env [![npm](https://img.shields.io/npm/l/web-component-env.svg?style=flat-square)]()
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
# npm i web-component-env --save-dev
```

Once the installation is done, the main command `wce` is accessible in the `bin` folder of `node_modules`:

```bash
# ./node_modules/.bin/wce
```

A list of available subcommand shoud appear:

|`./node_modules/.bin/wce <command>`|description|
|-----------------------------------|-----------|
|`start`|serves the app at `localhost:3000` with hmr|
|`lint`|lint all `.js` files|
|`test`|runs unit tests with mocha and generates coverage report with nyc|
|`bundle`|compiles the application to disk|

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
