import { useState } from "react";
import { getThingsToDo } from "./api";
import "./App.scss";

function App() {
  const [thingsTo, setThingsTo] = useState(null);
  const [place, setPlace] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = () => {
    setIsLoading(true);
    getThingsToDo(place).then((response) => {
      setThingsTo(response);
      setIsLoading(false);
    });
  };

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
              handleSearch();
            }
          }}
        />
      </div>
      {isLoading ? (
        <p>⌛️ Loading...</p>
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
