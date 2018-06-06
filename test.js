const puppeteerInfiniteScroll = require('./src/puppeter-infinite-scroll')

;(async ()=>{
try {
  const browser = new puppeteerInfiniteScroll()
  await browser.start()
  await browser.open({
    url: 'https://medium.com/search?q=python',
    loadImages: false,
    endpoint: 'https://medium.com/search/posts?q',
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
