const creds = require("./creds");

var webdriver = require("selenium-webdriver"),
    By = webdriver.By,
    until = webdriver.until;

function createDriver() {
    var driver = new webdriver.Builder()
        .usingServer('http://localhost:4444/wd/hub')
        .withCapabilities(webdriver.Capabilities.chrome())
        .build();
    return driver;
}

var browser = createDriver();

browser.get('http://localhost:7000/');
browser.manage().timeouts().implicitlyWait(5000);
browser.findElement(By.id("userName")).clear();
browser.findElement(By.css("#userName")).sendKeys(creds.userName);
browser.findElement(By.name("firstName")).clear();
browser.findElement(By.xpath(".//input[@id='firstName']")).sendKeys(creds.firstName);
browser.findElement(By.css("#lastName")).clear();
browser.findElement(By.css("#lastName")).sendKeys(creds.lastName);
browser.findElement(By.css("#email")).clear();
browser.findElement(By.css("#email")).sendKeys(creds.email);
browser.findElement(By.css("#role")).sendKeys(creds.role);
browser.findElement(By.xpath(".//span[text()='Sign in']")).click();
browser.wait(until.elementLocated(By.css("div[class*='dropdown-menu_header']")));
browser.findElement(By.css("div[class*='dropdown-menu_header']")).click();
browser.findElement(By.linkText("Manage Attributes")).click();
browser.findElement(By.partialLinkText("Add Attr")).click();
browser.findElement(By.css("div[class*='with-field_root'] input[class*='text-input_input']")).sendKeys("!name_for_webdriverjs_ak_module");
browser.findElement(By.css("textarea[class*='text-input_textarea']")).sendKeys("description_for_webdriverjs_ak_module");
browser.findElement(By.xpath(".//span[text()='Please select...']")).click();
browser.findElement(By.xpath(".//div[text()='Text']")).click();
browser.findElement(By.className("_d7e6c8__checkbox_label")).click();
browser.findElement(By.xpath(".//button[text()='Create']")).click();
browser.findElement(By.css("div[class*='inline-notification_root__success']")).getText().then(function(txt){
    console.log("Success creation message: " + txt);
});
browser.findElement(By.xpath(".//td[text()='!name_for_webdriverjs_ak_module']/..//i[@data-qa-id='delete']")).click();
browser.findElement(By.xpath(".//button[text()='Yes']")).click();
browser.wait(until.elementLocated(By.css("div[class*='inline-notification_root__success']")));
browser.sleep(3000);
browser.quit();
