const { Transform } = require('stream')
const render = require('./src/render')

module.exports = editor =>
  new Transform({
    objectMode: true,
    async transform(file, _, done) {
      if (file.isBuffer()) {
        file.contents = await render(file.contents, $ => editor($, file))
      }
      done(null, file)
    },
  })
