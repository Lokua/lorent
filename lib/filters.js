'use strict'

const invert = require('lodash.invert')

/**
 * @see https://torrentproject.se/api
 */

// filters here are for CLI display indenting,
const display = invert({
  9000: 'all',
  1000: 'audio',
  1101: 'audio:lossless',
  1102: 'audio:mp3',
  2000: 'video',
  2101: 'video:tv',
  2102: 'video:dvdrip',
  2103: 'video:hdrip',
  2104: 'video:dvd',
  2105: 'video:lq',
  3000: 'ebooks',
  3101: 'ebooks:comics',
  3102: 'ebooks:magazines',
  3103: 'ebooks:tutorials',
  3104: 'ebooks:audiobook',
  4000: 'images',
  5000: 'mobile',
  6000: 'games',
  6101: 'games:pc',
  6102: 'games:nintendo',
  6103: 'games:playstation',
  6104: 'games:xbox',
  7000: 'applications',
  8000: 'adult'
})

const filters = {}
Object.keys(display).map(key => {
  let value = display[key]
  if (key.includes(':')) key = key.split(':')[1]
  filters[key] = value
})

module.exports = { display, filters }
