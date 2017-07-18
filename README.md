# This is a bot to add magnet torrents to your BitTorrent client from Telegram.
* Legal use only




#Installation
* Clone git

 Change these throughout the code with your own

``` 
const token = 'REPLACE WITH YOUR OWN';
if (msg.from.id !== /*YOUR TELEGRAM ID*/) return;
host: 'YOUR HOST', port: '8080', username: `YOUR USERNAME`, password: `YOUR PASSWORD`,
```

* Run these commands
``` 
npm install
node index
```
* Message the bot on Telegram

# Commands

* /yify (term) - searches on yify for a search term
* /pb (term) - searches on TPB for a search term 
* /add (magnet) - adds magnet to torrent client
* /hash - gets all current torrent hashes in BitTorrent
* /remove (hash) - removes that torrent from BitTorrent
* /status - gets all torrents download status
