const puppeteer = require('puppeteer')

class puppeteerInfiniteScroll {

  constructor(props) {
    this.browser = null
    this.page = null
    this.canScroll = true
    this.scrollCount = 0

  }

  async start(opts) {
    const lauchOpts = (opts)? opts : { headless: false, devtools: true }
    this.browser = await puppeteer.launch(lauchOpts)
  }

  async scrollDown(){
    if (this.canScroll) {
      try {
        await this.page.waitFor(500)
        await this.page.evaluate(
          'window.scrollTo(0, document.body.scrollHeight)'
        )
        this.scrollCount++
      } catch (e) {
        console.log(e)
      }
    }
  }

  scrollFreeze(){
    this.canScroll = false
  }

  scrollRestart(){
    this.canScroll = true
  }

  async open({ url, onResponse, onScroll, loadImages = true, endpoint }) {

    const self = this

    try {
      this.page = await this.browser.newPage()
      this.page.setViewport({ width: 1280, height: 926 })

      this.page.setRequestInterception(true)
      this.page.on(
        'request',
        request => {
          request.resourceType() === 'image' && !loadImages
            ? request.abort()
            : request.continue()
        }
      )

      this.page.on('response', async res =>{
        const resUrl = res.url()
        if (resUrl.indexOf(endpoint) !== -1) {
          await self.scrollDown()
          if (onScroll) {
            onScroll()
          }
        }
        if (onResponse) {
          onResponse(res)
        }
      })

      await this.goTo({ url })
      await this.scrollDown()


    } catch (e) {
      console.error(e)
    }
  }

  async goTo({ url, opts }) {
    try {
      const pageOpts = (opts)? opts : { waitLoad: true, waitNetworkIdle: true }
      await this.page.goto(url,pageOpts)
      await this.page.waitFor(100)
    } catch (e) {
      console.error(e)
    }
  }

  async stract(a) {
    try {
      return await this.page.evaluate(a)
    } catch (e) {
      console.error(e)
    }
  }

  close() {
    this.browser.close()
  }
}

module.exports = puppeteerInfiniteScroll
