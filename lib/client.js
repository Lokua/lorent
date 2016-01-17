'use strict'

const fetch = require('node-fetch')
const c = require('chalk')
const each = require('lodash.foreach')
const prettyBytes = require('pretty-bytes')
const STATUS_CODES = require('http').STATUS_CODES

const filters = require('./filters').filters

const TORRENT_PROJECT = 'https://torrentproject.se'

const defaults = {
  filter: filters.all,
  limit: 10
}

module.exports = { search, displaySearchResult }

/**
* Search for a torrent on https://torrentproject.se
*
* @param  {String}   query   torrent title
* @param  {Object}   options torrentproject.se api options
* @param  {Number}   options.limit limit search results
* @param  {String}   options.filter category filter
* @return {Promise}  api results parsed from json
*/
function search(query, options) {

  query = encodeURIComponent(query)

  const opts = Object.assign({}, defaults, options)

  const apiCall =
    `${TORRENT_PROJECT}/?s=${query}&orderby=best&filter=${opts.filter}&out=json`

  return fetch(apiCall)
    .then(res => {
      if (res.status !== 200) {
        console.error(c.red(
          `api call returned with ${STATUS_CODES[res.statusCode]}`))

        return Promise.reject(res)
      }

      return res.json()
    })
}

function displaySearchResult(result, limit) {
  console.log(`\ntotal found: ${c.green(result.total_found)}`)

  limit = limit || defaults.limit

  each(result, (value, key) => {
    if (key !== 'total_found' && +key <= limit) {
      console.log(c.yellow(`\n[${key}]`))
      each(value, (v, k) => {
        if (k === 'torrent_size') v = prettyBytes(v)
        console.log(`${lpad(k, 'torrent_hash')}: ${c.green(v)}`)
      })
    }
  })

  return result
}

function lpad(value, max) {
  const count = String(max).length - String(value).length
  const zeros = ' '.repeat(parseInt(count, 10))
  return zeros+value
}

function ltrim(str) {
  return str.split('\n')
    .map(s => s.replace(/$\t*/, ''))
    .join('\n')
}
