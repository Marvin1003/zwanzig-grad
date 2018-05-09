import Wrapper from '../components/Wrapper';

import Lazy from '../components/Utility/LazyLoading';
import Button from '../animation/components/hover/ButtonHover';

import style from '../styles/pages/innenausbau';

export default (props) => (
  <Wrapper title="Innenausbau" links={['Parkett', 'Treppe', 'Moebel']} type="topic">
    <style jsx>{style}</style>
    <section className="section sec_two_innenausbau">
      <Lazy
        type={1}
        master={1}
        imgType="parkett"
        cookie="parkett1"
        alt="parkett1"
        imgTag
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
        type={1}
        master={2}
        imgType="parkett"
        cookie="parkett2"
        alt="parkett2"
        imgTag
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
      <h1 className="geomanist_headline sec_four_headline">Kreativ</h1>
      <Lazy
        type={1}
        master={3}
        imgType="parkett"
        cookie="parkett3"
        alt="parkett3"
        imgTag
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
  </Wrapper>
);