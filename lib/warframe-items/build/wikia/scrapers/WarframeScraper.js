'use strict'

const WikiaDataScraper = require('../WikiaDataScraper')
const transformWarframe = require('../transformers/transformWarframe')

class WarframeScraper extends WikiaDataScraper {
  constructor () {
    super('http://warframe.wikia.com/wiki/Module:Warframes/data?action=edit', 'Warframe', transformWarframe)
  }
}

module.exports = WarframeScraper
