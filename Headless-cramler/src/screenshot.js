const puppeteer=require('puppeteer');
const {screenshot}=require('../src/config/default');

(async()=>{ 
    const browser=await puppeteer.launch({headless:false});//headless设为false后，可自动打开网页
    const page=await browser.newPage();
    await page.goto('https://coding.imooc.com/lesson/146.html#mid=7792');
    await page.screenshot({
        path:`${screenshot}/${Date.now()}.png`
    });
    await browser.close();
})();