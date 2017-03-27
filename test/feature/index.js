module.exports = {
  'Demo Test': (browser) => {
    browser
      .url(browser.launchUrl)
      .waitForElementVisible('.content', 3000)
      .assert.containsText('.content', 'Hello World')
      .end();
  },
};
