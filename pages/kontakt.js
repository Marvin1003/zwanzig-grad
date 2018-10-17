import App from "components/App";

import GoogleMap from "components/Utility/GoogleMaps/GoogleMaps";
import Form from "components/Form/Form";

import styles from "styles/pages/kontakt";

export default () => (
  <App title="Kontakt">
    <style jsx>{styles}</style>
    <div className="container futura_normal">
      <div className="wrapper layout_wrapper mobile_height">
        <h2 className="quattrocento_normal kontakt_header">Kontakt</h2>
        <Form />
        <div className="address font_small">
          <address>
            <span>zwanzig-grad / </span>
            <span>wertherstr. 310 / </span>
            <span>33619 bielefeld / </span>
            <span>
              <a href="tel:0171 - 6668888">0171 - 6668888</a>
            </span>
          </address>
        </div>
      </div>
      <div className="map_root mobile_height" data-size={0.9}>
        <GoogleMap />
      </div>
    </div>
  </App>
);
