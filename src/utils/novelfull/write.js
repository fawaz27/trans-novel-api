const axios = require('axios');
const cheerio = require('cheerio')  ;

const baseUrl = 'https://novelfull.com';
const url = 'latest-release-novel';

const headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36',
    'Accept-Language': 'en-US,en;q=0.9,fr;q=0.8',
    'Accept-Encoding': 'gzip, deflate, br',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    'Connection': 'keep-alive',
};

const getNovelsLatest = async (numberpage) => {
    const { data } = await axios.get(`${baseUrl}/${url}?page=${numberpage}`, { headers });
    const $ = cheerio.load(data);
    const listPage = $('.col-xs-12.col-sm-12.col-md-9.col-truyen-main.archive');
    const rows = listPage.find('.row');
    
    
    const result = [];
    rows.each((i, row) => {
        const image = $(row).find('img').attr('src');
        const title = $(row).find('.col-xs-7 a').text();
        const chapter = $(row).find('.col-xs-2.text-info span').text();
        result.push({ image: baseUrl + image, title, chapter});
    });
    console.log(result[0]);
}

getNovelsLatest(2);
