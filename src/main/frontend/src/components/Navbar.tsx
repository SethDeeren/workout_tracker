import React, { useState, useContext } from "react";
import { AuthContext } from "../store/auth-context";
import { NavLink } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import classes from "./styles/Navbar.module.css";

const Navbar = () => {
  const authCtx = useContext(AuthContext);

  const isLoggedIn = authCtx.isLoggedIn;

  const [linksVisible, setLinksVisible] = useState(false);

  const showNavbar = () => {
    setLinksVisible((prevLinkVisible) => !prevLinkVisible);
  };

  const logout = () => {
    showNavbar();
    authCtx.logout();
  };

  return (
    <header>
      <h3>MyProFitClub</h3>
      <nav className={`${linksVisible && classes["responsive_nav"]}`}>
        {/* <NavLink className={(navData) => navData.isActive ? classes.active : ''} to="/"  onClick={showNavbar}>
          Home
        </NavLink> */}
        {/* <NavLink className={(navData) => navData.isActive ? classes.active : ''} to="/fit-challenge" onClick={showNavbar}>
          Fit Challenge
        </NavLink> */}
        {isLoggedIn && (
          <NavLink
            className={(navData) => (navData.isActive ? classes.active : "")}
            to="/my-workouts"
            onClick={showNavbar}
          >
            My Workouts
          </NavLink>
        )}
        {!isLoggedIn && (
          <NavLink
            className={(navData) => (navData.isActive ? classes.active : "")}
            to="/login"
            onClick={showNavbar}
          >
            Login
          </NavLink>
        )}
        {isLoggedIn && (
          <NavLink
            className={(navData) => (navData.isActive ? classes.active : "")}
            to="/user-profile"
            onClick={showNavbar}
          >
            My Profile
          </NavLink>
        )}
        {isLoggedIn && (
          <NavLink
            className={(navData) => (navData.isActive ? classes.active : "")}
            to="/create-workout"
            onClick={showNavbar}
          >
            Create Workout
          </NavLink>
        )}
        <NavLink
          className={(navData) => (navData.isActive ? classes.active : "")}
          to="/workouts"
          onClick={showNavbar}
        >
          Find Workouts
        </NavLink>
        {isLoggedIn && (
          <NavLink
            className={(navData) => (navData.isActive ? classes.active : "")}
            to="/login"
            onClick={logout}
          >
            Logout
          </NavLink>
        )}
        <button
          className={`${classes["nav-btn"]} ${classes["nav-close-btn"]}`}
          onClick={showNavbar}
        >
          <FaTimes />
        </button>
      </nav>
      <button className={`${classes["nav-btn"]}`} onClick={showNavbar}>
        <FaBars />
      </button>
    </header>
  );
};

export default Navbar;
