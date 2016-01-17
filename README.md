# Lorent

> CLI to search for torrent data via
  [torrentproject.se](https://torrentproject.se) api

Require Node.js >= 4

Eventually I'd like to add the ability to pipe chosen hash directly
into [webtorrent][https://github.com/feross/webtorrent]
(perhaps you can help (nudge nudge)); I'm fine using copy pasta for now.

```bash
Usage: lowrent [options] [command]


Commands:

  search|s [options] <title>  search for torrent by title
  list|l                      list available filters (default=hdrip)

Options:

  -h, --help     output usage information
  -V, --version  output the version number
```

## Example

```bash
lowrent s -f hdrip "Star Wars"
```

Returns something like:

```bash
total found: 13429

[1]
       title: Star Wars Episode I, II, III, IV, V, VI - Complete Saga George Lucas Eng Subs 720p [H264-mp4]
    category: hdrip
       seeds: 7216
      leechs: 2129
torrent_size: 6.8 GB
torrent_hash: 8479a6d8bd55904907ef3c69833be0981323f505

[2]
       title: Star_Wars_The_Force_Awakens_2015_HD-CAM_XViD_HQMic_AC3-CPG.avi
    category: video
       seeds: 8458
      leechs: 1089
torrent_size: 2 GB
torrent_hash: c28b3973f693bae99c1b0c13a137a051eef8d9d5

[3]
       title: Star Wars Episode IV A New Hope (1977) [1080p]
    category: hdrip
       seeds: 4886
      leechs: 480
torrent_size: 1.83 GB
torrent_hash: fe1e1069de410fb44157f02b4f6655dde99621c6

# etc. up to [10]
```

## Filters

```bash
audio
  lossless
  mp3
video
  tv
  dvdrip
  hdrip
  dvd
  lq
ebooks
  comics
  magazines
  tutorials
  audiobook
images
mobile
games
  pc
  nintendo
  playstation
  xbox
applications
adult
all
```


[torrentproject]: https://torrentproject.se
