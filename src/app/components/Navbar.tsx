"use client"
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const Navbar: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('')

  useEffect(() => {
    setCurrentPage('home')
  }, [])

  const handleLinkClick = (page: string) => {
    setCurrentPage(page)
  }

  return (
    <nav className="navbar">
      <Link href="/">
        <p className={`nav-link ${currentPage === 'home' ? 'text' : ''}`} onClick={() => handleLinkClick('home')}>
          Search
        </p>
      </Link>

      <Link href="/create">
        <p className={`nav-link ${currentPage === 'create' ? 'text' : ''}`} onClick={() => handleLinkClick('create')}>
          Add Disaster
        </p>
      </Link>

      <style jsx>{`
        .text {
          color: #22C55E;
        }
      `}</style>
    </nav>
  )
}

export default Navbar
