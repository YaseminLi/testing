const {expect}=require('chai');
const webdriver=require('selenium-webdriver');
const chromeDriver=require('selenium-webdriver/chrome');

describe('百度首页 UI测试',function(){
    this.timeout(50000);//UI测试的时间比较长，mocha的默认时间较短，防止被停掉延长下时间
    let driver;
    before(()=>{
        new webdriver.Builder()
    .forBrowser('chrome')
    .setChromeOptions(/* ... */)
    .setFirefoxOptions(/* ... */)
    .build();
    });
});