import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Header({ handleAddClick, weatherData, handleSignUpClick, handleLoginClick, isLoggedIn }) {
  const currentUser = useContext(CurrentUserContext);
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  if (isLoggedIn === true) {
  return (
    <header className="header">
      <Link to="/">
        <img className="header__logo" src={logo} alt="Logo" />
      </Link>

      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </p>
      <ToggleSwitch />
      <button
        onClick={handleAddClick}
        type="button"
        className="header__add-clothes-btn"
      >
        + Add Clothes
      </button>
      <Link to="/profile" className="header__link">
        <div className="header__user">
          <p className="header__username">{currentUser.name}</p>
          <img src={currentUser.avatar} alt="Terrence Tegegne" className="header__avatar" />
        </div>
      </Link>
    </header>
  )}else {
    return (
      <header className="header">
        <Link to="/">
          <img className="header__logo" src={logo} alt="logo" />
        </Link>

        <p className="header__date-and-location">
          {currentDate}, {weatherData.city}
        </p>
        <ToggleSwitch />
        <button onClick={handleSignUpClick} className="header__signup">
          Sign Up
        </button>
        <button onClick={handleLoginClick} className="header__login">
          Log In
        </button>
      </header>
    );
  }
}

export default Header;
