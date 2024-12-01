import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";
import Footer from "../Footer/Footer";
import "./Profile.css";

function Profile({ 
  onCardClick, 
  clothingItems, 
  handleAddClick, 
  onSignOut,
  handleEditProfileClick,
  isLiked,
  onToggleLike,
  isLoggedIn, }) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar 
          onSignOut={onSignOut}
          onEditProfileData={handleEditProfileClick}
          handleEditProfileClick={handleEditProfileClick}
        />
      </section>
      <section className="profile__clothes-section">
        <ClothesSection
          onCardClick={onCardClick}
          clothingItems={clothingItems}
          handleAddClick={handleAddClick}
          isLiked={isLiked}
          onToggleLike={onToggleLike}
          isLoggedIn={isLoggedIn}
        />
      </section>
    </div>
  );
}
export default Profile;
