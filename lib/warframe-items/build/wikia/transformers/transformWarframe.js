'use strict'

const POLARITIES = {
  Bar: 'naramon',
  V: 'madurai',
  D: 'vazarin',
  U: 'umbra',
  Ability: 'zenurik',
  R: 'unairu'
}

const transformPolarities = ({ Polarities, AuraPolarity }, targetWeapon) => {
  const outputFrame = { ...targetWeapon }
  if (AuraPolarity) {
    outputFrame.auraPolarity = POLARITIES[AuraPolarity]
  }
  if (Polarities) {
    outputFrame.polarities = Polarities.map(polarity => POLARITIES[polarity])
  } else {
    outputFrame.polarities = []
  }
  return outputFrame
}

const transformWarframe = async (oldFrame, imageUrls) => {
  let newFrame
  if (!oldFrame || !oldFrame.Name) {
    return undefined
  }

  try {
    const {
      AuraPolarity,
      Conclave,
      Image,
      Mastery,
      Polarities,
      Sprint,
      Introduced,
      Sex,
      Vaulted
    } = oldFrame
    const { Name } = oldFrame

    newFrame = {
      name: Name,
      url: `http://warframe.wikia.com/wiki/${encodeURIComponent(Name.replace(/\s/g, '_'))}`,
      thumbnail: imageUrls[Image],
      auraPolarity: AuraPolarity,
      conclave: Conclave,
      mr: Mastery || 0,
      polarities: Polarities,
      sprint: Sprint,
      introduced: Introduced,
      sex: Sex,
      vaulted: Vaulted || undefined
    }
    newFrame = transformPolarities(oldFrame, newFrame)
  } catch (error) {
    console.error(`Error parsing ${oldFrame.Name}`)
    console.error(error)
  }
  return newFrame
}

module.exports = transformWarframe
