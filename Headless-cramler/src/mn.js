const puppeteer=require('puppeteer');
(
    async()=>{
        const browser=await puppeteer.launch({});
        const page=await browser.newPage();
        await page.goto('https://image.baidu.com/');
        console.log('go to https://image.baidu.com/');
        
        await page.setViewport({
            width:1920,
            height:1080
        });
        console.log('reset viewport');

        await page.focus('#kw');//模拟用户行为，聚焦到input框
        await page.keyboard.sendCharacter('柴犬');//输入搜索内容
        await page.click('.s_btn');//点击‘百度一下 ’
        console.log('go to search list');
        
        page.on('load',()=>{//页面加载后执行……
            console.log('page loading done,start fetch……');
            
            const srcs=await
        });
        
        await browser.close();
    }
)();