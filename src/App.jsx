import { useState } from "react";
import OpenAI from "openai";
import "./App.scss";

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

function App() {
  const [thingsTo, setThingsTo] = useState(null);
  const [place, setPlace] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const getThingsToDo = () => {
    const capitalizedPlace = place.charAt(0).toUpperCase() + place.slice(1);
    const categoriesListString = categories.join(", ");

    setIsLoading(true);

    openai.chat.completions
      .create({
        messages: [
          {
            role: "system",
            content: "You are a helpful assistant designed to output JSON.",
          },
          {
            role: "user",
            content: `What are things to ${categoriesListString} in ${capitalizedPlace}.
              Return a JSON object with keys: ${categoriesListString} and values as lists of strings.
              Add a corresponding emoji at the beginning of each list item.`,
          },
        ],
        model: "gpt-3.5-turbo-1106",
        response_format: { type: "json_object" },
      })
      .then((response) => {
        setThingsTo(JSON.parse(response.choices[0].message.content));
        setIsLoading(false);
      });
  };

  console.log(thingsTo);

  return (
    <>
      <div className="search-bar">
        <h1>&quot;Things to&quot; in </h1>
        <input
          type="text"
          value={place}
          onChange={(e) => setPlace(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              getThingsToDo();
            }
          }}
        />
      </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="things-to">
          {thingsTo &&
            Object.entries(thingsTo).map(([title, list]) => (
              <div key={title}>
                <h2>{title}</h2>
                <ul>
                  {list.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
        </div>
      )}
    </>
  );
}

export default App;
