import { PureComponent } from 'react';
import webpInitiate from '../functions/webpSupport';
import Router from 'next/router';
// import smoothScrolling from '../functions/smoothScrolling';

export const { Provider, Consumer } = React.createContext();

export default class extends PureComponent {
  constructor(props) {
    super(props);

    this.req = null;
    this.allowTransition = true;

    this.state = {
      device: null,
      mime: null,
      menu: false,
      pageMounted: false,
      transitionReady: false,
      acceptedCookies: undefined,
      touch: undefined,
      title: 'loading...',
      acceptCookies: this.acceptCookies,
      setMountState: this.setMountState,
      updateTitle: this.updateTitle,
      toggleMenu: this.toggleMenu,
      nextRoute: this.nextRoute
    };
  }

  componentDidMount() {
    webpInitiate.call(this);

    this.target();
    window.addEventListener('resize', this.target);
    window.addEventListener('touchstart', this.isTouch, { once: true });
  }

  isTouch = () => {
    this.setState({ touch: true })
  }

  setMountState = (bool) => {
    // MOUNT STATE
    this.setState((prevState) => {
      if(prevState.pageMounted !== bool) {
        return{ pageMounted: bool }
      }
    })
  }

  preventEvent(e) {
   e.preventDefault();
  } 

  acceptCookies = () => {
    this.setState((prevState) => {
      if(!prevState.acceptedCookies) {
        return { acceptedCookies: true }
        this.forceUpdate();
      }
      return null
    });
  }

  updateTitle = (title) => {
    this.setState((prevState) => {
      if(prevState.title !== title)
        return { title };
      return null;
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

  nextRoute = (req) => {
    req !== location.pathname.slice(1) && this.fadeIn(req);
  }

  toggleMenu = (req) => { 
    window.APP.menu = !this.state.menu;
    
    if((req === location.pathname.slice(1)) || req === 'button') {
      const elements = document.querySelectorAll('#__next > div > :not(.menu)');
      this.setState((prevState) => ({ menu: !prevState.menu }));

      window.APP.menu
        ? TweenLite.set(elements, { alpha: 0 })
        : TweenLite.set(elements, { alpha: 1 })

      // DISABLE TOUCH IF MENU IS OPEN AND MOBILE DEVICE
      window.APP.menu && this.state.device === 'mobile' 
        ? window.addEventListener('touchmove', this.preventEvent, { passive: false })
        : window.removeEventListener('touchmove', this.preventEvent, { passive: false });
    }
    else {
      window.removeEventListener('touchmove', this.preventEvent, { passive: false });
      this.setState((prevState) => {
        if(!prevState.menu)
          return { menu: true }
      });
      this.nextRoute(req)
      
    }
  }

  fadeIn = (next) => {
    this.pageTransition = document.getElementsByClassName("page_transition")[0];
    
    window.addEventListener("wheel", this.preventEvent);
    window.addEventListener("touchmove", this.preventEvent, { passive: false });
    
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

      TweenLite.fromTo(this.pageTransition.parentNode, 1, 
        { scaleX: 0, transformOrigin: '0 0' }, { scaleX: 1, ease: 'zwanzig-grad', onComplete: handleComplete });
    }
  }

  fadeOut() {
    const handleComplete = () => {
      this.allowTransition = true;
      window.removeEventListener("wheel", this.preventEvent);
      window.removeEventListener("touchmove", this.preventEvent, { passive: false });
    }

    const transformOrigin = '100% 100%';

    const tl = new TimelineLite({ onComplete: handleComplete});
    
    tl.set(document.body, { scrollTo: 0 })
      .fromTo(this.pageTransition, 1, 
        { scaleX: 1, transformOrigin }, { scaleX: 0, ease: 'zwanzig-grad' })
      .fromTo(this.pageTransition.parentNode, 1, 
        { scaleX: 1, transformOrigin }, { scaleX: 0, ease: 'zwanzig-grad' }, 0.1)
      .set(this.pageTransition, { scaleX: 1 });
  }
  
  componentDidUpdate() {
    if(this.state.pageMounted && this.state.transitionReady && !this.allowTransition) {
      console.log("Now");
      this.fadeOut();
    }
  }

  render() {
    return (
      <Provider value={this.state}>
        {this.props.children}
      </Provider>
    )
  }
}