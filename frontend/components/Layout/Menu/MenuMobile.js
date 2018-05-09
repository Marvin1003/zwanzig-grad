import style from '../../../styles/components/mobile/menuMobile';
import Link from '../../Utility/Link';

export default (props) => {  
  const menuItems = ['Parkett', 'Treppe', 'Moebel', 'Innenausbau']
    .map(elem => (
        <li key={elem} className="didonesque_headline" onClick={() => props.toggleMenu(elem.toLowerCase())}>
          <a>{elem}</a>
        </li>
    ));
  const Close = props.svg;
  return (
    <nav className="menuMobile futura_normal">
      <style jsx>{style}</style> 
      <div onClick={() => props.toggleMenu('button')} className="closemenu">
        <Close />
      </div>
      <div className="wrapper">
        <ul>
          {menuItems}
        </ul>
        <div className="info_container">
          <div className="adresse info">
            <h3 className="geomanist_headline">adresse</h3>
            <span>Wertherstraße 310</span>
            <span>33639 Bielefeld</span>
            <span>Germany</span>
          </div>
          <div className="kontakt info">
            <h3 className="geomanist_headline">kontakt</h3>
            <span>+49 171 64 30 96 2</span>
            <span>+49 521 52 14 00 2</span>
            <span>info@zwanzig-grad.de</span>
          </div>
        </div>
      </div>
      <a onClick={() => props.toggleMenu('impressum')} className="impressum">Impressum</a>
    </nav>
  );
}
