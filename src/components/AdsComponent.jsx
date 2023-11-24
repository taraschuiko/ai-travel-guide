import { useEffect } from "react";
import PropTypes from "prop-types";

const AdsComponent = ({ dataAdSlot }) => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    // eslint-disable-next-line no-empty
    } catch (e) {}
  }, []);

  return (
    <>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-6051723516005389"
        data-ad-slot={dataAdSlot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </>
  );
};

AdsComponent.propTypes = {
  dataAdSlot: PropTypes.string.isRequired,
};

export default AdsComponent;
