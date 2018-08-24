const cheerio = require('cheerio')
const cheerioTableParser = require('cheerio-tableparser')
const axios = require('axios')

const camelize = function (str) {
  return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (match, index) {
    if (+match === 0) return '' // or if (/\s+/.test(match)) for white spaces
    return index == 0 ? match.toLowerCase() : match.toUpperCase()
  })
}

const transformMod = async (oldMod, imageUrls) => {
  const parseModInfoTable = data => {
    const $ = cheerio.load(data)
    cheerioTableParser($)
    const modInfoTable = $('.emodtable > tbody')
      .first()
      .parsetable(false, false, true)
    const modInfo = {}

    for (const col of modInfoTable) {
      const [colHeader, ...contents] = col
      let colTitle
      if (!colHeader) {
        continue
      }

      if (colHeader.match(/<*>/)) {
        colTitle = camelize(
          $(colHeader)
            .text()
            .trim()
        )
      } else {
        colTitle = camelize(colHeader.trim())
      }

      modInfo[colTitle] = contents
    }
    return modInfo
  }

  const getModStats = async modTitle => {
    try {
      const { data } = await axios.get(`http://warframe.wikia.com/wiki/${modTitle.replace(/ /g, '_')}`)
      const parsedModInfoTable = parseModInfoTable(data)
      return { name: modTitle, ...parsedModInfoTable }
    } catch (err) {
      console.error(`Failed to fetch mod info for mod ${modTitle}:`)
      console.error(err)
      return ''
    }
  }

  const modStats = await getModStats(oldMod.Name)

  return modStats
}

module.exports = transformMod
