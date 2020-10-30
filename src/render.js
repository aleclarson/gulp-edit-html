const cheerio = require('cheerio')
const iconv = require('iconv-lite')

/**
 * @param {Buffer} data
 * @param {Function} editor
 * @returns Buffer
 */
async function render(data, editor) {
  const html = decode(data)
  const dom = cheerio.load(html, options)
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

function decode(data) {
  const decoded = iconv.decode(data, 'utf-8')
  return ~decoded.indexOf('�')
    ? iconv.encode(iconv.decode(data, 'gbk'), 'utf-8')
    : decoded
}
