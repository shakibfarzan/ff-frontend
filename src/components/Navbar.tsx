import "react-hamburger-menus/dist/style.css";
import React, { useEffect, useState } from 'react';
import { ResponsiveNavbar } from "react-hamburger-menus";
import { Link } from "react-router-dom";
import { getCategories } from "../api/category";
import { useMediaQuery } from "react-responsive";
import { toast } from "react-toastify";
import { Category } from "../types";

const Navbar = ({ name, categories }: { name: string | undefined; categories: Category[] | undefined }): React.ReactElement => {
  const isDesktop = useMediaQuery({ query: '(min-width: 1000px)'});

  const handleClickReload = () => {
    if (!isDesktop) {
      setTimeout(() => {
        window.location.reload();
      }, 100);
    }
  }

  return (
    <ResponsiveNavbar
      // eslint-disable-next-line jsx-a11y/anchor-is-valid
      logo={<Link to={'/home'} onClick={handleClickReload} className="text-light text-lg cursor-pointer">{name?.toUpperCase()}</Link>}
      styles={{
        navigation: {
          zIndex: 40,
        },
        navigationBarSmall: {
          backgroundColor: "rgb(0 15 45)",
        },
        navigationCardSmall: {
          backgroundColor: "rgb(0 15 45)"
        },
        navigationBarLarge: {
          backgroundColor: "rgb(0 15 45)",
          maxHeight: isDesktop ? "5rem" : "",
        },
      }}
  >
    <ul className="mr-2">
      {categories?.map((category) => 
      <li key={category.id} className="text-light hover:text-primary active:text-primary">
        <Link 
          className={!isDesktop ? 'text-2xl' : 'font-medium'}
          onClick={handleClickReload} 
          to={`/gallery/${category.slug}`}>
            {category.name}
        </Link>
      </li>)}
    </ul>
  </ResponsiveNavbar>
  )
}

export default Navbar;
