import React from "react";

import Home from "./Pages/Home";
import Software from "./Pages/Software";
import Hardware from "./Pages/Hardware";
import BioTech from "./Pages/BioTech";
import Login from "./Pages/Admin/Login";
import Blogs from "./Pages/Admin/Blogs";
import AddEditBlog from "./Pages/Admin/AddEditBlog";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BlogTemplate from "./components/BlogTemplate/BlogTemplate";
import SearchResults from "./components/SearchResults/SearchResults";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/search/:query?" element={<SearchResults />} />
        <Route exact path="/blogs/:title" element={<BlogTemplate />} />
        <Route
          exact
          path="/search-results/:title"
          element={<SearchResults />}
        />
        <Route exact path="/software" element={<Software />} />
        <Route exact path="/hardware" element={<Hardware />} />
        <Route exact path="/biotech" element={<BioTech />} />
        <Route exact path="/admin" element={<Login />} />
        <Route exact path="/admin/blogs" element={<Blogs />} />
        <Route
          exact
          path="/admin/blogs/Addblog"
          element={<AddEditBlog action="Add" />}
        />
        <Route
          exact
          path="/admin/blogs/Editblog/:id"
          element={<AddEditBlog action="Edit" />}
        />
      </Routes>
    </Router>
  );
}
export default App;
