import { useState } from "react";
import { getThingsToDo } from "./api";
import "./App.scss";
import Header from "./components/Header";
import Recommendations from "./components/Recommendations";

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
    <div className="container mx-auto py-10 px-8">
      <Header setPlace={setPlace} handleSearch={handleSearch} />
      <Recommendations place={place} isLoading={isLoading} recommendations={recommendations} />
    </div>
  );
}

export default App;
