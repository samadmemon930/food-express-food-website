import React, { useState } from "react";
import BannerSection from "../Components/restaurant/BannerSection";
import SearchBar from "../Components/restaurant/SearchBar";
import MenuItems from "../Components/restaurant/MenuItems";

const Restaurant = () => {
  const [search, setSearch] = useState("");

  return (
    <>

      <BannerSection />
      <SearchBar search={search} setSearch={setSearch} />
      <MenuItems search={search} />
    </>
  );
};

export default Restaurant;