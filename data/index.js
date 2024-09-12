const puppeteer = require("puppeteer");
const connectDb = require("../server/configs/connectDb");
const Chapter = require("../server/models/chapter"); // Import your Mongoose model
const Story = require("../server/models/story"); // Import your Mongoose model for stories
require("dotenv").config();

const baseUrl = "https://metruyencv.com/truyen/";
const totalPages = 30; // Number of chapters you want to scrape

// Array of story names to scrape
const storyNames = [
  "xich-tam-tuan-thien",
  "tu-hai-nhi-bat-dau-nhap-dao",
  "bat-dau-nu-ma-dau-phu-ta",
  "cau-tha-thanh-thanh-nhan-tien-quan-trieu-ta-cham-ngua",

  // Add more story names as needed
];

const scrapeAllChapters = async () => {
  try {
    // Connect to MongoDB
    await connectDb();
    console.log("Connected to MongoDB successfully.");

    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    for (const storyName of storyNames) {
      // Find the story by name and get its ID
      const story = await Story.findOne({ slug: storyName }).exec();

      if (!story) {
        console.error(
          `Story with name "${storyName}" not found in the database.`
        );
        continue; // Skip this story if it is not found
      }

      const storyId = story._id.toString(); // Use the story ID
      const storyBaseUrl = `${baseUrl}${storyName}/chuong-`;

      // Array to hold chapter IDs
      const chapterIds = [];

      for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
        const chapterUrl = `${storyBaseUrl}${pageNum}`;
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
        console.log(
          `Chapter ${chapterNumber} of story "${storyName}" saved to the database.`
        );

        // Add the chapter ID to the list
        chapterIds.push(chapter._id); // Store chapter ID
      }

      // Update the story with the list of chapter IDs
      await Story.updateOne(
        { _id: storyId },
        { $set: { chapter: chapterIds } } // Update with the list of chapter IDs
      );
      console.log(`Story "${storyName}" updated with chapter IDs.`);
    }

    await browser.close();
    console.log("Scraping completed and all chapters saved to the database.");
  } catch (error) {
    console.error("Error occurred while scraping:", error);
  }
};

// Start the scraping process
scrapeAllChapters();
