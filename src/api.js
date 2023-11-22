import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

const categories = [
  "see",
  "do",
  "eat",
  "drink",
  "buy",
  "know",
  "avoid",
  "bring",
  "wear",
];

export const getThingsToDo = (place) => {
  const capitalizedPlace = place.charAt(0).toUpperCase() + place.slice(1);
  const categoriesListString = categories.join(", ");

  return openai.chat.completions
    .create({
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant designed to output JSON.",
        },
        {
          role: "user",
          content: `What are things to ${categoriesListString} in ${capitalizedPlace}.
            Return a JSON object with keys: ${categoriesListString} and values as lists of strings with minimum 5 items.
            Try to make the number of characters in each list as similar as possible.
            Add a corresponding emoji at the beginning of each list item and add space after the emoji.`,
        },
      ],
      model: "gpt-3.5-turbo-1106",
      response_format: { type: "json_object" },
    })
    .then((response) => {
      console.log(response);
      return JSON.parse(response.choices[0].message.content);
    });
};

export default getThingsToDo;
