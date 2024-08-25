import React from 'react';

const items = [
  { title: 'Thiên Uyên', image: 'path-to-image-1.png' },
  { title: 'Chân Thực Mount And Blade Trò Chơi', image: 'path-to-image-2.png' },
  { title: 'Mạo Hiểm Chuyện', image: 'path-to-image-3.png' },
  { title: 'Vạn Giới Mạnh Nhất Hệ Thống Chi Triệu Hoán Quần Hùng', image: 'path-to-image-4.png' },
  { title: 'Nhà Ta Đại Sư Huynh Thật Sự Là Quá Không Đứng Đắn', image: 'path-to-image-5.png' },
  { title: 'Bọn Chuột Nhất Định Âm Hại Ta!', image: 'path-to-image-6.png' },
  // Add more items here
];

export const ListItems = () => {
  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      {items.map((item, index) => (
        <div key={index} className="flex flex-col items-center">
          <img src={item.image} alt={item.title} className="w-48 h-64 object-cover" />
          <p className="text-center text-white mt-2">{item.title}</p>
        </div>
      ))}
    </div>
  );
};

export default ListItems;
