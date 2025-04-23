const { remote } = require('webdriverio');

const capabilities = {
    platformName: 'Android',
    'appium:automationName': 'UiAutomator2',
    'appium:deviceName': 'Android',
    'appium:appPackage': 'com.android.settings',
    'appium:appActivity': '.Settings',
};

const wdOpts = {
    hostname: process.env.APPIUM_HOST || 'localhost',
    port: parseInt(process.env.APPIUM_PORT, 10) || 4723,
    logLevel: 'info',
    capabilities,
};

async function runTest() {
    const driver = await remote(wdOpts);
    try {
        const batteryItem = await driver.$('//*[@text="Apps"]');
        await batteryItem.click();
        const calendarItem = await driver.$('//*[@text="Calendar"]');
        await calendarItem.click();
        const notificationsItem = await driver.$('//*[@text="Notifications"]');
        await notificationsItem.click();
        const showNotificationsItem = await driver.$('//*[@text="all"]');
        await showNotificationsItem.click();
    } finally {
        await driver.pause(1000);
        await driver.deleteSession();
    }
}

runTest().catch(console.error);