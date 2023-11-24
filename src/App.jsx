import { useState } from "react";
import { getThingsToDo } from "./api";
import Header from "./components/Header";
import Recommendations from "./components/Recommendations";
import About from "./components/About";

function App() {
  const [place, setPlace] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [recommendations, setRecommendations] = useState(null);

  const handleSearch = () => {
    setIsLoading(true);
    getThingsToDo(place).then((response) => {
      setRecommendations(response);
      setIsLoading(false);
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-indigo-50">
      <div className="container mx-auto py-10 px-8">
        <Header setPlace={setPlace} handleSearch={handleSearch} />
        {recommendations || isLoading ? (
          <Recommendations place={place} isLoading={isLoading} recommendations={recommendations} />
        ) : (
          <About />
        )}
      </div>
    </div>
  );
}

export default App;
