import Lazy from '../../components/Utility/LazyLoading';

import runOnce from '../../functions/runOnce';

/* eslint-disable */

export default class SnakeNSwitch extends React.Component {
  constructor(props) {
    super(props);

    this.state = { 
      container: null, 
      content: null 
    };

    // REF
    this.container = React.createRef();

    this.ref = {
      images: null,
      rect: null,
    }

    this.index = -1;

    this.data = {
      started: false,
      diff: 80,
      pX: 0,
      pY: 0,
      zIndex: 1,
      dim: null,
      sets: [],
      images: [],
      // DONT INITIALIZE AS EMPTY ARRAY!
      mouse: null
    };

    this.timeout;

    this.getSizes = runOnce(this.getSizes);

    for(let key in this.props.images) 
      this.data.images.push(this.props.images[key].no);

    for(let key in this.props.sets) 
      this.data.sets.push(this.props.sets[key]);
  }

  componentDidMount() {
    window.APP.updateImages = function() {
      this.renderImages();
    }.bind(this);

    this.renderImages();
  }
 
  getSizes = () => {
    this.sizes();
    window.addEventListener('resize', this.sizes);
  }

  componentWillUnmount() {
    window.removeEventListener('mousemove', this.imagePreperation);
    window.removeEventListener('resize', this.sizes);
    this.container.current.removeEventListener("onmousedown", this.handleMouseDown);
    this.container.current.removeEventListener("onmouseup", this.handleMouseUp);
  }

  sizes = () => {
    this.ref.rect = this.props.wrapper.current.getBoundingClientRect();

    if(!this.data.dim) {
      this.data.dim = this.data.images.map(() => (
        this.randomSet()
      ));
    }
    this.data.dim
      .forEach((a) => a.forEach((b) => (
        [ b.px.width, b.px.height ] = 
          [(b.dynamic.width * window.innerWidth) / 100, (b.dynamic.height * window.innerHeight) / 100]
      )));
  }

  randomSet() {
    // EVERY SET ONLY AVAILABLE ONCE
    const length = Object.keys(this.data.sets).length;
    const random = parseInt(Math.random() * length);
    const set = this.data.sets[random]
      .map((a) => (
        {
          dynamic: a,
          px: {
            width: (a.width * window.innerWidth) / 100,
            height: (a.height * window.innerHeight) / 100
          }
        }
      ));

    // REMOVE USED SET FROM AVAILABALE SETS
    this.data.sets.splice(random, 1);
    return set;
  }

  sizeImages = (images) =>  {
    // EMPTY IMAGE ARRAY
    this.ref.images = [];

    // GET SIZES IF NOT ALREADY DONE OR REMOUNTED
    !this.data.dim && this.getSizes();

    images.forEach((image, i) => {
      TweenLite.set(image, { 
        width: `${this.data.dim[window.APP.nextSection][i].dynamic.width}vw`,
        height: `${this.data.dim[window.APP.nextSection][i].dynamic.height}vh`,
      });

      try {
        var [x, y] = this.getPositions(this.data.mouse[0], this.data.mouse[1], i);
      } catch(e) { 
        // FALLBACK
        var x = this.ref.rect.width / 2;
        var y = this.ref.rect.height / 2;
      }

      TweenLite.set(image, { x, y, xPercent: -50, yPercent: -50 });
      
      this.ref.images.push(image);
    });
    
    // START EFFECT
    window.addEventListener('mousemove', this.imagePreperation);
  }

  renderImages(type) {
    const content = Object.keys(this.props.images)[window.APP.nextSection];
    this.setState({
      content: 
        <Lazy
          lazy={false}
          master={this.data.images[window.APP.nextSection]}
          imgType={content}
          imgTag={false}
          group={true}
          animate={false}
          outerStyle={{ height: '100%', width: '100%', position: 'absolute' }}
          start={this.sizeImages}
        />
    })
  }

  imagePreperation = (e) => {
    const [clientX, clientY] = [e.clientX, e.clientY];
   
    if ((((clientX >= this.ref.rect.left && clientY >= this.ref.rect.top) 
      && (clientX <= window.innerWidth - this.ref.rect.left)
      && (clientY <= window.innerHeight - this.ref.rect.top))
      || this.data.started) && !this.props.loader)
      this.moveImages(clientX, clientY);
  }

  moveImages(clientX, clientY) {
    this.data.started = true;
    for (let i = 0; i < this.data.images[window.APP.nextSection].length; i++) {

      const [x, y] = this.getPositions(clientX, clientY, i);

      this.data.mouse = [clientX, clientY];
      
      const random = Math.random() * 0.75 + 0.5;
      const duration = (random / (i + 1)).toFixed(2);

      TweenLite.to(this.ref.images[i], i *  0.2, { x, y, xPercent: -50, yPercent: -50, ease: 'Power1.easeOut', delay: i * 0.0005 });      
    }
    
    if (((clientX > (this.data.pX + this.data.diff)) 
      || clientX < (this.data.pX - this.data.diff)
      || (clientY > (this.data.pY + this.data.diff)) 
      || (clientY < (this.data.pY - this.data.diff))) 
      && ((clientX >= this.ref.rect.left && clientY >= this.ref.rect.top) 
      && ((clientX - this.ref.rect.left) <= this.ref.rect.width && (clientY - this.ref.rect.top) <= this.ref.rect.height))) {
      [this.data.pX, this.data.pY] = [clientX, clientY];
      this.imageSwitch(clientX, clientY);
    }
  }

  getPositions(x, y, i) {
    const target = window.APP.autoScrolling ? window.APP.prevSection : window.APP.nextSection;

    const minX = (this.data.dim[target][i].px.width / 2);
    const minY = (this.data.dim[target][i].px.height / 2);
    const maxX = this.ref.rect.width - (this.data.dim[target][i].px.width / 2)
    const maxY = this.ref.rect.height - (this.data.dim[target][i].px.height / 2);

    return [
      Math.max(Math.min(x, maxX), minX),
      Math.max(Math.min(y, maxY), minY)
    ]
  }

  imageSwitch(clientX, clientY) {
    // SET PROPER ZINDEX
    this.index = (this.index + 1) % this.ref.images.length;
    
    if(this.data.zIndex === this.ref.images.length) {
      this.data.zIndex = 1;
      TweenLite.set(this.ref.images, { zIndex: 1 });
    }
    else
      this.ref.images[this.index].style.zIndex = this.data.zIndex += 1;
  }

  render() {
    return (
      <div ref={this.container} className="home_snake_area">
        {this.state.content}
      </div>
    );
  }
}
