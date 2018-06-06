const puppeteerInfiniteScroll = require('./src/scraper')

;(async ()=>{
try {
  const nav = new puppeteerInfiniteScroll()
  await nav.start()
  await nav.open({
    url: 'https://medium.com/search?q=python',
    loadImages: false,
    endpoint: 'https://medium.com/search/posts?q',
    onResponse: (res)=>{
      //console.log(res)
    },
    onScroll: ()=>{
      console.log(`onScroll ${sc.scrollCount}`)

    }
  })
} catch (e) {
  console.error(e)
}

})()
