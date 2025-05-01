const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const userAgents = require('./userAgents'); // Import the user-agent list

function getRandomUserAgent() {
  const randomIndex = Math.floor(Math.random() * userAgents.length);
  return userAgents[randomIndex];
}

async function testUserAgentRotation() {
  let driver;

  try {
    const options = new chrome.Options();
    const randomUserAgent = getRandomUserAgent();
    options.addArguments(`--user-agent=${randomUserAgent}`);
    console.log('Using User-Agent:', randomUserAgent);

    driver = new Builder().forBrowser('chrome').setChromeOptions(options).build();

    const urls = [
      'http://ondecentral-commerce-client-sdk.s3-website.us-east-2.amazonaws.com/product',
      'http://ondecentral-commerce-client-sdk.s3-website.us-east-2.amazonaws.com/about',
      'http://ondecentral-commerce-client-sdk.s3-website.us-east-2.amazonaws.com/contact',
      'http://ondecentral-commerce-client-sdk.s3-website.us-east-2.amazonaws.com/login',
      'http://ondecentral-commerce-client-sdk.s3-website.us-east-2.amazonaws.com/register',
    ];

    for (const url of urls) {
      console.log('Navigating to:', url);
      await driver.get(url);

      // Fetch the page title dynamically
      await driver.sleep(3000); // Wait for page content to load
      const pageTitle = await driver.getTitle();
      console.log('Page Title:', pageTitle || 'No title found'); // Handle cases where title is empty

      // Perform scrolling actions
      console.log('Scrolling through the page...');
      await driver.executeScript('window.scrollTo(0, document.body.scrollHeight);');
      await driver.sleep(2000); // Simulate reading the page
      await driver.executeScript('window.scrollTo(0, 0);');
      await driver.sleep(1000); // Simulate user interaction
    }

  } catch (error) {
    console.error('Error during automation:', error);
  } finally {
    if (driver) {
      await driver.quit();
      console.log('Automation complete!');
    }
  }
}

testUserAgentRotation();
