import { PureComponent } from 'react';

import { Consumer } from '../Context';

import inViewPort from '../../functions/helper/inViewPort';
import cookieChecker from '../../functions/helper/cookieChecker';
import runOnce from '../../functions/helper/runOnce';

// IMPORTANT --- IMPLEMENT INTERSECTION OBSERVER IF SUPPORTED / WAY MORE PERFORMANT
class LazyLoading extends PureComponent {
  constructor(props) {
    super(props);
    
    // REFS
    this.image = React.createRef();
    this.loading = React.createRef();
    this.container = React.createRef();

    this.handleComplete = this.handleComplete.bind(this);

    // STYLE
    this.style = {
      height: '100%',
      width: 0,
      display: 'none',
    };

    this.parentFunctionOnce = runOnce(this.props.start);
  }

  static defaultProps = {
    class: '',
    outerStyle: {},
    innerStyle: {},
    parallaxFix: '',
    autoSlider: false,
    animate: true
  }

  componentDidMount() {
    this.initiateCheckCookies();
  }

  componentDidUpdate() {
    // RESET 
    this.parentFunctionOnce = runOnce(this.props.start);
    
    this.initiateCheckCookies();
  }

  componentWillUnmount() {
    this.eventListener("remove")
  }

  initiateCheckCookies() {
    (this.props.mime && this.props.acceptedCookies) && this.checkCookies();
  }

  checkCookies = () => {
    if(this.props.group) {
      this.groupImages = this.container.current.querySelectorAll('.lazy_image');
      cookieChecker.call(this, this.groupImages, true);
    } else 
      cookieChecker.call(this, this.image.current);
  }

  initiate(cached, image) {
    if(this.props.group) {
      let cookies = [];
      let src = [];
      this.props.master.forEach((img, i) => {
        this.master = `../static/images/${this.props.imgType}/${img}${this.props.mime}`;
        src.push(this.master);
        cookies.push(this.props.imgType + img);
      })
      this.showImage(cached, image, cookies, src);
    } else {
      this.master = `../static/images/${this.props.imgType}/${this.props.master}${this.props.mime}`;
      this.showImage(cached, image, this.props.cookie);
    }
  }

  applySource(image, src, cached) {
    TweenLite.set(image, { display: 'initial' });
    
    if(this.props.imgTag) 
      image.src = src;
    else 
      TweenLite.set(image, { backgroundImage: `url(${src})`});

      if(!cached && this.props.animate) {
        TweenLite.to(image, 0.75, 
          { width: '100%', ease: 'zwanzig-grad', onComplete: this.handleComplete });
      }

    else if(!this.props.autoSlider)
      this.handleComplete();
    else if(cached && this.props.autoSlider)
      this.loading.current.remove();
  }

  handleComplete(cached) {
    if(!this.props.autoSlider && this.loading.current)
      this.loading.current.remove();
    else {
      this.timeout = setTimeout(() => {
        try {
          this.loading.current.remove();
          this.container.current.classList.remove('lazy_container');
        } catch(e) { console.log(e) }
      }, 2000);
    }
    // NOT CLEAN
    if(this.props.group) 
      this.parentFunctionOnce(this.groupImages);
  }

  showImage(cached, image, cookie, src) {
    if(cached) {
      TweenLite.set(image, { width: '100%' });
      this.container.current.classList.remove('lazy_container');
      if(this.props.group) {
        image.forEach((image, i) => this.applySource(image, src[i], cached));
        this.eventListener('add', this.container.current, cookie, src, cached);
      } else 
        this.applySource(image, this.master, cached);
    } else {
      this.loading.current.classList.add('lazy');
      this.loading.current.innerText = 'Loading';

      if(this.props.autoSlider) 
        this.eventListener('add', this.container.current, cookie, src, cached);
      else if(!this.props.group) 
        this.eventListener('add', image, cookie, this.master, cached);
      else 
        this.lazyLoading(this.container.current, cookie, src, cached);
    }
  }

  eventListener(type, i, c, s, bool) {
    
    const parallax = document.getElementsByClassName('parallax')[0];

    switch (type) {
      case 'add': 
        this.lazy = this.lazyLoading.bind(this, i, c, s, bool);
        document.body.addEventListener('scroll', this.lazy, { passive: true });
        if(parallax)
          parallax.addEventListener('scroll', this.lazy, { passive: true });
        this.lazy();
        break;
      case 'remove':
        clearTimeout(this.timeout);
        document.body.removeEventListener('scroll', this.lazy, { passive: true });
        if(parallax)
          parallax.removeEventListener('scroll', this.lazy, { passive: true });
        break;
      default: 
        console.log('Invalid Type')
    }
  }

  lazyLoading(image, cookie, src, cached) {
    // CHECK IF IMAGE IS VISIBLE
    const visible = inViewPort.call(this, this.container.current);

    if (visible || this.props.type === 3) {
      this.eventListener('remove');
      // LOAD MASTER IMAGE
      if(!cached) {
        if(this.props.group) {
          src.forEach( async (s, i) => {
            const highRes = new Image();
            highRes.src = s;
            document.cookie = `${cookie[i]}=true`;
            highRes.onload = () => (
              this.applySource(image.childNodes[i].childNodes[0], s, cached)
            );
          })
        } else {
          const highRes = new Image();
          highRes.src = src;
          highRes.onload = () => (
            this.applySource(image, src, cached)
          );
          document.cookie = `${cookie}=true`;
        }
      } else if(this.props.autoSlider)
        this.handleComplete();
    }
  }

  render() {
    const Tag = this.props.imgTag ? 'img' : 'div';
    if(this.props.group) {
      return (
        <div 
          data-name="lazy" 
          ref={this.container} 
          style={this.props.style} 
          className={`lazy_container background_center ${this.props.class}`}
        >
          <span ref={this.loading} className={this.props.parallaxFix}></span>
          {
            this.props.master.map((image, i) => (
              <div style={this.props.outerStyle} key={`${this.props.imgType}${i + 1}`} >
                <Tag data-name={`${this.props.imgType}${i + 1}`}
                  alt={`${this.props.imgType}${i + 1}`}
                  className="lazy_image" 
                  style={Object.assign({}, this.style, this.props.innerStyle)}
                />
              </div>
            ))
          }
        </div>
      );
    }

    return (
      <div 
        data-name="lazy" 
        ref={this.container} 
        style={this.props.style} 
        className={`lazy_container ${this.props.class}`}
      >
        <span ref={this.loading}></span>
        <Tag data-name={this.props.cookie}
          ref={this.image} 
          alt={this.props.alt} 
          className="lazy_image background_center" 
          style={this.style}
        />
      </div>
    );
  }
}

export default (props) => (
  <Consumer>
    {({acceptedCookies, mime}) => <LazyLoading {...props} acceptedCookies={acceptedCookies} mime={mime} /> }
  </Consumer>
);

