// @ts-check
require('dotenv').config({path:'./env/.env'}); 
const { defineConfig, devices } = require('@playwright/test');

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  testDir: './tests',
  retries:1,
 
  timeout: 30*1000,
  expect: {
  timeout : 5000
  },
  /* Run tests in files in parallel */
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  projects:[
  { name:'safari',
    use: {
      
      browserName :'webkit',
      headless : true,
      trace: 'retain-on-failure'
     
    }

  },
  {
    name:'chrome',

    use: {
   
      browserName :'chromium',
      headless : false,
      screenshot : 'only-on-failure',
      trace: 'retain-on-failure'
      //viewport : {width:720,height:720}
     
    }

  }


  ]
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  

  /* Configure projects for major browsers */
  

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});

