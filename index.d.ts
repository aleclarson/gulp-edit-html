import { Transform } from 'stream'
import 'cheerio'

interface Editor {
  ($: cheerio.Selector): Promise<void> | void
}

declare const gulpEditHtml: (editor: Editor) => Transform
export = gulpEditHtml
