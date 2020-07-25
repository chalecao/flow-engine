module.exports = {
  "output_folder": false,
  "src_folders": [
    "test"
  ],
  "webdriver": {
    "start_process": true,
    "server_path": "node_modules/.bin/chromedriver",
    "port": 9515
  },
  "test_settings": {
    "default": {
      "desiredCapabilities": {
        "browserName": "chrome",
        "chromeOptions": {
          "args": [
            "--headless"
          ]
        }
      }
    }
  }
}