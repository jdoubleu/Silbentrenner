# Silbentrenner [![Build Status](https://travis-ci.com/jdoubleu/Silbentrenner.svg?branch=master)](https://travis-ci.com/jdoubleu/Silbentrenner)
Silbentrenner (*engl. Hyphenator*) is a simple web application written with [Vue.js](http://vuejs.org/) to hyphenate german words in a given text.

![Screenshot](./screenshot.png)

It uses [hypher](https://github.com/bramstein/hypher/) to actually hyphenate the words.

## Language
At the moment this app only supports hyphenation for german language.
However it is possible to change the language before building the app.
Just install another [hyphenation pattern](https://github.com/bramstein/hyphenation-patterns) and import it in [`lib/Hyphenator.js`](./src/lib/Hyphenator.js).

E.g:
```javascript
import english from 'hyphenation.en-gb'

...
this.h = new Hypher(english)
...
```

## Development
### Setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```
Please note that you have to change the [`publicPath`](https://cli.vuejs.org/config/#publicpath) option in [`vue.config.js`](./vue.config.js).

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### License
Silbentrenner is licensed under [Blue Oak Model License 1.0.0](./LICENSE)
