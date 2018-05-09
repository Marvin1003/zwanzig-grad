import Wrapper from '../components/Wrapper';

import Lazy from '../components/Utility/LazyLoading';
import Button from '../animation/components/hover/ButtonHover';

import style from '../styles/pages/treppe';

export default (props) => (
  <Wrapper title="Treppe" links={['Parkett', 'Moebel', 'Innenausbau']} type="topic">
    <style jsx>{style}</style>
    <section className="section sec_two_treppe">
      <Lazy
        type={1}
        master={1}
        imgType="parkett"
        cookie="parkett1"
        alt="parkett1"
        imgTag
      />
      <Lazy
        type={1}
        master={2}
        imgType="parkett"
        cookie="parkett2"
        alt="parkett2"
        imgTag
      />
      <div className="sec_two_box" />
    </section>
    <section className="section sec_three_treppe">
      <div className="sec_text sec_three_text">
        <h2 className="didonesque_headline">Detailiert.</h2>
        <p className="normal_text">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
      </div>
      <Lazy
        type={1}
        master={1}
        imgType="parkett"
        cookie="parkett1"
        alt="parkett1"
        imgTag
      />
    </section>
    <section className="sec_four_treppe">
      <Lazy
        type={1}
        master={1}
        imgType="parkett"
        cookie="parkett1"
        alt="parkett1"
        imgTag
      />
      <Lazy
        type={1}
        master={2}
        imgType="parkett"
        cookie="parkett2"
        alt="parkett2"
        imgTag
      />
    </section>
    <section className="section sec_five_treppe">
      <h1 className="geomanist_headline sec_five_headline">Qualität</h1>
      <div className="sec_five_box" />
      <Lazy
        type={1}
        master={4}
        imgType="parkett"
        cookie="parkett4"
        alt="parkett4"
        imgTag
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
  </Wrapper>
);
