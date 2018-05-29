import Router from 'next/router';
import nextData from '../../../static/json/nextTransitionData.json';

// RESTUCTURE AND TRY TO SPLIT IN MULTIPLE INDEPENDENT CONTEXTS!

export const RouterContext = React.createContext();

export class RouterProvider extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      device: null,
      menu: false,
      nextRoute: this.nextRoute,
      toggleMenu: this.toggleMenu,
      setMountState: this.setMountState
    }

    this.req = null;
    this.allowTransition = true;
  }

  componentDidMount() {
    this.target();
    window.addEventListener('resize', this.target);
  }

  componentDidUpdate() {
    if(this.state.pageMounted && this.state.transitionReady && !this.allowTransition) {
      this.fadeOut();
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.target);
  }

  nextRoute = (req, nextAnimation = false) => {
    this.nextAnimation = nextAnimation
    if(req !== location.pathname.slice(1))
      this.fadeIn(req);
  }

  setMountState = (bool) => {
    // MOUNT STATE
    this.setState((prevState) => {
      if(prevState.pageMounted !== bool) {
        return { pageMounted: bool }
      }
    })
  }
  
  target = () => {
    this.device = window.innerWidth < 1025 ? 'mobile' : 'desktop';
    
    this.setState((prevState) => {
      if (prevState.device !== this.device) {
        // DISABLE TOUCH IF MENU IS OPEN AND MOBILE DEVICE -- ONLY NECESSARY FOR RESIZING WHILE MENU OPEN 
        this.device === 'mobile' && this.state.menu
          ? window.addEventListener('touchmove', this.preventEvent, { passive: false })
          : window.removeEventListener('touchmove', this.preventEvent, { passive: false });

        return {
          device: this.device
        }
      }
      return null;
    });
  }

  toggleMenu = (req) => { 
    window.APP.menu = !this.state.menu;
    
    if(req === 'button') {
      this.setState((prevState) => ({ menu: !prevState.menu }));

      // DISABLE TOUCH IF MENU IS OPEN AND MOBILE DEVICE
      if(window.APP.menu && this.state.device === 'mobile') {
        window.addEventListener('touchmove', this.preventEvent, { passive: false });
        window.addEventListener('wheel', this.preventEvent, { passive: false })
        
      } else {
        window.removeEventListener('touchmove', this.preventEvent, { passive: false });
        window.removeEventListener('wheel', this.preventEvent, { passive: false })
      }
    }
    else {
      window.removeEventListener('touchmove', this.preventEvent, { passive: false });
      this.setState((prevState) => {
        if(!prevState.menu)
          return { menu: true }
      });
      this.nextRoute(req);
    }
  }

  fadeIn = (next) => {
    this.pageTransition = document.getElementsByClassName("page_transition")[0];

    window.addEventListener("wheel", this.preventEvent);
    window.addEventListener("touchmove", this.preventEvent, { passive: false });
    TweenLite.set(document.body, { pointerEvents: 'none' });
    
    const handleComplete = () => {
      this.setState((prevState) => {
        if(prevState.menu)
          return { menu: false }
      });
        Router.push(`/${next}`);
        this.setState({ transitionReady: true })
    }
    if(this.allowTransition) {
      this.allowTransition = false;
      this.setMountState(false);

      if(this.nextAnimation) {
        if(window.innerWidth > 1024) {
          TweenLite.set(this.pageTransition.parentNode, {
            height: nextData[next].height,
            width: nextData[next].width,
            top: nextData[next].top,
            left: nextData[next].left,
            right: nextData[next].right,
            bottom: nextData[next].bottom,
            alpha: 1,
            scale: 1,
            zIndex: -1
          });
        } else {
          TweenLite.set(this.pageTransition.parentNode, {
            height: '50vh',
            width: '100vw',
            top: '50vh',
            alpha: 1,
            right: 0,
            scale: 1,
            zIndex: -1
          });
        }
        
        handleComplete();
      }
      else {
        TweenLite.set(this.pageTransition.parentNode, {
          height: '100vh',
          width: '100vw',
          transformOrigin: '0 0',
          alpha: 1,
          top: 0,
          left: 0
        });
        TweenLite.fromTo(this.pageTransition.parentNode, 1, 
          { scaleX: 0, scaleY: 1, zIndex: 1000, transformOrigin: '0 0' }, 
          { scaleX: 1, ease: 'zwanzig-grad', onComplete: handleComplete });
      }
    }
  }

  fadeOut() {
    const handleComplete = () => {
      this.nextAnimation && TweenLite.set(this.pageTransition.parentNode, { alpha: 0 });
      this.allowTransition = true;
      window.removeEventListener("wheel", this.preventEvent);
      window.removeEventListener("touchmove", this.preventEvent, { passive: false });
      TweenLite.set(document.body, { pointerEvents: 'all' });
    }

    if(this.nextAnimation) {
      TweenLite.set(document.body, { scrollTo: 0 });
      TweenLite.fromTo('#__next', 1, { alpha: 0 }, { alpha: 1, ease: 'zwanzig-grad', onComplete: handleComplete });
    }
    else {
      const transformOrigin = '100% 100%';

      const tl = new TimelineLite({ onComplete: handleComplete});
      
      tl.set(document.body, { scrollTo: 0 })
        .fromTo(this.pageTransition, 1, 
          { scaleX: 1, transformOrigin }, { scaleX: 0, ease: 'zwanzig-grad' })
        .fromTo(this.pageTransition.parentNode, 1, 
          { scaleX: 1, transformOrigin }, { scaleX: 0, ease: 'zwanzig-grad' }, 0.1)
        .set(this.pageTransition, { scaleX: 1 });
    }
  }
  
  preventEvent(e) {
    e.preventDefault();
  } 

  render() {
    return (
      <RouterContext.Provider value={this.state}>
        {this.props.children}
      </RouterContext.Provider>
    );
  }
}