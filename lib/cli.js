'use strict'

const cli = require('commander')
const c = require('chalk')

const filters = require('./filters').display
const client = require('./client')

const tab = '  '

cli.version(require('../package.json').version)

cli
  .command('search <title>')
  .alias('s')
  .description('search for torrent by title')
  .option('-f, --filter <filter>', 'limit torrent search to category')
  .option('-l, --limit <number>', 'limit amount of results returned')
  .action(search)
  .on('--help', () => {
    console.log(`
  ${c.bold('Example:')}

    lorent search --filter hdrip "The Hateful 8"
    lorent s -f movies "Grave of the Fireflies"
    lorent s -f ebooks "Salmon Recipes"`)
  })

cli
  .command('list')
  .alias('l')
  .description('list available filters (default=all)')
  .action(list)

cli.parse(process.argv)

function list() {

  const msg = Object.keys(filters)
    .map(x => {
      return x.includes(':')
        ? tab + tab + c.green(x.split(':')[1])
        : tab + c.green.bold(x)
    })
    .join('\n')

  console.log(msg)
}

function search(cmd, env) {
  client
    .search(cmd, {
      filter: env.filter,
      limit: env.limit
    })
    .then(result => client.displaySearchResult(result, env.limit))
}
