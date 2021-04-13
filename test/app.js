const { Builder, By, Key, until } = require('selenium-webdriver');
const faker = require('faker');
const { expect } = require('chai');

describe('Account', () => {
    const driver = new Builder().forBrowser('firefox').build();
    const accountName = faker.name.findName();
    const accountEmail = faker.internet.email().toLowerCase();
    const accountPhone = faker.phone.phoneNumber();
    const password = faker.internet.password();
    const wrongPassword = faker.internet.password();

    it('it create a account success!', async () => {
        await driver.get("http://localhost:80");
        await driver.findElement(By.name("signup")).click(); 
        await driver.sleep(1000);
        await driver.findElement(By.name("accountName")).sendKeys(accountName);
        await driver.sleep(1000);
        await driver.findElement(By.name("accountEmail")).sendKeys(accountEmail);
        await driver.sleep(1000);
        await driver.findElement(By.name("accountPhone")).sendKeys(accountPhone);
        await driver.sleep(1000);
        await driver.findElement(By.name("password")).sendKeys(password);
        await driver.findElement(By.name("rePassword")).sendKeys(password);
        await driver.sleep(1000);
        await driver.findElement(By.name("submit")).click(); 
        await driver.sleep(1000);
        const title = await driver.switchTo().alert().getText()
        await (await driver.switchTo().alert()).accept();

        expect(title).to.equal('The account has been created successfully!'); 
    });

    it('it create a account fail: accountEmail is exist!', async () => {
       await driver.get("http://localhost:80");
       await driver.findElement(By.name("signup")).click();
       await driver.sleep(1000);
       await driver.findElement(By.name("accountName")).sendKeys(accountName);
       await driver.sleep(1000);
       await driver.findElement(By.name("accountEmail")).sendKeys(accountEmail);
       await driver.sleep(1000);
       await driver.findElement(By.name("accountPhone")).sendKeys(accountPhone);
       await driver.sleep(1000);
       await driver.findElement(By.name("password")).sendKeys(password);
       await driver.sleep(1000);
       await driver.findElement(By.name("rePassword")).sendKeys(password);
       await driver.sleep(1000);
       await driver.findElement(By.name("submit")).click(); 
       await driver.sleep(2000);

       await driver.switchTo().alert().getText()
       await driver.switchTo().alert().accept();
       await driver.sleep(2000);
       const error = await driver.findElement(By.name("error")).getText();

       expect(error).to.equal('Your email was exist!'); 
    });
   
    it('it login account with success!', async () => {
        await driver.get("http://localhost:80");
        await driver.findElement(By.name("login")).click(); 
        await driver.sleep(1000);
        await driver.findElement(By.name("accountEmail")).sendKeys(accountEmail);
        await driver.sleep(1000);
        await driver.findElement(By.name("password")).sendKeys(password);
        await driver.sleep(1000);
        await driver.findElement(By.name("submit")).click(); 
        await driver.sleep(1000);
        const info = await driver.findElement(By.name("info")).getText();

        expect(accountEmail).to.equal(info.toLowerCase()); 
    });

    it('it login account with fail: wrong password', async () => {
        await driver.get("http://localhost:80");
        await driver.findElement(By.name("login")).click(); 
        await driver.sleep(1000);
        await driver.findElement(By.name("accountEmail")).sendKeys(accountEmail);
        await driver.sleep(1000);
        await driver.findElement(By.name("password")).sendKeys(wrongPassword);
        await driver.sleep(1000);
        await driver.findElement(By.name("submit")).click(); 
        await driver.sleep(1000);
        const info = await driver.findElement(By.name("info")).getText();

        expect(info.toLowerCase()).to.equal('email or password is incorrect!');  
    });

    after( async() => (await driver).quit());
})