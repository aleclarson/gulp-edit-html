const cheerio = require('cheerio')
const iconv = require('iconv-lite')

async function render(html, editor) {
  const dom = cheerio.load(decode(html), options)
  await editor(dom)
  return encode(dom.html())
}

module.exports = render

const options = {
  decodeEntities: false,
  xmlMode: false,
  lowerCaseAttributeNames: false,
}

function encode(html) {
  return iconv.encode(html, 'utf-8')
}

function decode(html) {
  const decoded = iconv.decode(html, 'utf-8')
  return ~decoded.indexOf('�')
    ? iconv.encode(iconv.decode(html, 'gbk'), 'utf-8')
    : decoded
}
