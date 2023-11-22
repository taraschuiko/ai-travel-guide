export const getThingsToDo = (place) => {
  return fetch(`${import.meta.env.VITE_API_URL}/${place}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());
};
