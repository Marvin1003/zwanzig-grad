import Link from '../../Utility/Link';
import style from '../../../styles/components/common/header';

const Header = (props) => {
  const target = document.querySelectorAll('.menu_icon > div');
  const tl = new TimelineLite({ paused: true });
  tl.staggerTo(target , 0.75, { x: 10, ease: 'zwanzig-grad' }, 0.1);

  const onClick = () => {
    props.toggleMenu('button');
    tl.reverse();
  }

  return (
    <nav className={`standard_nav ${props.header}`} >
      <style jsx>{style}</style>
      <Link className="logo" href=""><img src="../static/images/Logo.png" alt="20° Logo" /></Link>
      <div className="menu">
        <div
          className="menu_icon"
          onClick={onClick}
          onMouseEnter={() => tl.play()}
          onMouseLeave={() => tl.reverse()}
          >
          <div>
            <div />
            <div />
          </div>
          <div>
            <div />
            <div />
          </div>
          <div>
            <div />
            <div />
          </div>
        </div>
      </div>
    </nav>
  );
}

Header.defaultProps = {
  header: ''
};

export default Header;



// OBSOLETE HAMBURGER

  // const tl = new TimelineLite({ paused: true });
  // CURRYING TO PREVENT RECREATING FUNCTION
  // const menuIconHover = (bool) => (e) => {
  //   tl.staggerTo('.menu_icon > div', 0.75, { x: 10, ease: 'zwanzig-grad' }, 0.1);
  //   bool ?
  //     tl.play() :
  //     tl.reverse();
  // };
