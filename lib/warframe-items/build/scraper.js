const prod = process.env.NODE_ENV === 'production'
const request = require('requestretry').defaults({ fullResponse: false })
const _ = require('lodash')
const ProgressBar = require('progress')
const colors = require('colors/safe')
const WeaponScraper = require('./wikia/scrapers/WeaponScraper')
const WarframeScraper = require('./wikia/scrapers/WarframeScraper')
const ModScraper = require('./wikia/scrapers/ModScraper')

const damageTypes = [
  'impact',
  'slash',
  'puncture',
  'heat',
  'cold',
  'electricity',
  'toxin',
  'viral',
  'corrosive',
  'radiation',
  'blast',
  'magnetic',
  'gas',
  'void'
]

process.on('unhandledRejection', err => {
  console.log(err)
  process.exit()
})

// Helper functions for messy parsing to make code less messy.
const title = (str) => str.toLowerCase().replace(/\b\w/g, l => l.toUpperCase())
const sanitize = (str) => str.replace(/\n/g, '').replace(/\\r\\r/g, '\\n')
const get = async (url) => JSON.parse(sanitize(await request(url)))

// Wikia data scraping for additional information
const scrapeWikia = async () => ({
  weapons: await new WeaponScraper().scrape(),
  warframes: await new WarframeScraper().scrape(),
  upgrades: await new ModScraper().scrape()
})

// We'll get these later before processing items as they're required for item
// attributes.
let manifest, wikiaData

class Scraper {
  constructor () {
    this.endpoints = [
      'http://content.warframe.com/MobileExport/Manifest/ExportWeapons.json',
      'http://content.warframe.com/MobileExport/Manifest/ExportUpgrades.json',
      'http://content.warframe.com/MobileExport/Manifest/ExportSentinels.json',
      'http://content.warframe.com/MobileExport/Manifest/ExportResources.json',
      'http://content.warframe.com/MobileExport/Manifest/ExportDrones.json',
      'http://content.warframe.com/MobileExport/Manifest/ExportCustoms.json',
      'http://content.warframe.com/MobileExport/Manifest/ExportFlavour.json',
      'http://content.warframe.com/MobileExport/Manifest/ExportKeys.json',
      'http://content.warframe.com/MobileExport/Manifest/ExportGear.json',
      'http://content.warframe.com/MobileExport/Manifest/ExportRelicArcane.json',
      'http://content.warframe.com/MobileExport/Manifest/ExportWarframes.json'
    ]
    this.data = []
    this.bar = prod ? {
      interrupt () {},
      tick () {}
    } : new ProgressBar(`:check Procesing Endpoints: ${colors.green('[')}:bar${colors.green(']')} :current/:total :etas remaining ${colors.cyan(':type')}`, {
      incomplete: colors.red('-'),
      width: 20,
      total: this.endpoints.length
    })
  }

  /**
   * Generate All.json data
   */
  async fetchAll () {
    let data = {}

    await this.fetchEndpoints()
    await this.fetchAdditional()

    await Promise.all(this.endpoints.map(async e => {
      const type = e.split('/')[e.split('/').length - 1].replace('Export', '').replace('.json', '')
      const categories = await this.fetch(type)
      data = _.mergeWith(data, categories, (a, b) => _.isArray(a) ? a.concat(b) : undefined)
      this.bar.tick({
        type,
        check: (this.bar.curr === this.endpoints.length - 1) ? colors.green('✓') : colors.yellow('-')
      })
    }))

    // Order everything alphabetically
    for (let category of Object.keys(data)) {
      data[category].sort((a, b) => {
        const res = a.name.localeCompare(b.name)
        if (res === 0) {
          return a.uniqueName.localeCompare(b.uniqueName)
        } else {
          return res
        }
      })
    }
    return data
  }

  /**
   * Generate single .json data
   */
  async fetch (type) {
    const url = this.endpoints.find(e => e.includes(type))
    const items = (await get(url))[`Export${type}`]

    return this.filter(items, type, new Date())
  }

  /**
   * Fetch item data for each endpoint beforehand. We'll need them for adding
   * certain item attributes.
   */
  async fetchEndpoints () {
    const recipes = 'http://content.warframe.com/MobileExport/Manifest/ExportRecipes.json'

    for (let endpoint of this.endpoints.concat(recipes)) {
      const type = endpoint.split('/')[endpoint.split('/').length - 1].replace('.json', '')
      const data = (await get(endpoint))[type]
      this.data.push({ type, data })
    }
  }

  /**
   * Retrieve additional resources required for processing. Ducats, components,
   * etc
   */
  async fetchAdditional () {
    manifest = (await get('http://content.warframe.com/MobileExport/Manifest/ExportManifest.json')).Manifest
    wikiaData = await scrapeWikia()
  }

  /**
   * Add, modify, remove certain keys as I deem sensible. Complaints go to
   * management.
   */
  async filter (items, type, timer) {
    const data = {}
    items = this.removeComponents(items)

    for (let i = 0; i < items.length; i++) {
      let item = items[i]

      this.addType(item)
      this.sanitize(item)
      this.addImageName(item, items[i - 1])
      if (item.components) {
        for (let component of item.components) {
          this.addImageName(component, null, true)
        }
      }
      this.addCategory(item, type)
      this.addTradable(item, type)
      this.addAdditionalWikiaData(item, type)

      // Add to category
      if (!data[item.category]) {
        data[item.category] = [item]
      } else {
        data[item.category].push(item)
      }
    }
    return data
  }

  /**
   * Delete item components that are separate from their parent. We'll add them
   * to the parent in `this.addComponents`. Also remove any damaged mods (anything in the folder '/Beginner')
   */
  removeComponents (items) {
    const result = []

    for (let item of items) {
      if ((!item.uniqueName.includes('/Recipes') && !item.uniqueName.includes('/Beginner')) && item.name) {
        result.push(item)
      }
    }
    return result
  }

  /**
   * Remove unnecessary values, use consistent string casing, clarify some
   * obscure conventions.
   */
  sanitize (item) {
    // Capitalize item names which are usually all uppercase
    if (item.name) item.name = title(item.name)
    if (item.type) item.type = title(item.type)
    if (item.trigger) item.trigger = title(item.trigger)
    if (item.noise) item.noise = title(item.noise)
    if (item.type) item.type = title(item.type)
    if (item.rarity) item.rarity = title(item.rarity)

    // Remove <Archwing> from archwing names, add archwing key instead
    if (item.name && item.name.includes('<Archwing>')) {
      item.name = item.name.replace(/<Archwing> /, '')
      item.archwing = true
    } else if(item.name && !item.name.includes('<Archwing>') && item.sentinel !== undefined) {
      item.archwing = false
    }

    // Add riven key to riven mods
    if (item.name && item.name.includes('Riven')) {
      item.isRiven = true
    }

    // Add transmuteCore key to transmute cores
    if (item.name && item.uniqueName.includes('TransmuteCore')) {
      item.isTransmuteCore = true
    }

    // Relics don't have their grade in the name for some reason
    if (item.type === 'Relic') {
      const grades = [
        { id: 'Bronze', tier: 'Intact' },
        { id: 'Silver', tier: 'Exceptional' },
        { id: 'Gold', tier: 'Flawless' },
        { id: 'Platinum', tier: 'Radiant' }
      ]
      for (let grade of grades) {
        if (item.uniqueName.includes(grade.id)) {
          item.name = item.name.replace('Relic', grade.tier)
        }
      }
    }

    // Use `name` key for abilities as well.
    if (item.abilities) {
      item.abilities = item.abilities.map(a => {
        return {
          name: title(a.abilityName),
          description: a.description
        }
      })
    }

    // Make descriptions a string, not array
    if (item.description && item.description instanceof Array) item.description = item.description.join()

    // Use proper polarity names
    switch (item.polarity) {
      case 'AP_DEFENSE':
        item.polarity = 'Vazarin'
        break
      case 'AP_TACTIC':
        item.polarity = 'Naramon'
        break
      case 'AP_ATTACK':
        item.polarity = 'Madurai'
        break
      case 'AP_POWER':
        item.polarity = 'Zenurik'
        break
      case 'AP_PRECEPT':
        item.polarity = 'Penjaga'
        break
      case 'AP_WARD':
        item.polarity = 'Unairu'
        break
      case 'AP_UMBRA':
        item.polarity = 'Umbra'
        break
    }

    // Remove keys that only increase output size.
    delete item.codexSecret
    delete item.longDescription
    delete item.parentName
    delete item.relicRewards // We'll fetch the official drop data for this
    delete item.subtype
  }

  /**
   * Add image name for images that will be fetched outside of this scraper.
   */
  addImageName (item, previous, isComponent) {
    const imageStub = manifest.find(i => i.uniqueName === item.uniqueName).textureLocation
    const ext = imageStub.split('.')[imageStub.split('.').length - 1] // .png, .jpg, etc

    if (isComponent) {
      if (item.name === 'Blueprint') {
        item.imageName = 'blueprint'
      } else {
        item.imageName = imageStub.split('\\')[imageStub.split('\\').length - 1]
          .split('.')[0].replace(/([a-z](?=[A-Z]))/g, '$1-').toLowerCase()
      }
    } else {
      item.imageName = item.name.replace('/', '').replace(/( |\/|\*)/g, '-').toLowerCase()
    }

    // Some items have the same name - so add their uniqueName as an identifier
    if (previous && item.name === previous.name) {
      item.imageName += ` - ${item.uniqueName.replace('/', '').replace(/( |\/|\*)/g, '-')}`
    }
    item.imageName += `.${ext}`
  }

  /**
   * Add item type. Stuff like warframe, archwing, polearm, dagger, etc.
   * Most types can be found in the uniqueName key. If present, just assign it
   * as the type. Note that whatever key is found first 'wins'. For example
   * Archwings are saved as /Lotus/Powersuits/Archwing/*, while Warframes are
   * saved as /Lotus/Powersuits/*, meaning that Archwing has to be looked for
   * first, otherwise it would consider it a Warframe.
   */
  addType (item) {
    const types = require('../config/types.json')
    for (let itemType of types) {
      if (item.uniqueName.includes(`/${itemType.id}`)) {
        item.type = itemType.name
        break
      }
    }
    // No type assigned? Add 'Special'.
    if (!item.type) {
      item.type = 'Misc'
    }
  }

  /**
   * Limit items to tradable/untradable if specified.
   */
  addTradable (item, type) {
    const tradableTypes = ['Gem', 'Fish', 'Key', 'Focus Lens', 'Relic']
    const untradableTypes = ['Skin', 'Medallion', 'Extractor', 'Pets', 'Ship Decoration']
    const tradableRegex = /(Prime|Vandal|Wraith|Rakta|Synoid|Sancti|Vaykor|Telos|Secura)/i
    const untradableRegex = /(Glyph|Mandachord|Greater.*Lens|Sugatra)/i
    const notFiltered = !untradableTypes.includes(item.type) && !item.name.match(untradableRegex)
    const isTradable = type === 'Upgrades' || (item.uniqueName.match(tradableRegex) && notFiltered) || (tradableTypes.includes(item.type) && notFiltered)

    item.tradable = isTradable
  }

  /**
   * Add more meaningful item categories. These will be used to determine the
   * output file name.
   */
  addCategory (item, type) {
    switch (type) {
      case 'Customs':
        if (item.type === 'Sigil') item.category = 'Sigils'
        else item.category = 'Skins'
        break

      case 'Drones':
        item.category = 'Misc'
        break

      case 'Flavour':
        if (item.name.includes('Sigil')) item.category = 'Sigils'
        else if (item.name.includes('Glyph')) item.category = 'Glyphs'
        else item.category = 'Skins'
        break

      case 'Gear':
        item.category = 'Gear'
        break

      case 'Keys':
        if (item.name.includes('Derelict')) item.category = 'Relics'
        else item.category = 'Quests'
        break

      case 'RelicArcane':
        if (!item.type === 'Relic') item.category = 'Arcanes'
        else item.category = 'Relics'
        break

      case 'Sentinels':
        if (item.type === 'Sentinel') item.category = 'Sentinels'
        else item.category = 'Pets'
        break

      case 'Upgrades':
        if (item.isRiven) item.category = 'Rivens'
        else if (item.isTransmuteCore) item.category = 'Misc'
        else item.category = 'Mods'
        break

      case 'Warframes':
        if (item.archwing) item.category = 'Archwing'
        else item.category = 'Warframes'
        break

      case 'Weapons':
        if(item.uniqueName.includes('SentinelWeapons')) item.category = 'Sentinel Primary'
        else if(item.uniqueName.includes('Archwing/Primary')) item.category = 'Archwing Primary'
        else if(item.uniqueName.includes('Archwing/Melee')) item.category = 'Archwing Melee'
        else if (item.slot === 5 && !item.name.includes('Zaw')) item.category = 'Melee'
        else if (item.slot === 0) item.category = 'Secondary'
        else if (item.slot === 1) item.category = 'Primary'
        else item.category = 'Misc'
        break

      case 'Resources':
        if (item.type === 'Pets') item.category = 'Pets'
        else if (item.type === 'Specter') item.category = 'Gear'
        else if (item.type === 'Resource') item.category = 'Resources'
        else if (item.type === 'Fish') item.category = 'Fish'
        else if (item.type === 'Ship Decoration') item.category = 'Skins'
        else if (item.type === 'Gem') item.category = 'Resources'
        else if (item.type === 'Plant') item.category = 'Resources'
        else item.category = 'Misc'
    }
  }

  /**
   * Adds data scraped from the wiki to a particular item
   * @param {Object} item              item to modify
   * @param {String} type type of the item, defaults to warframe
   */
  addAdditionalWikiaData (item, type) {
    if (!['weapons', 'warframes', 'upgrades'].includes(type.toLowerCase())) return
    const wikiaItem = wikiaData[type.toLowerCase()].find(i => i.name.toLowerCase() === item.name.toLowerCase())
    if (!wikiaItem) return
    switch (type.toLowerCase()) {
      case 'warframes':
        this.addWarframeWikiaData(item, wikiaItem)
        break
      case 'weapons':
        this.addWeaponWikiaData(item, wikiaItem)
        break
      case 'upgrades':
        this.addModWikiaData(item, wikiaItem)
        break
      default:
        break
    }
  }

  addWarframeWikiaData (item, wikiaItem) {
    item.aura = wikiaItem.auraPolarity
    item.conclave = wikiaItem.conclave
    item.color = wikiaItem.color
    item.introduced = wikiaItem.introduced
    item.masteryReq = item.masteryReq || wikiaItem.mr
    item.polarities = wikiaItem.polarities
    item.sex = wikiaItem.sex
    item.sprint = wikiaItem.sprint
    item.vaulted = wikiaItem.vaulted
    item.wikiaThumbnail = wikiaItem.thumbnail
    item.wikiaUrl = wikiaItem.url
  }

  addWeaponWikiaData (item, wikiaItem) {
    item.ammo = wikiaItem.ammo
    item.channeling = wikiaItem.channeling
    item.damage = wikiaItem.damage
    item.damageTypes = {}
    damageTypes.forEach(type => {
      item.damageTypes[type] = wikiaItem[type]
    })
    item.flight = wikiaItem.flight
    item.marketCost = wikiaItem.marketCost
    item.masteryReq = item.masteryReq || wikiaItem.mr
    item.polarities = wikiaItem.polarities
    item.projectile = wikiaItem.projectile
    item.secondary = wikiaItem.secondary
    item.secondaryArea = wikiaItem.secondaryArea
    item.stancePolarity = wikiaItem.stancePolarity
    item.statusChance = wikiaItem.status_chance
    item.tags = wikiaItem.tags
    item.type = wikiaItem.type
    item.vaulted = wikiaItem.vaulted
    item.wikiaThumbnail = wikiaItem.thumbnail
    item.wikiaUrl = wikiaItem.url
    
    // Fill in missing data for Arching weapons
    if(!item.trigger && wikiaItem.trigger) {
      item.trigger = wikiaItem.trigger.replace('Auto-Spool', 'Auto').replace('Semi-Auto', 'Semi')
      item.noise = 'Alarming'
    } else if(!item.trigger && !wikiaItem.trigger && item.uniqueName.includes('Archwing/Melee')) {
      item.trigger = 'Melee'
      item.noise = 'Alarming'
    }
    if(item.uniqueName.includes('Archwing/Primary')) {
      item.type = 'Arch-Gun'
    } 
    else if(item.uniqueName.includes('Archwing/Melee')) {
      item.type = 'Arch-Melee'
    }
    
    if (item.omegaAttenuation <= 0.75) {
      item.disposition = 1
    } else if (item.omegaAttenuation <= 0.895) {
      item.disposition = 2
    } else if (item.omegaAttenuation <= 1.105) {
      item.disposition = 3
    } else if (item.omegaAttenuation <= 1.3) {
      item.disposition = 4
    } else if (item.omegaAttenuation <= 1.6) {
      item.disposition = 5
    }
  }

  addModWikiaData (item, wikiaItem) {
    const unusedProperties = ['name', 'rank', 'cost']
    item.stats = {}
    for (let property of Object.keys(wikiaItem)) {
      if (unusedProperties.indexOf(property) === -1) {
        item.stats[property] = wikiaItem[property]
      }
    }
  }
}

module.exports = new Scraper()
