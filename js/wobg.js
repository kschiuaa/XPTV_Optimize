const cheerio = createCheerio()

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'

const appConfig = {
    ver: 1,
    title: '正奕',
    site: 'http://jnczyl.top:8900',
    tabs: [
        {
            name: '電影',
            ext: {
                id: 24,
            },
        },
        {
            name: '劇集',
            ext: {
                id: 25,
            },
        },
        {
            name: '動漫',
            ext: {
                id: 26,
            },
        },
        {
            name: '綜藝',
            ext: {
                id: 27,
            },
        },
        {
            name: '音樂',
            ext: {
                id: 28,
            },
        },
        {
            name: '短劇',
            ext: {
                id: 29,
            },
        },
        {
            name: '紀錄片',
            ext: {
                id: 30,
            },
        },
        {
            name: '4K高碼',
            ext: {
                id: 31,
            },
        },
    ],
}

async function getConfig() {
    return jsonify(appConfig)
}

async function getCards(ext) {
    ext = argsify(ext)
    let cards = []
    let { page = 1, id } = ext

    const url = appConfig.site + `/index.php/vod/show/id/${id}/page/${page}.html`

    const { data } = await $fetch.get(url, {
        headers: {
            'User-Agent': UA,
        },
    })

    const $ = cheerio.load(data)

    const videos = $('#main .module-item')
    videos.each((_, e) => {
        const href = $(e).find('.module-item-pic a').attr('href')
        const title = $(e).find('.module-item-pic img').attr('alt')
        const cover = $(e).find('.module-item-pic img').attr('data-src')
        const remarks = $(e).find('.module-item-text').text()
        cards.push({
            vod_id: href,
            vod_name: title,
            vod_pic: cover,
            vod_remarks: remarks,
            ext: {
                url: `${appConfig.site}${href}`,
            },
        })
    })

    return jsonify({
        list: cards,
    })
}

async function getTracks(ext) {
    ext = argsify(ext)
    let tracks = []
    let url = ext.url

    const { data } = await $fetch.get(url, {
        headers: {
            'User-Agent': UA,
        },
    })

    const $ = cheerio.load(data)

    const playlist = $('.module-player-list .module-row-one')
    playlist.each((_, e) => {
        const name = $(e).find('.module-row-title h4').text().replace('- 第1集', '')
        const panShareUrl = $(e).find('.module-row-title p').text()
        tracks.push({
            name: name.trim(),
            pan: panShareUrl,
        })
    })

    return jsonify({
        list: [
            {
                title: '默认分组',
                tracks,
            },
        ],
    })
}

async function getPlayinfo(ext) {
    return jsonify({ urls: [] })
}

async function search(ext) {
    ext = argsify(ext)
    let cards = []

    let text = encodeURIComponent(ext.text)
    let page = ext.page || 1
    let url = `${appConfig.site}/index.php/vod/search/page/${page}/wd/${text}.html`

    const { data } = await $fetch.get(url, {
        headers: {
            'User-Agent': UA,
        },
    })

    const $ = cheerio.load(data)

    const videos = $('#main .module-search-item')
    videos.each((_, e) => {
        const href = $(e).find('.video-info-header h3 a').attr('href')
        const title = $(e).find('.module-item-pic img').attr('alt')
        const cover = $(e).find('.module-item-pic img').attr('data-src')
        const remarks = $(e).find('.video-serial').text()
        cards.push({
            vod_id: href,
            vod_name: title,
            vod_pic: cover,
            vod_remarks: remarks,
            ext: {
                url: `${appConfig.site}${href}`,
            },
        })
    })

    return jsonify({
        list: cards,
    })
}
