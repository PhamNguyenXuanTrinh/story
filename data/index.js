const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

const baseUrl = 'https://truyencv.vn/thien-uyen/chuong-';
const totalPages = 50; // Thay đổi theo số lượng trang chương thực tế

const storyId = '66daea33f13ba977224a2a18'; // ID truyện
const chapters = [];

// Hàm để cào dữ liệu tất cả các chương từ nhiều trang
const scrapeAllChapters = async () => {
  try {
    for (let page = 1; page <= totalPages; page++) {
      const { data } = await axios.get(baseUrl + page);
      const $ = cheerio.load(data);

      // Lấy các liên kết đến các chương trên trang hiện tại
      const chapterLinks = [];
      $('a[href^="/thien-uyen/chuong-"]').each((index, element) => {
        const href = $(element).attr('href');
        chapterLinks.push(new URL(href, baseUrl).href);
      });

      // Cào nội dung của từng chương
      for (const link of chapterLinks) {
        await scrapeChapter(link);
      }
    }

    // Lưu dữ liệu vào file JSON sau khi đã lấy xong tất cả các chương
    fs.writeFileSync('data.json', JSON.stringify(chapters, null, 2), 'utf8');
    console.log('Dữ liệu đã được lưu vào data.json');
  } catch (error) {
    console.error('Có lỗi xảy ra khi cào dữ liệu các chương:', error);
  }
};

// Hàm để cào nội dung của một chương
const scrapeChapter = async (url) => {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    // Ví dụ: Lấy tiêu đề và nội dung của chương
    const title = $('h2>a').text().trim(); // Thay đổi theo cấu trúc HTML của trang
    const content = $('#content-chapter>p').text().trim(); // Thay đổi theo cấu trúc HTML của trang

    // Tìm số chương từ URL hoặc từ tiêu đề
    const chapterNumber = parseInt(url.match(/chuong-(\d+)/)[1], 10);

    // Thêm dữ liệu chương vào mảng chapters với cùng một storyId
    chapters.push({
      story: { "$oid": storyId },
      slug: `chuong-${chapterNumber}`,
      title,
      content,
      chapterNumber,
      created_at: { "$date": new Date().toISOString() }
    });
  } catch (error) {
    console.error(`Có lỗi xảy ra khi cào chương ${url}:`, error);
  }
};

// Gọi hàm để bắt đầu cào dữ liệu
scrapeAllChapters();
