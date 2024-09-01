import React from "react";
import {CategoryHot, CategoryComplete, LatestUpdate,} from "../../components";


const Home = () => {
  return (
    <div className="border w-main h-[auto] ">
      <CategoryHot />
      <LatestUpdate/>
      <CategoryComplete/>
    </div>
  );
};

export default Home;
 