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
  }

  colorizeText(text) {
    return this.hyphenText(text)
      .map(this._colorizeToken.bind(this))
      .map(token => token.value)
      .join('')
      .replace(/\n/g, '<br>')
  }

  _hyphenToken(token) {
    if (token.type !== 'word') {
      return token
    }

    const hyphenatedTokenValue = this.h.hyphenate(token.value)

    if (hyphenatedTokenValue.length === 1) {
      return token
    }

    return {
      type: 'word-hyphenated',
      value: hyphenatedTokenValue
    }
  }

  _getColor(index) {
    return this.colors[ index % this.colors.length ]
  }

  _colorizeToken(token) {
    switch (token.type) {
      case 'punc':
      case 'word':
        token.value = `<span style="color: ${this._getColor(0)}">${token.value}</span>`
        break
      case 'word-hyphenated':
        token.value = token.value.reduce(
          (acc, hyphen, index) => `${acc}<span style="color: ${this._getColor(index)}">${hyphen}</span>`,
          ''
        )
    }

    return token
  }
}

export default Hyphenator
