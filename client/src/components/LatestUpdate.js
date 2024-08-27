import React from "react";

const StoryTable = () => {
  // Sample data to be replaced with actual data from your API
  const stories = [
    {
      genre: "Huyền Huyễn",
      title: "Ngự Thú: Bắt Đầu Bị Trọng Sinh Nữ Đế Khế Ước",
      latestChapter: "Chương 878: Thần Linh trong truyền thuyết",
    },
    {
      genre: "Dã Sử",
      title: "Hắn Một Quyền Có Thể Đánh Chết Lữ Bố",
      latestChapter: "Chương 1063: Tôn Corgi",
    },
    // Add more stories here
  ];

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">TRUYỆN MỚI CẬP NHẬT</h2>
      <table className="min-w-full border-collapse">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2 text-left">Thể Loại</th>
            <th className="border border-gray-300 p-2 text-left">Tên Truyện</th>
            <th className="border border-gray-300 p-2 text-left">Chương Cuối</th>
          </tr>
        </thead>
        <tbody>
          {stories.map((story, index) => (
            <tr key={index}>
              <td className="border border-gray-300 p-2">{story.genre}</td>
              <td className="border border-gray-300 p-2">{story.title}</td>
              <td className="border border-gray-300 p-2">{story.latestChapter}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StoryTable;
