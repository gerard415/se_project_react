import "./SideBar.css";
import avatar from "../../assets/avatar.svg";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function SideBar({ onSignOut, handleEditProfileClick }) {
  const currentUser = useContext(CurrentUserContext);
  return (
    <div className="sidebar">
      <img className="sidebar__avatar" src={!currentUser ? avatar : currentUser.avatar} alt="profile image" />
      <p className="sidebar__username">{!currentUser ? "" : currentUser.name}</p>
      <div className="sidebar__user">
        <button onClick={handleEditProfileClick} className="sidebar__info">
          Change Profile Data
        </button>
        <button onClick={onSignOut} className="sidebar__logout">
          Log Out
        </button>
      </div>
    </div>
  );
}
export default SideBar;
