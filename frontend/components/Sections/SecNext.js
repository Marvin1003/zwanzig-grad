import Link from '../Utility/Link';
import AutoSlider from '../../animation/components/AutoSlider';

import { Consumer } from '../Context';

export default ({ links, nextRoute }) => {
  links = links.map((link) => (
    <li key={link}>
      {/* <Link scroll={false} href={`/${link.toLowerCase()}`}> */}
      <Link className="hover_half_green" type="link" href={link.toLowerCase()}>{link}</Link>
        {/* <a className="hover_half_green" onClick={() => nextRoute(link.toLowerCase())}>{link}</a> */}
      {/* </Link> */}
     </li>
    ));

  return (
    <section className="section sec_next">
      <h1 className="sec_next_text">NÄCHSTES</h1>
      <ul>
        {links}
      </ul>
      <AutoSlider
        type={1}
        lazy={true}
        parallax={true}
        delay={0.5}
        showDuration={3.5}
        animationDuration={1.25}
        cookie="SecNext"
        imageType="parkett"
        images={[1, 2, 3]}
        links="hover_half_green"
        hover={true}
      />
    </section>
  );
};