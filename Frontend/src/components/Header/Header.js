import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import CAT from "../../buttons/CAT";
import logo from "../../assets/logo.png";
import ham_menu from "../../assets/ham-menu.png";
import "./Header.css";

function Header({ onSearch }) {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const inputRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target) &&
        isSearchExpanded
      ) {
        setIsSearchExpanded(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSearchExpanded]);

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchInputChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  return (
    <nav id="header">
      <img
        src={ham_menu}
        alt="ham-menu"
        width={75}
        height={75}
        className="ms-5 menu-icon"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      />
      <div className="flex items-center">
        <Link to="/">
          <img className="ms-10 logo" src={logo} alt="royal tech" />
        </Link>

        {/*--------------------------mobile menu---------------------------------*/}
        <div class="mobile-menu">
          <ul className={`nav-links-mobile ${isMenuOpen ? "open" : ""}`}>
            <form id="search-form-mobile">
              <input
                type="text"
                placeholder="Search..."
                className="max-[426px]:me-2"
                value={searchQuery}
                onChange={handleSearchInputChange}
              />

              <button
                type="submit"
                id="search-icon"
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                <i
                  className="fa-solid fa-magnifying-glass pe-10 pt-2 "
                  style={{ color: "#151514" }}
                ></i>
              </button>
            </form>
            <Link to="/software">
              <li className=" ">
                Software
                <i
                  class="fa-solid fa-arrow-right pe-5"
                  style={{ color: "#080f1c" }}
                ></i>
              </li>
            </Link>
            <Link to="/hardware">
              <li className="">
                Hardware
                <i
                  class="fa-solid fa-arrow-right pe-5"
                  style={{ color: "#080f1c" }}
                ></i>
              </li>
            </Link>
            <Link to="/biotech">
              <li className=" ">
                BioTech
                <i
                  class="fa-solid fa-arrow-right pe-5"
                  style={{ color: "#080f1c" }}
                ></i>
              </li>
            </Link>
          </ul>
        </div>
        {/*-----------------------------------------------------------*/}
        <ul className=" nav-links">
          <Link to="/software">
            <li className="px-10 text-xl">Software</li>
          </Link>
          <Link to="/hardware">
            <li className="px-10 text-xl">Hardware</li>
          </Link>
          <Link to="/biotech">
            <li className="px-10 text-xl">BioTech</li>
          </Link>
        </ul>
      </div>
      <div className="search flex items-center justify-center pe-10 max-[426px]:pe-2">
        <form id="search-form">
          {isSearchExpanded && (
            <input
              ref={inputRef}
              type="text"
              id="search-input-expanded"
              placeholder="Search..."
              className="me-2"
              value={searchQuery}
              onChange={handleSearchInputChange}
            />
          )}
          <button
            type="submit"
            id="search-icon"
            onClick={(e) => {
              e.preventDefault();
              setIsSearchExpanded(!isSearchExpanded);
            }}
          >
            <i
              className="fa-solid fa-magnifying-glass pe-10 pt-2 fs-10"
              style={{ color: "#151514" }}
            ></i>
          </button>
        </form>
        <CAT />
      </div>
    </nav>
  );
}

export default Header;
