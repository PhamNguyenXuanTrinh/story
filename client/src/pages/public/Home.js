import React from "react";
import { CategoryHot, CategoryComplete, LatestUpdate } from "../../components";

const Home = () => {
  return (
    <div className="border w-full max-w-screen-lg lg:max-w-[1250px] mx-auto p-4 sm:p-6 md:p-8">
      <CategoryHot />
      <LatestUpdate />
      <CategoryComplete />
    </div>
  );
};

export default Home;
