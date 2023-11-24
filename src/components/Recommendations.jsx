import PropTypes from "prop-types";

const Recommendations = ({ isLoading, recommendations }) => {
  return isLoading ? (
    <p>⌛️ Loading...</p>
  ) : (
    <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
    </div>
  );
};

Recommendations.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  recommendations: PropTypes.object,
};

export default Recommendations;
