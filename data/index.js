const puppeteer = require("puppeteer");
const connectDb = require('../server/configs/connectDb');
const Chapter = require("../server/models/chapter"); // Import your Mongoose model
require("dotenv").config();
const baseUrl = "https://metruyencv.com/truyen/truong-sinh-chi-di-bat-dau-thai-thi-khau-bi-tram-thu/chuong-";
const totalPages = 30; // Number of chapters you want to scrape
const storyId = "66daedfba6d1a2c3a237559f"; // Story ID

// Main function to scrape chapters
const scrapeAllChapters = async () => {
  try {
    // Connect to MongoDB
    await connectDb();
    console.log("Connected to MongoDB successfully.");

    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
      const chapterUrl = `${baseUrl}${pageNum}`;
      console.log(`Scraping: ${chapterUrl}`);

      await page.goto(chapterUrl, { waitUntil: "networkidle2" });

      // Wait for the div with class "break-words" to be rendered
      await page.waitForSelector("div.break-words");

      // Extract chapter title and content from the "break-words" div
      const chapterData = await page.evaluate(() => {
        const title = document.querySelector("h2")?.innerText.trim(); // Handle case where title is missing
        const contentElements = document.querySelectorAll("div.break-words");
        const content = Array.from(contentElements)
          .map((el) => el.innerText.trim())
          .join("\n\n");

        return { title, content };
      });

      // Check if the content was extracted properly
      if (!chapterData.content) {
        console.error(`Failed to extract content from chapter ${pageNum}.`);
        continue; // Skip this chapter if content is missing
      }

      const chapterNumber = pageNum; // Assuming chapter number is the page number

      // Create a new Chapter instance and save it to the database
      const chapter = new Chapter({
        story: storyId, // Use the story ID
        slug: `chuong-${chapterNumber}`,
        title: chapterData.title || `Chapter ${chapterNumber}`, // Default to Chapter X if no title is found
        content: chapterData.content,
        chapterNumber,
        created_at: new Date(),
      });

      // Save to MongoDB
      await chapter.save();
      console.log(`Chapter ${chapterNumber} saved to the database.`);
    }

    await browser.close();
    console.log("Scraping completed and all chapters saved to the database.");
  } catch (error) {
    console.error("Error occurred while scraping:", error);
  }
};

// Start the scraping process
scrapeAllChapters();
