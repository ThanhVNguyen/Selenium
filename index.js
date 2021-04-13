const { Builder, By, Key, util} = require("selenium-webdriver")
const faker = require('faker');

const accountName = faker.name.findName();
const accountEmail = faker.internet.email();
const accountPhone = faker.phone.phoneNumber();
const password = faker.internet.password();
const wrongPassword = faker.internet.password();

async function login(){
    let driver = await new Builder().forBrowser("firefox").build();
    await driver.get("http://localhost:80");
    await driver.findElement(By.name("login")).click(); 
    await driver.sleep(2000);
    await driver.findElement(By.name("accountEmail")).sendKeys(accountEmail);
    await driver.sleep(2000);
    await driver.findElement(By.name("password")).sendKeys(password);
    await driver.sleep(2000);
    await driver.findElement(By.name("submit")).click();
}

async function register(){
    let driver = await new Builder().forBrowser("firefox").build();
    await driver.get("http://localhost:80");
    await driver.findElement(By.name("signup")).click(); 
    await driver.sleep(2000);
    await driver.findElement(By.name("accountName")).sendKeys(accountName);
    await driver.sleep(2000);
    await driver.findElement(By.name("accountEmail")).sendKeys(accountEmail);
    await driver.sleep(2000);
    await driver.findElement(By.name("accountPhone")).sendKeys(accountPhone);
    await driver.sleep(2000);
    const checkPassword = await driver.findElement(By.name("password")).sendKeys(password);
    const checkRePassword = await driver.findElement(By.name("rePassword")).sendKeys(password);
    await driver.sleep(2000);
    await driver.findElement(By.name("submit")).click(); 
    await driver.sleep(2000);
    if (checkPassword == checkRePassword){
        await console.log(await (driver.switchTo().alert().getText()));
        await (await driver.switchTo().alert()).accept();
        await login();
    } else if (checkPassword == checkWrongPassword) {
        await console.log(await (driver.switchTo().alert().getText()));
        await (await driver.switchTo().alert()).accept();
    }
};
register();