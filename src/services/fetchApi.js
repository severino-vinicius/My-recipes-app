export const fetchDrinks = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data.drinks;
};

export const fetchMeals = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data.meals;
};
