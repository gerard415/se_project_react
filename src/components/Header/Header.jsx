import './Header.css'
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.svg";

function Header() {
    return (
      <header className="header ">
        <img className="header__logo" src={logo} alt="App logo" />
        <p className="header__date-and-location">
          June 15, New York
        </p>
      <div
        className='header__menu'
      >
        <button
          type="button"
          className="header__add-clothes-button"
        >
          + Add clothes
        </button>
        <div className="header__user-container">
          <p className="header__username">Terrence Tegegne</p>
          <img src={avatar} alt="User avatar" className="header__avatar" />
        </div>
      </div>
    </header>
  )
}

export default Header
