import App from '../frontend/components/App';

import GoogleMap from '../frontend/components/Utility/GoogleMaps';
import Form from '../frontend/components/Contact/Form';

import style from '../frontend/styles/pages/kontakt';

export default () => (
  <App title="Kontakt">
    <style jsx>{style}</style>
    <div className="container">
      <div className="wrapper">
        <div className="futura_normal layout_wrapper">
          <Form />
          <address className="address font_small">
            <span>zwanzig-grad / </span>
            <span>wertherstr. 310 / </span>
            <span>33619 bielefeld / </span>
            <span>0171 - 6668888</span>
          </address>
        </div>
      </div>
      <GoogleMap />
    </div>
  </App>
);