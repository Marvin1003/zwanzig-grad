import App from '../frontend/components/App';

import Lazy from '../frontend/components/Utility/LazyLoading';
import Button from '../frontend/animation/components/hover/ButtonHover';

import style from '../frontend/styles/pages/treppe';

export default () => (
  <App title="Treppe" next="Moebel" type="topic">
    <style jsx>{style}</style>
    <section className="section sec_two_treppe">
      <Lazy
        master={1}
        imgType="parkett"
        alt="parkett1"
        imgTag={true}
      />
      <Lazy
        master={2}
        imgType="parkett"
        alt="parkett2"
        imgTag={true}
      />
      <div className="sec_two_box" />
    </section>
    <section className="section sec_three_treppe">
      <div className="sec_text sec_three_text">
        <h2 className="didonesque_headline">Detailliert.</h2>
        <p className="normal_text">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
      </div>
      <Lazy
        master={1}
        imgType="parkett"
        alt="parkett1"
        imgTag={true}
      />
    </section>
    <section className="sec_four_treppe">
      <Lazy
        master={1}
        imgType="parkett"
        alt="parkett1"
        imgTag={true}
      />
      <Lazy
        master={2}
        imgType="parkett"
        alt="parkett2"
        imgTag={true}
      />
    </section>
    <section className="section sec_five_treppe">
      <h1 className="quattrocento_headline sec_five_headline">Qualität</h1>
      <div className="sec_five_box" />
      <Lazy
        master={4}
        imgType="parkett"
        alt="parkett4"
        imgTag={true}
      />
      <div className="sec_five_text">
        <h2 className="didonesque_headline">Zuverlässig.</h2>
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
