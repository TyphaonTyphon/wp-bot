const qrcode = require('qrcode-terminal');
const { MessageMedia } = require('whatsapp-web.js');
const { Client } = require('whatsapp-web.js');
const client = new Client();

client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message_edit', message => {
    const number = "+905465946982";
    const chatId = number.substring(1) + "@c.us";
    console.log(message)
    //client.sendMessage(chatId, message.toString());
})

client.on('message_revoke_everyone', message => {
    const number = "+905465946982";
    const chatId = number.substring(1) + "@c.us";
    console.log(message)
    //client.sendMessage(chatId, message.toString());
})

client.on('message_create', async message => {
    if (message.fromMe) {
        message.from = message.to
        if (message.body.startsWith('/sfw')) {
            let mean = message.body.replace('/sfw ', "")
            fetch(`https://api.waifu.pics/sfw/${mean}`)
                .then(response => response.json())
                .then(data => {
                    async function sendphoto() {
                        const media = await MessageMedia.fromUrl(data.url);
                        client.sendMessage(message.from, media);
                    }
                    sendphoto()
                })
        }
        if (message.body.startsWith('/nsfw')) {
            let mean = message.body.replace('/nsfw ', "")
            fetch(`https://api.waifu.pics/nsfw/${mean}`)
                .then(response => response.json())
                .then(data => {
                    async function sendphoto() {
                        const media = await MessageMedia.fromUrl(data.url);
                        client.sendMessage(message.from, media);
                    }
                    sendphoto()
                })
        }

        if (message.body === '/resendmedia' && message.hasQuotedMsg) {
            const quotedmessage = await message.getQuotedMessage();
            if (quotedmessage.hasMedia) {
                const attachmentData = await quotedmessage.downloadMedia();
                client.sendMessage(message.from, attachmentData, { caption: 'Here\'s your requested media.' });
            }
            if (quotedmessage.hasMedia && quotedmessage.type === 'audio') {
                const audio = await quotedmessage.downloadMedia();
                await client.sendMessage(message.from, audio, { sendAudioAsVoice: true });
            }
        }

        if (message.body === '/sticker' && message.hasQuotedMsg) {
            const quotedmessage = await message.getQuotedMessage();
            if (quotedmessage.hasMedia) {
                const attachmentData = await quotedmessage.downloadMedia();
                client.sendMessage(message.from, attachmentData, { sendMediaAsSticker: true });
            }
        }

        if (message.body === '/isviewonce' && message.hasQuotedMsg) {
            const quotedmessage = await message.getQuotedMessage();
            if (quotedmessage.hasMedia) {
                const media = await quotedmessage.downloadMedia();
                await client.sendMessage(message.from, media);
            }
        }
    }
})

client.on('message', async message => {

    if (message.body.startsWith('/sfw')) {
        let mean = message.body.replace('/sfw ', "")
        fetch(`https://api.waifu.pics/sfw/${mean}`)
            .then(response => response.json())
            .then(data => {
                async function sendphoto() {
                    const media = await MessageMedia.fromUrl(data.url);
                    client.sendMessage(message.from, media);
                }
                sendphoto()
            })
    }
    if (message.body.startsWith('/nsfw')) {
        let mean = message.body.replace('/nsfw ', "")
        fetch(`https://api.waifu.pics/nsfw/${mean}`)
            .then(response => response.json())
            .then(data => {
                async function sendphoto() {
                    const media = await MessageMedia.fromUrl(data.url);
                    client.sendMessage(message.from, media);
                }
                sendphoto()
            })
    }
    if (message.body === '/resendmedia' && message.hasQuotedMsg) {
        const quotedmessage = await message.getQuotedMessage();
        if (quotedmessage.hasMedia) {
            const attachmentData = await quotedmessage.downloadMedia();
            client.sendMessage(message.from, attachmentData, { caption: 'Here\'s your requested media.' });
        }
        if (quotedmessage.hasMedia && quotedmessage.type === 'audio') {
            const audio = await quotedmessage.downloadMedia();
            await client.sendMessage(message.from, audio, { sendAudioAsVoice: true });
        }
    }

    if (message.body === '/sticker' && message.hasQuotedMsg) {
        const quotedmessage = await message.getQuotedMessage();
        if (quotedmessage.hasMedia) {
            const attachmentData = await quotedmessage.downloadMedia();
            client.sendMessage(message.from, attachmentData, { sendMediaAsSticker: true });
        }
    }

    if (message.body === '/isviewonce' && message.hasQuotedMsg) {
        const quotedmessage = await message.getQuotedMessage();
        if (quotedmessage.hasMedia) {
            const media = await quotedmessage.downloadMedia();
            await client.sendMessage(message.from, media, { isViewOnce: true });
        }
    }
})

client.initialize();