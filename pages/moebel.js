import App from "components/App";

import Lazy from "components/Utility/LazyLoading";
import Button from "components/Hover/Button/Button";

import styles from "styles/pages/moebel";

export default () => (
  <App title="Möbel" next="Innenausbau" type="topic">
    <style jsx>{styles}</style>
    <section className="section sec_two_moebel">
      <Lazy
        lazy={false}
        master={2}
        imgType="parkett"
        alt="parkett2"
        imgTag={true}
      />
      <div className="sec_two_box" />
      <div className="sec_text sec_two_text">
        <h2 className="didonesque_headline">Erfahrung.</h2>
        <p className="normal_text">
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
          sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
          rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem
          ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
          sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
          dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam
          et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
          takimata sanctus est Lorem ipsum dolor sit amet.
        </p>
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
    <section className="section sec_three_moebel">
      <h1 className="quattrocento_headline sec_three_headline">Sorgfältig</h1>
      <Lazy
        lazy={false}
        master={3}
        imgType="parkett"
        alt="parkett3"
        imgTag={true}
      />
      <div className="sec_text sec_three_text">
        <h2 className="didonesque_headline">Materialien.</h2>
        <p className="normal_text">
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
          sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
          rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem
          ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
          sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
          dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam
          et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
          takimata sanctus est Lorem ipsum dolor sit amet.
        </p>
      </div>
    </section>
    <section className="section sec_four_moebel">
      <Lazy
        lazy={false}
        master={1}
        imgType="parkett"
        alt="parkett1"
        imgTag={true}
      />
      <Lazy
        lazy={false}
        master={2}
        imgType="parkett"
        cookie="parkett2"
        alt="parkett2"
        imgTag={true}
      />
      <Lazy
        lazy={false}
        master={3}
        imgType="parkett"
        alt="parkett3"
        imgTag={true}
      />
    </section>
  </App>
);
