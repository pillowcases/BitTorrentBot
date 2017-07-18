const TelegramBot = require('node-telegram-bot-api');
const token = '445349598:AAGtQPAJTBypQtD9TWnocOseuWHUOlJZ-Sw';
const telegram = new TelegramBot(token, {polling: true});
const UTorrent = require('library-utorrent');
const query = require('yify-search').search;
const pirata = require('pirata');
const gis = require('g-i-s');
// searchs yify for a torrent
telegram.onText(/^\/yify (.+)$/i, (msg, match) => {
        if (msg.from.id !== /*YOUR TELEGRAM ID*/) return; // you can remove this line if you want anyone to be able to use it
    var search = match[1]
    console.log(msg)
     query(search, (error, result) => {
         if (result.length === 0) return telegram.sendMessage(msg.chat.id, "*No results found*", {parse_mode: 'Markdown'});
         let meme = result[0];
         let example = Math.random().toString();
         telegram.sendPhoto(msg.chat.id, `${meme.large_cover_image}`, {
             reply_markup: JSON.stringify({
                 inline_keyboard: [
                    [
                        {text: `🎥YIFY Link`, url: `${meme.url}`},
                        {text: `📤Magnet Link`, callback_data: example}
                    ],
                 ]
             })
         }, {caption: `Movie: ${meme.title}`})
         console.log(result)
            telegram.on('callback_query', function onCallbackQuery(callbackQuery, match) {
                const action = callbackQuery.data;
                const msg = callbackQuery.message;
            if (action === example) {
                telegram.sendMessage(msg.chat.id, `\`\`\`${meme.magnet}\`\`\``, {parse_mode: 'Markdown'});
            }
        })
     })
});
// adds to bittorrent
telegram.onText(/^\/add (.+)$/i, (msg, match) => {
        if (msg.from.id !== /*YOUR TELEGRAM ID*/) return; // you can remove this line if you want anyone to be able to use it
    var link = match[1]
    UTorrent.addTorrentUrl({
        host: 'YOUR HOST', port: '8080', username: `YOUR USERNAME`, password: `YOUR PASSWORD`,
        torrentUrl: link, downloadDir: 0, path: ``,
    }).exec({
        error: function (err){
            telegram.sendMessage(msg.chat.id, `*An unexpected error occurred.*`, {parse_mode: 'Markdown'})
            console.log(err)
        },
        success: function (){
            telegram.sendMessage(msg.chat.id, `*Added magnet to BitTorrent*`, {parse_mode: 'Markdown'})
        }
    });
});
// gets download status of any torrent
telegram.onText(/^\/status$/i, msg => {
        if (msg.from.id !== /*YOUR TELEGRAM ID*/) return; // you can remove this line if you want anyone to be able to use it
    UTorrent.listTorrents({
        host: 'YOUR HOST', port: '8080', username: `YOUR USERNAME`, password: `YOUR PASSWORD`,
    }).exec({
        error: function (err) {
            telegram.sendMessage(msg.chat.id, `*An unexpected error occurred.*`, {parse_mode: 'Markdown'})
            console.log(err)
        },
        success: function (torrents){
            for (let item of torrents) {
                let torrent = item.parsed;
                telegram.sendMessage(msg.chat.id, `${torrent.name}: *${torrent.percentProgressMils/10}%*`, {parse_mode: 'Markdown'})
                console.log(torrents)
            }
        }
    });
})
// gets torrent hash
telegram.onText(/^\/hash$/i, msg => {
        if (msg.from.id !== /*YOUR TELEGRAM ID*/) return; // you can remove this line if you want anyone to be able to use it
    UTorrent.listTorrents({
        host: 'YOUR HOST', port: '8080', username: `YOUR USERNAME`, password: `YOUR PASSWORD`,
    }).exec({
        error: function (err) {
            telegram.sendMessage(msg.chat.id, `*An unexpected error occurred.*`, {parse_mode: 'Markdown'})
            console.log(err)
        },
        success: function (torrents){
            for (let item of torrents) {
                let torrent = item.parsed;
                telegram.sendMessage(msg.chat.id, `${torrent.name}: \`\`\`${torrent.hash}\`\`\``, {parse_mode: 'Markdown'})
                console.log(torrents)
            }
        }
    });
})
// searches tpb
telegram.onText(/^\/pb (.+)$/i, (msg, match) => {  
        if (msg.from.id !== /*YOUR TELEGRAM ID*/) return; // you can remove this line if you want anyone to be able to use it
    var torrent = match[1] 
    var opts = { url: "https://thepiratebay.org/", page: 0, cat: 200 }
        pirata.search(torrent, opts, function(err, res){
            let memes = res[0]
            if (res.length === 0) return telegram.sendMessage(msg.chat.id, "*No results found*", {parse_mode: 'Markdown'});
            let example = Math.random().toString();
                gis(`${torrent}` + `poster`, logResults);
            function logResults(error, results) {
                if (error) {
                     telegram.sendMessage(msg.chat.id, `*An unexpected error occurred.*`, {parse_mode: 'Markdown'})
                }
                else {
                    let meme = results[1]
                    let example = Math.random().toString();
                        telegram.sendPhoto(msg.chat.id, meme.url, {
                            reply_markup: JSON.stringify({
                                inline_keyboard: [
                                        [
                                            {text: `📤Magnet Link`, callback_data: example}
                                        ],
                                    ]
                                })
                            })
                telegram.on('callback_query', function onCallbackQuery(callbackQuery, match) {
                    const action = callbackQuery.data;
                    const msg = callbackQuery.message;
                        if (action === example) {
                        telegram.sendMessage(msg.chat.id, `\`\`\`${memes.magnet}\`\`\``, {parse_mode: 'Markdown'});
                        }
                    })
                    
                }
            }
        }); 
    });
    //removes torrent from bittorrent
    telegram.onText(/^\/remove (.+)$/i, (msg, match) => {  
        if (msg.from.id !== /*YOUR TELEGRAM ID*/) return; // you can remove this line if you want anyone to be able to use it
        var thash = match[1]
        UTorrent.removeTorrent({
        host: 'YOUR HOST', port: '8080', username: `YOUR USERNAME`, password: `YOUR PASSWORD`,
        hash: thash,
    }).exec({
        error: function (err){
            telegram.sendMessage(msg.chat.id, `*An unexpected error occurred.*`, {parse_mode: 'Markdown'})
            console.log(err)
        },
        success: function (){
            telegram.sendMessage(msg.chat.id, `*Removed torrent from BitTorrent*`, {parse_mode: 'Markdown'})
        }
    });
})
