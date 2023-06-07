export const fetchDrinks = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.drinks;
  } catch {
    return [];
  }
};

export const fetchMeals = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.meals;
  } catch {
    return [];
  }
};
