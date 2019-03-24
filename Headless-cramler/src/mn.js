const puppeteer=require('puppeteer');
const {mn}=require('./config/default');
const srctoimg=require('../helper/srctoimg');
(
    async()=>{
        //executablePath:'../chromium/Chromium.app'
        const browser=await puppeteer.launch({headless:false});
        const page=await browser.newPage();
        await page.goto('https://image.baidu.com/');
        console.log('go to https://image.baidu.com/');
        
        await page.setViewport({
            width:1000,
            height:1000
        });
        console.log('reset viewport');

        await page.focus('#kw');//模拟用户行为，聚焦到input框
        await page.keyboard.sendCharacter('柴犬');//输入搜索内容
        await page.click('.s_search');//点击‘搜索按钮 ’
        console.log('go to search list');
        
        page.on('load',(async()=>{//页面加载后执行……
            console.log('page loading done,start fetch……');
            
            //获取页面所有元素：$$eval
            const srcs=await page.$$eval('img.main_img',images=>{
                return Array.prototype.map.call(images,img=>img.src);
            })
            //获取页面所有元素：evaluate
            // const srcs=await page.evaluate(()=>{
            //     const images=document.querySelectorAll('img.main_img');//'.main_img 不对，需要添加img标签'
            //     return Array.prototype.map.call(images,img=>img.src);
            // });
            console.log(`get ${srcs.length} images,strat download……`);
            

            //保存图片
            srcs.forEach(async(src)=> {
                //console.log(mn);
                // await page.waitFor(2000);
                await srctoimg(src,mn);
            });

            await browser.close();
            
        }));
        
    }
)();