export const addToLocalStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const getFromLocalStorage = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

export const removeFromLocalStorage = (key) => {
  localStorage.removeItem(key);
};
