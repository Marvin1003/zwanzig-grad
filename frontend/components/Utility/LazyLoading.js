import { PureComponent } from 'react';

import { WebPContext } from '../Context/WebP';

import runOnce from '../../functions/runOnce';

class LazyLoading extends PureComponent {
  constructor(props) {
    super(props);

    // REFS
    this.image = React.createRef();
    this.container = React.createRef();

    // STYLE
    this.style = {
      height: '100%',
      width: '100%',
      visibility: 'hidden',
    };

    this.parentFunctionOnce = runOnce(this.props.start);
  }

  static defaultProps = {
    className: '',
    outerStyle: {},
    innerStyle: {},
    parallaxFix: '',
    animate: true
  }

  componentDidMount() {
    if(this.props.mime) {
      this.prepare();
    }
  }
  componentDidUpdate() {
    if(this.props.mime) {
      this.prepare();
    }
    if(this.props.group) {
      this.parentFunctionOnce = runOnce(this.props.start);
    }
  }

  prepare = () => {
    if(this.props.group) {
      this.groupImages = [...this.container.current.querySelectorAll('.lazy_image')];
      this.initiate(this.groupImages);
    } else {
      this.initiate(this.image.current);
    }
  }
  
  createObserver(target) {
    // THERE SEEMS TO BE AN ISSUE AS SOME PICTURES ARE PLACED OUTSITE OF THE VIEWPORT ON THE X AXIS (EVEN THO THEY ARE VISUALLY PLACED INSIDE OF IT - THIS IS THE MAGIC OF THE PERSPECTIVE AND TRANSFORM). BUT THIS PROBLEM RESULTS IN THE ELEMENT NEVER BEING TREATED AS IN THE VIEWPORT - SO isInterescting WILL REMAIN FALSE 

    const options = {
      rootMargin: '0px 0px 0px 0px',
      threshold: 0
    }
    
    this.observer = new IntersectionObserver(this.callback, options);
    this.observer.observe(target);
  }

  callback = (target) => {
    // U CAN ALSO ITERATE OF THE OBSERVER ENTRIES BUT I DONT SEE THE NEED HERE AS ITS ALWAYS JUST ONE TARGET - THE OUTER LAZY LOADING CONTAINER 
    if(target[0].isIntersecting) {
      this.lazyLoading(target[0].target);
      this.observer.unobserve(target[0].target);
    }
  }

  initiate(image) {
    this.src = [];

    this.props.group
      ? this.props.master.forEach((img, i) => this.createData(img))
      : this.createData(this.props.master);

    this.showImage(image);
  }

  createData(image) {
    const master = `../static/images/${this.props.imgType}/${image}${this.props.mime}`;
    this.src.push(master);
  }

  showImage(image) {
    this.images = this.props.group ? this.groupImages : [this.image.current];
    if(this.props.lazy) {
      this.createObserver(this.container.current);
    } else {
      this.lazyLoading(this.images);
    }
  }

  applySource(image, src) {
    TweenLite.set(image, { visibility: 'visible' });
    if(this.props.imgTag) 
      TweenLite.set(image, { src });
    else 
      TweenLite.set(image, { backgroundImage: `url(${src})`});

    TweenLite.set(this.container.current, { background: 'none' });
  }

  lazyLoading(src, cookie) {
    // LOAD MASTER IMAGE
    this.images.forEach((image, i) => {
      const highRes = new Image();
      highRes.src = this.src[i];
      highRes.onload = () => ( this.applySource(image, this.src[i]) );
    })
    if(this.props.group)
      this.handleComplete();
  }

  handleComplete = () => {
    this.parentFunctionOnce(this.groupImages);
  }

  render() {
    const Tag = this.props.imgTag ? 'img' : 'div';
    if(this.props.group) {
      return (
        <div 
          data-name="lazy" 
          ref={this.container} 
          style={this.props.style} 
          className={`lazy_container background_center ${this.props.className}`}
        >
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
        className={`lazy_container ${this.props.className}`}
      >
        <Tag data-name={this.props.imgType + this.props.master}
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
  <WebPContext.Consumer>
    {(mime) => <LazyLoading {...props} {...mime} /> }
  </WebPContext.Consumer>
);

