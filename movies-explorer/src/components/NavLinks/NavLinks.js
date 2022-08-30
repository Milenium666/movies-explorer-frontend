import React from 'react';
import { NavLink } from 'react-router-dom';

function NavLinks({ view, ...props }) {
  const handleCloseBurgerMenu = () => {
    props.isMobile && props.closeBurgerMenu();
  };
  const classes = view ? `navigation__page navigation__page_${view}` : 'navigation__page';
  return (
    <>
      <NavLink className={classes} to="/">Главная</NavLink>
      <NavLink className={classes} to="/movies" onClick={handleCloseBurgerMenu}>Фильмы</NavLink>
      <NavLink className={classes} to="/saved-movies" onClick={handleCloseBurgerMenu}>Сохранённые фильмы</NavLink>
    </>
  )
}
export default NavLinks;