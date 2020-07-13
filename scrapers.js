const puppeteer = require('puppeteer');

const items = [
    'https://www.amazon.ca/Nintendo-HCCPACBAA-Animal-Crossing-Horizons/dp/B0812KNJDD/ref=pd_vtp_63_1/142-8823065-4539840?_encoding=UTF8&pd_rd_i=B0812KNJDD&pd_rd_r=900ea41c-4c90-42f2-a727-219ea070372e&pd_rd_w=s5Qdn&pd_rd_wg=MQPHQ&pf_rd_p=3519613d-4da1-4f36-b949-d4b1168a8022&pf_rd_r=BPMHHB2PD6E5ER4D7P49&psc=1&refRID=BPMHHB2PD6E5ER4D7P49',
    'https://www.amazon.ca/Nintendo-HDHSBAZAA-SwitchTM-Lite-Turquoise/dp/B07V4GCFP9/ref=sr_1_2?dchild=1&keywords=switch&qid=1594600013&sr=8-2',
    
]

async function scrape(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    const[elTitle] = await page.$x('//*[@id="productTitle"]');
    const jsonTitle = await elTitle.getProperty('textContent');
    const title = await jsonTitle.jsonValue();

    const[elPrice] = await page.$x('//*[@id="priceblock_ourprice"]');
    const jsonPrice = await elPrice.getProperty('textContent');
    const price = await jsonPrice.jsonValue();

    console.log({title, price});
}

for(let i=0; i<items.length; i++){
    scrape(items[i]);
}