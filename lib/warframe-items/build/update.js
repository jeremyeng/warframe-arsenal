/**
 * Update all items locally by default. The entrypoint can then pick those up
 * immediately without fetching them. This storing process is automated by the
 * docker image.
 */
const prod = process.env.NODE_ENV === 'production'
const fs = require('fs')
const stringify = require('./stringify.js')
const scraper = require('./scraper.js')

class Update {
  async scrape () {
    const items = await scraper.fetchAll()
    let all = []

    // Save json data
    Object.keys(items).forEach(key => {
      all = all.concat(items[key]).sort((a, b) => {
        const res = a.name.localeCompare(b.name)
        if (res === 0) {
          return a.uniqueName.localeCompare(b.uniqueName)
        } else {
          return res
        }
      })
      fs.writeFileSync(`${__dirname}/../data/json/${key}.json`, stringify(items[key]))
    })
    fs.writeFileSync(`${__dirname}/../data/json/All.json`, stringify(all))
  }
}

const update = new Update()
update.scrape()
