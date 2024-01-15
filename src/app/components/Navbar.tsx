"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Navbar: React.FC = () => {
  const [currentPage, setCurrentPage] = useState("");

  useEffect(() => {
    setCurrentPage("home");
  }, []);

  const handleLinkClick = (page: string) => {
    setCurrentPage(page);
  };

  return (
    <>
      <nav className="navbar">
        <div
          style={{
            alignItems: "left",
            display: "flex",
            marginLeft: "20px",
          }}
        >
          <div>
            <img
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "100px",
                background: `url('greenguardLogo.png'), lightgray -14.286px -7.143px / 171.429% 171.429% no-repeat`,
              }}
            />
          </div>
          <div>
            <p>
              GREENGUARD
              <br />
              SYSTEMS
            </p>
          </div>
        </div>
        <Link href="/">
          <p
            className={`nav-link ${currentPage === "home" ? "text" : ""}`}
            onClick={() => handleLinkClick("home")}
          >
            Search
          </p>
        </Link>

        <Link href="/create">
          <p
            className={`nav-link ${currentPage === "create" ? "text" : ""}`}
            onClick={() => handleLinkClick("create")}
          >
            Add Disaster
          </p>
        </Link>

        <style jsx>{`
          .text {
            color: #22c55e;
          }
        `}</style>
      </nav>
    </>
  );
};

export default Navbar;
