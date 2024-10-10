import './Header.css'
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.svg";

function Header({addButtonClick, weatherData}) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header ">
      <img className="header__logo" src={logo} alt="App logo" />
      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </p>
      <div
        className='header__menu'
      >
        <button
          onClick={addButtonClick}
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
