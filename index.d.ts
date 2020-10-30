import { Transform } from 'stream'
import File = require('vinyl')
import 'cheerio'

interface Editor {
  ($: cheerio.Selector, file: File): Promise<void> | void
}

declare const gulpEditHtml: (editor: Editor) => Transform
export = gulpEditHtml
