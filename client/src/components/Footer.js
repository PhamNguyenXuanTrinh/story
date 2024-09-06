import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 border-t p-4 flex flex-col items-center md:items-start md:flex-row md:justify-between w-full mt-6">
      {/* Footer Left Section - Description */}
      <div className="flex flex-col text-center md:text-left">
        <p className="text-sm text-gray-700 max-w-md">
          <strong>Truyện CV</strong> - Đọc truyện online, đọc truyện chữ, truyện
          hay. Website luôn cập nhật những bộ truyện mới thuộc các thể loại đặc
          sắc như truyện tiên hiệp, truyện kiếm hiệp, hay truyện đô thị một cách
          nhanh nhất. Hỗ trợ mọi thiết bị như di động và máy tính bảng.
        </p>
        <div className="flex flex-wrap mt-2 space-x-2">
          <p href="#" className="text-xs text-gray-600 hover:text-blue-500">
            Truyện Huyền Huyễn
          </p>
          <p href="#" className="text-xs text-gray-600 hover:text-blue-500">
            Truyện Võng Du
          </p>
          <p href="#" className="text-xs text-gray-600 hover:text-blue-500">
            Truyện Khoa Huyễn
          </p>
          <p href="#" className="text-xs text-gray-600 hover:text-blue-500">
            Truyện Mạt Thế
          </p>
          <p href="#" className="text-xs text-gray-600 hover:text-blue-500">
            Truyện Trọng Sinh
          </p>
          <p href="#" className="text-xs text-gray-600 hover:text-blue-500">
            Truyện Xuyên Không
          </p>
          <p href="#" className="text-xs text-gray-600 hover:text-blue-500">
            Truyện Hệ Thống
          </p>
          <p href="#" className="text-xs text-gray-600 hover:text-blue-500">
            Truyện Full
          </p>
        </div>
      </div>

      {/* Footer Right Section - Links */}
      <div className="mt-4 md:mt-0 flex items-center space-x-4">
        <p href="#" className="text-xs text-gray-600 hover:text-blue-500">
          Contact
        </p>
        <p href="#" className="text-xs text-gray-600 hover:text-blue-500">
          Privacy Policy
        </p>
        <button className="text-gray-600 hover:text-blue-500">
          <span className="material-icons">arrow_upward</span>
        </button>
      </div>
    </footer>
  );
};

export default Footer;
