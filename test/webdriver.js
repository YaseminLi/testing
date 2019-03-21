const { expect } = require('chai');
const webdriver = require('selenium-webdriver');
const by=webdriver.By;
const chromeDriver = require('selenium-webdriver/chrome');


//headless模式，在不打开UI界面的情况下启动浏览器
describe('百度首页 UI测试', function () {
    this.timeout(50000);//UI测试的时间比较长，mocha的默认时间较短，防止被停掉延长下时间
    let driver;
    before(() => {
        driver = new webdriver.Builder()
            .forBrowser('chrome')
            .setChromeOptions(new chromeDriver.Options().addArguments(['headless']))
            .build();
    });

    //测试网页标题是否为百度一下……
    it('should have title "百度一下，你就知道', done => {
        driver.get('https://www.baidu.com').then(() => {
            driver.getTitle().then(title => {
                expect(title).to.equal('百度一下，你就知道');
                done();
            });
        });
    });

    //测试搜索框右边按钮内容
    it('should have button value 百度一下', done => {
        driver.findElement(by.id('su')).then(button => {
            button.getAttribute('value').then(val => {//获取button的内容
                expect(val).to.equal('百度一下');
                done();
            });
        });
    });

    //测试搜索弹出页面的标题
    it('搜索 test', async () => {
        const input = await driver.findElement(By.id('kw'));
        await input.sendKeys('test');
        const button = await driver.findElement(By.id('su'));
        await button.click();
        const handler = await driver.getWindowHandle();//获取窗口句柄，即每个窗口的标识符
        await driver.switchTo().window(handler);//切换窗口
        driver.sleep(1000);
        const title = await driver.getTitle();
        expect(title).to.equal('test_百度搜索');
      });

    after(() => {
        driver.quit();
    });
});