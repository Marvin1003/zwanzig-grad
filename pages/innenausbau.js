import App from '../frontend/components/App';

import Lazy from '../frontend/components/Utility/LazyLoading';
import Button from '../frontend/animation/components/hover/ButtonHover';

import style from '../frontend/styles/pages/innenausbau';

export default () => (
  <App title="Innenausbau" next="Parkett" type="topic">
    <style jsx>{style}</style>
    <section className="section sec_two_innenausbau">
      <Lazy
        lazy={false}
        master={1}
        imgType="parkett"
        alt="parkett1"
        imgTag={true}
      />
      <div className="sec_text sec_two_text">
        <h2 className="didonesque_headline">Einfach.</h2>
        <p className="normal_text">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
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
    <section className="section sec_three_innenausbau">
      <Lazy
        lazy={false}
        master={2}
        imgType="parkett"
        alt="parkett2"
        imgTag={true}
      />
      <div className="sec_text sec_three_text">
        <h2 className="didonesque_headline">Schön.</h2>
        <p className="normal_text">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
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
    <section className="section sec_four_innenausbau">
      <h1 className="quattrocento_headline sec_four_headline">Kreativ</h1>
      <Lazy
        lazy={false}
        master={3}
        imgType="parkett"
        alt="parkett3"
        imgTag={true}
      />
      <div className="sec_text sec_four_text">
        <h2 className="didonesque_headline">Perfektion.</h2>
        <p className="normal_text">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
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
  </App>
);