// EDIT THIS FILE TO COMPLETE ASSIGNMENT QUESTION 1
const { chromium } = require("playwright")
const { writeToPath } = require("fast-csv")

async function saveHackerNewsArticles() {
  // launch browser
  const browser = await chromium.launch({ headless: true })
  const context = await browser.newContext()
  const page = await context.newPage()

  try {
    // go to Hacker News
    await page.goto("https://news.ycombinator.com", { timeout: 2 * 60 * 1000 })
    console.log("Scraping...")
    await page.screenshot({ path: "page.png", fullPage: true })

    const dataSet = await page.evaluate(() => {
      const elements = document.querySelectorAll(".titleline > a")
      return Array.from(elements)
        .slice(0, 10)
        .map((element) => ({ title: element.textContent, url: element.href }))
    })
    console.log("dataSet", dataSet)
    writeToPath("dataset.csv", dataSet)
  } catch (err) {
    throw err
  } finally {
    await browser.close()
  }
}

;(async () => {
  await saveHackerNewsArticles()
})()
