import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import { coordinates, APIkey } from "../../utils/constants";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import ItemModal from "../ItemModal/ItemModal";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import AddItemModal from "../AddItemModal/AddItemModal";
import {
  getItems,
  postItem,
  deleteItem,
  addCardLike,
  removeCardLike,
} from "../../utils/api";
import ConfirmDeleteModal from "../ConfirmDeleteModal/ConfirmDeleteModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { signUp, signIn, getUserProfile, editProfile } from "../../utils/auth";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999 },
    city: "",
  });
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTempUnit, setCurrentTempUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleSignUpClick = () => {
    setActiveModal("signup");
  };

  const handleLoginClick = () => {
    setActiveModal("login");
  };

  const handleEditProfileClick = () => {
    setActiveModal("edit");
  };

  const openDeleteModal = () => {
    setActiveModal("delete");
  };

  const handleCardLike = (_id, isLiked) => {
    const token = localStorage.getItem("jwt");
    return !isLiked
      ? addCardLike(_id, token).then((updatedCard) => {
          setClothingItems((cards) =>
            cards.map((item) => (item._id === _id ? updatedCard : item))
          );
        }).catch(console.error)
      : removeCardLike(_id, token).then((updatedCard) => {
          setClothingItems((cards) =>
            cards.map((item) => (item._id === _id ? updatedCard : item))
          );
        }).catch(console.error)
  };
  const handleCardDelete = () => {
    deleteItem(selectedCard._id)
      .then(() => {
        setClothingItems((prev) =>
          prev.filter((item) => item._id !== selectedCard._id)
        );
        closeActiveModal();
      })
      .catch(console.error);
  };

  const onAddItem = ({ name, weather, link }) => {
    setIsLoading(true);
    postItem(name, link, weather)
      .then((data) => {
        setClothingItems((prev) => [data, ...prev]);
        closeActiveModal();
      })
      .catch(console.error)
      .finally(() => setIsLoading(false))
  };

  const onRegister = ({ name, email, password, avatar }) => {
    setIsLoading(true);
    const userProfile = { name, email, password, avatar };
    signUp(userProfile)
      .then(() => {
        setCurrentUser(userProfile);
        signIn({ email, password });
        setIsLoggedIn(true);
        closeActiveModal();
        navigate("/profile");
      })
      .catch((error) => console.error(error))
      .finally(() => setIsLoading(false))
  };

  const onLogin = ({ email, password }) => {
    setIsLoading(true);
    if (!{ email, password }) {
      return;
    }
    return signIn({ email, password })
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setIsLoggedIn(true);
        setCurrentUser(res.user);
        closeActiveModal();
        navigate("/profile");
      })
      .catch((error) => console.error(error))
      .finally(() => setIsLoading(false))
  };

  const onSignOut = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    closeActiveModal();
    navigate("/");
  };

  const onProfileSubmit = ({ name, avatar }) => {
    setIsLoading(true);
    editProfile({ name, avatar })
      .then((res) => {
        setCurrentUser(res);
        closeActiveModal();
      })
      .catch((error) => console.error(error))
      .finally(() => setIsLoading(false))
  };

  const handleToggleSwitchChange = () => {
    if (currentTempUnit === "C") setCurrentTempUnit("F");
    if (currentTempUnit === "F") setCurrentTempUnit("C");
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    getItems()
      .then((data) => {
        setClothingItems(data.reverse());
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      getUserProfile()
        .then((res) => {
          setCurrentUser(res.data);
          setIsLoggedIn(true);
        })
        .catch(console.error);
    }
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTempUnit, handleToggleSwitchChange }}
        >
          <div className="page__content">
            <Header
              handleAddClick={handleAddClick}
              weatherData={weatherData}
              isLoggedIn={isLoggedIn}
              handleSignUpClick={handleSignUpClick}
              handleLoginClick={handleLoginClick}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    clothingItems={clothingItems}
                    weatherData={weatherData}
                    handleCardClick={handleCardClick}
                    onToggleLike={handleCardLike}
                    isLoggedIn={isLoggedIn}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      clothingItems={clothingItems}
                      weatherData={weatherData}
                      onCardClick={handleCardClick}
                      handleAddClick={handleAddClick}
                      onSignOut={onSignOut}
                      handleEditProfileClick={handleEditProfileClick}
                      onToggleLike={handleCardLike}
                      isLoggedIn={isLoggedIn}
                    />
                  </ProtectedRoute>
                }
              />
            </Routes>

            <Footer />
          </div>

          <AddItemModal
            isOpen={activeModal === "add-garment"}
            onAddItem={onAddItem}
            onClose={closeActiveModal}
            isLoading={isLoading}
          ></AddItemModal>
          <ItemModal
            activeModal={activeModal}
            card={selectedCard}
            openDeleteModal={openDeleteModal}
            handleCloseClick={closeActiveModal}
          />
          <ConfirmDeleteModal
            activeModal={activeModal === "delete"}
            handleCardDelete={handleCardDelete}
            closeActiveModal={closeActiveModal}
          />
        </CurrentTemperatureUnitContext.Provider>
        <RegisterModal
          isOpen={activeModal === "signup"}
          onClose={closeActiveModal}
          onRegister={onRegister}
          handleLoginClick={handleLoginClick}
          isLoading={isLoading}
        />
        <LoginModal
          isOpen={activeModal === "login"}
          onClose={closeActiveModal}
          onLogin={onLogin}
          handleSignUpClick={handleSignUpClick}
          isLoading={isLoading}
        />
        <EditProfileModal
          isOpen={activeModal === "edit"}
          onClose={closeActiveModal}
          onProfileSubmit={onProfileSubmit}
          isLoading={isLoading}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
