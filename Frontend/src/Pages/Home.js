import React, { useState } from "react";
import { Helmet } from "react-helmet";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Hero from "../components/Hero/Hero";
import Latest from "../components/Latest/Latest";
import Top from "../components/Top/Top";
import CallToAction from "../components/CallToAction/CallToAction";
import Trending from "../components/Trending/Trending";
import MoreBlogs from "../components/MoreBlogs/MoreBlogs";
import "../App.css";
import SearchResults from "../components/SearchResults/SearchResults";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query) => {
    setSearchQuery(query);
  };
  return (
    <>
      <Helmet>
        <title>Royal Tech</title>
        <meta name="description" content="your favourite tech news platform" />
      </Helmet>
      <Header onSearch={handleSearch} />
      <div className="App">
        {searchQuery && <SearchResults searchQuery={searchQuery} />}
        {!searchQuery && (
          <>
            <Hero />
            <Latest />
            <Top />
            <CallToAction />
            <Trending />
            <MoreBlogs />
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Home;
