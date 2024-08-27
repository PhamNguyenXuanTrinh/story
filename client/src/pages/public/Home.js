import React from "react";
import CategoryHot from "../../components/CategoryHot";
import LatestUpdates from "../../components/LatestUpdate";

const Home = () => {
  return (
    <div className="border w-main h-[auto] ">
      <CategoryHot />
      <LatestUpdates/>
    </div>
  );
};

export default Home;
 