import PropTypes from "prop-types";
import AdsComponent from "./AdsComponent";

const getRandomLoadingMessage = (place) => {
  const capitalizedPlace = place.charAt(0).toUpperCase() + place.slice(1);

  const messages = [
    `Discovering the best things to do in ${capitalizedPlace}...`,
    `Unveiling the hidden gems of ${capitalizedPlace}...`,
    `Finding the best activities in ${capitalizedPlace}...`,
    `Searching for the best places to visit in ${capitalizedPlace}...`,
    `Looking for the best things to do in ${capitalizedPlace}...`,
    `Finding the best places to go in ${capitalizedPlace}...`,
  ];

  return messages[Math.floor(Math.random() * messages.length)];
};

const Recommendations = ({ place, isLoading, recommendations }) =>
  isLoading ? (
    <p className="my-10">⌛️ {getRandomLoadingMessage(place)}</p>
  ) : (
    <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {recommendations &&
        Object.entries(recommendations).map(([title, list]) => (
          <div key={title} className="prose">
            <h2 className="mt-0 mb-4 font-bold text-gray-900">
              Things to {title}
            </h2>
            <ul className="list-none pl-0">
              {list.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      <AdsComponent dataAdSlot="9413620898" />
    </div>
  );

Recommendations.propTypes = {
  place: PropTypes.string,
  isLoading: PropTypes.bool.isRequired,
  recommendations: PropTypes.object,
};

export default Recommendations;
