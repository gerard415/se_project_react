import "./ClothesSection.css";
import React, { useContext } from "react";
import { defaultClothingItems } from "../../utils/constants.js";
import ItemCard from "../ItemCard/ItemCard.jsx";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";

function ClothesSection({
  onCardClick,
  clothingItems,
  handleAddClick,
  isLiked,
  onToggleLike,
  isLoggedIn,
}) {
  const currentUser = useContext(CurrentUserContext);
  return (
    <div className="clothes__section">
      <div className="clothes__header">
        <p className="clothes__title">Your Items</p>
        <button onClick={handleAddClick} className="clothes__add-btn">
          {" "}
          + Add item{" "}
        </button>
      </div>
      <div>
        <ul className="clothes__section-items">
          {clothingItems &&
            clothingItems
              .filter((item) => item.owner === currentUser._id)
              .map((item) => {
                return (
                  <ItemCard
                    key={item._id}
                    item={item}
                    onCardClick={onCardClick}
                    isLiked={isLiked}
                    onToggleLike={onToggleLike}
                    isLoggedIn={isLoggedIn}
                  />
                );
          })}
        </ul>
      </div>
      
    </div>
  );
}
export default ClothesSection;
