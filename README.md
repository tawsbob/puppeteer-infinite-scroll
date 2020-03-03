# puppeter-infinite-scroll
Just a helper to scrape data in sites that use infinete scroll.
```
npm i puppeteer-infinite-scroll
```

# The problem
in most of solution that I found use a timing to scroll down the webpage and evaluate what you need, but if the request or network slow down and take more time than defined in the code and then the scraper just fail.

# See working
```
npm run test
```

# How use?
```javascript
const puppeteerInfiniteScroll = require('./src/puppeter-infinite-scroll')

;(async ()=>{
try {
  const browser = new puppeteerInfiniteScroll()
  await browser.start()
  await browser.open({
    url: 'https://medium.com/search?q=python',
    endpoint: 'https://medium.com/search/posts?q',
    loadImages: false,
    onResponse: (res)=>{
      //console.log(res)
    },
    onScroll: ()=>{
      console.log(`onScroll ${browser.scrollCount}`)

    }
  })
} catch (e) {
  console.error(e)
}

})()
```

# async browser.start() = puppeteer.lauch(opts)

```javascript
    //params(opts)
    //default: { headless: false, devtools: true }
    await browser.start()
```
# async browser.open()
this method create a new page.  setViewport({ width: 1280, height: 926 }), setRequestInterception(true)
```javascript
    //params(opts)
    //default: { url, onResponse, onScroll, loadImages = true, endpoint }
    //url = 'https://medium.com/search?q=python' - url of the page to be loaded
    //endpoint = 'https://medium.com/search?q=python' - endpoint wich load content to page
    //loadImages = true - if you need to prevent to load images set to false
    //onResponse = (response)=>{ } - if you need do something with request object
    //onScroll = ()=>{} - trigged after every scroll

    await browser.open({
    url: 'https://medium.com/search?q=python',
    endpoint: 'https://medium.com/search/posts?q',
    loadImages: false,
    onResponse: (res)=>{
      //console.log(res)
    },
    onScroll: ()=>{
      console.log(`onScroll ${browser.scrollCount}`)
    }
  })
```
