//通过src下载图片
//src have two : url base64
const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const writeFile = promisify(fs.writeFile);


//判断src类型，匹配调用方法
module.exports = async (src, dir) => {
    if (/\.(jpg|png|gif)$/.test(src)) {
        await urltoimg(src, dir);
    } else {
        await base64toimg(src, dir);
    }
}

//url=>imgs
const urltoimg = promisify((url, dir, callback) => {
    const mod = /^https:/.test(url) ? https : http;
    const ext = path.extname(url);//获取拓展名
    const file = path.join(dir,`${Date.now()}${ext}`);
        mod.get(url, res => {
            res.pipe(fs.createWriteStream(file))
                .on('finish', () => {
                    callback();
                    console.log(file);
                })
        });
   
})
//base64
//file:文件的绝对路径
//matches[2]文件内容
const base64toimg = async function (base64Str, dir) {
    //base64字符串形式：data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABA
    const matches = base64Str.match(/^data:(.+?);base64,(.+)$/);
    try {
        const ext = matches[1].split('/')[1].replace('jpeg', 'jpg');
        const file = path.join(dir,`${Date.now()}.${ext}`);
        await writeFile(file, matches[2], 'base64');
        console.log('base64:'+file);
    } catch (ex) {
        console.log('非法 base64 字符串');
    }
};

