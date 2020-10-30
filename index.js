const { Transform } = require('stream')
const render = require('./src/render')

module.exports = editor =>
  new Transform({
    objectMode: true,
    async transform(file, _, done) {
      if (file.isBuffer()) {
        let html = file.contents.toString()
        html = await render(html, editor)
        file.contents = Buffer.from(html)
      }
      done(null, file)
    },
  })
