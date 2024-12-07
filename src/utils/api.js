import { Link } from "react-router-dom";

export function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
}

const baseUrl = process.env.NODE_ENV === "production" 
  ? "https://api.cigwtwr.strangled.net"
  : "http://localhost:3001";

export const getItems = () => {
  return fetch(`${baseUrl}/items`).then(checkResponse);
};

export const postItem = (name, link, weather) => {
  const token = localStorage.getItem("jwt");
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    body: JSON.stringify({
      name: name,
      weather: weather,
      imageUrl: link,
    }),
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
      authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
};

export const deleteItem = (id) => {
  const token = localStorage.getItem("jwt");
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
      authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
};

export const addCardLike = (id, token) => {
  return fetch(`${baseUrl}/items/${id}/likes`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then((res) => checkResponse(res));
}

export const removeCardLike = (id, token) => {
  return fetch(`${baseUrl}/items/${id}/likes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then((res) => checkResponse(res));
}
