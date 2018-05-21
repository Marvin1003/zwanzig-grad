import App from '../frontend/components/App';
// import Page from '../frontend/HoC/page';

import Lazy from '../frontend/components/Utility/LazyLoading';
import Button from '../frontend/animation/components/hover/ButtonHover';

import style from '../frontend/styles/pages/parkett';

export default () => (
  <App title="Parkett" next="Treppe" type="topic">
    <style jsx>{style}</style>
    <section className="section sec_two_parkett">
      <Lazy
        master={2}
        imgType="parkett"
        alt="parkett2"
        imgTag={true}
      />
      <div className="sec_text sec_two_text">
        <h2 className="didonesque_headline">Detailliert.</h2>
        <p className="normal_text">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
      </div>
    </section>
    <section className="section sec_three_parkett">
      <Lazy
        master={3}
        imgType="parkett"
        alt="parkett3"
        imgTag={true}
      />
      <div className="sec_text sec_three_text">
        <h2 className="didonesque_headline">Erstaunlich.</h2>
        <p className="normal_text">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat.</p>
        <Button
          name="Ansehen"
          link="#"
          borderSize="2px"
          color="#C1C12B"
          secondEase="Sine.easeOut"
          duration={0.75}
        />
      </div>
    </section>
    <section className="section sec_four_parkett">
      <h1 className="quattrocento_headline sec_four_headline">Unglaublich</h1>
      <div className="sec_four_box" />
      <Lazy
        master={4}
        imgType="parkett"
        alt="parkett4"
        imgTag={true}
      />
      <div className="sec_text sec_four_text">
        <h2 className="didonesque_headline">Zufrieden.</h2>
        <p className="normal_text">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
        <Button
          name="Projekte"
          link="#"
          borderSize="2px"
          color="#C1C12B"
          secondEase="Sine.easeOut"
          duration={0.75}
        />
      </div>
    </section>
  </App>
);