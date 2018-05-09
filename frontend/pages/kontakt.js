import Wrapper from '../components/Wrapper';

import GoogleMap from '../components/Utility/GoogleMaps';
import Form from '../components/Contact/Form';

import style from '../styles/pages/kontakt';

export default (props) => (
  <Wrapper title="Kontakt" header="header_contact">
    <style jsx>{style}</style>
    <div className="container">
      <div className="futura_normal">
        <h1 className="headline">Kontakt</h1>
        <Form />
        <address className="address">
          <span>zwanzig-grad / </span>
          <span>wertherstr. 310 / </span>
          <span>33619 bielefeld / </span>
          <span>0171 - 6668888</span>
        </address>
      </div>
      <GoogleMap />
    </div>
  </Wrapper>
);