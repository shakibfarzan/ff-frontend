import "react-hamburger-menus/dist/style.css";
import React, { useEffect, useState } from 'react';
import { ResponsiveNavbar } from "react-hamburger-menus";
import { Link } from "react-router-dom";
import { getCategories } from "../api/category";
import Category from "../types/Category";
import { useMediaQuery } from "react-responsive";
import { toast } from "react-toastify";

const Navbar = ({ name }: { name: string | undefined }): React.ReactElement => {

  const [categories, setCategories] = useState<Category[]>();
  const isDesktop = useMediaQuery({ query: '(min-width: 1000px)'});

  useEffect(() => {
    getCategories().then((res) => {
      setCategories(res);
    }).catch(() => {
      toast.error('Server error!');
    })
  }, []);

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
        navigation: {},
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
