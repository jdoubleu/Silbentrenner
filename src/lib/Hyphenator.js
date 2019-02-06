import Hypher from 'hypher'
import german from 'hyphenation.de'

function tokenizeText(text) {
  const reTextTokens = /(\s*[.,;:!?\-\s\n\t]\s*)/
  const rePunctuation = /[^.,;:?!\-\s\n\t]/

  return text.split(reTextTokens)
    .map(value => {
      return {
        type: value.match(rePunctuation) ? 'word' : 'punc',
        value
      }
    })
}

class Hyphenator {
  constructor(colors) {
    this.h = new Hypher(german)
    this.colors = colors
  }

  hyphenText(text) {
    return tokenizeText(text)
      .map(this._hyphenToken.bind(this))
      .map(this._colorizeToken.bind(this))
      .map(token => token.value)
      .join('')
      .replace(/\n/g, '<br>')
  }

  _hyphenToken(token) {
    if (token.type !== 'word') {
      return token
    }

    token.value = this.h.hyphenate(token.value)
    return token
  }

  _getColor(index) {
    return this.colors[ index % this.colors.length ]
  }

  _colorizeToken(token) {
    if (token.type !== 'word') {
      return token
    }

    token.value = token.value.reduce(
      (acc, hyphen, index) => `${acc}<span style="color: ${this._getColor(index)}">${hyphen}</span>`,
      ''
    )

    return token
  }
}

export default Hyphenator
