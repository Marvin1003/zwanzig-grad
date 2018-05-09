import { PureComponent } from 'react';
import Link from 'next/link';
import { hoverIn, hoverOut } from './hover';

export default class ButtonHover extends PureComponent {
  constructor(props) {
    super(props);

    //REFS 
    this.elem = React.createRef();
    this.bgbox = React.createRef();

    this.state = {
      dom: null,
      wrapperStyle: null,
      elemStyle: null
    };

    // HOVER RELATED
    this.hover = {
      hoverCheck: false,
      runningOne: false,
      runningTwo: false,
      safeItem: null
    };
    /* -----------------*/

    this.wrapperStyle = null;
    this.charWidth = [];

    this.style = {
      elem: {
        display: 'none',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        border: `${this.props.borderSize} solid ${this.props.color}`
      },
      wrapperStyle: {
        whiteSpace: 'nowrap',
        overflow: 'hidden'
      },
      div: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        backgroundColor: this.props.color,
        top: 0,
        left: 0,
        zIndex: -1,
        transform: 'scaleX(0)'
      }
    };
  }

  componentWillMount() {
    const domPreperation = Array.from(this.props.name, (character, i) => (
      <span key={i} style={this.style.wrapperStyle} className="spanWrapper">
        <span className="move" style={{ display: 'inline-block' }}>{character}</span>
        <span className="move" style={{ display: 'inline-block' }}>{character}</span>
       </span>
      ));
    this.setState({ domPreperation });
  }

  componentDidMount() {
    this.spanWrapper = [...this.elem.current.childNodes];
    this.spanWrapper.pop();
    this.elem.current.style.display = 'inline-flex';
    // STILL NEED TO CHECK IF THIS WORKS

    Array.from(this.spanWrapper, (item, i) => {
      // CREATE OVERFLOW BOXES;
      this.charWidth.push(Math.round(item.clientWidth / 2));
      item.style.width = `${this.charWidth[i]}px`;
      Array.from(item.childNodes, (char) => {
        // TO FIX JUMPING ON RESETING POSITION;
        char.style.width = `${this.charWidth[i]}px`;
      });
    });
  }

  hoverAnimation(type) {
    this.spanWrapper.forEach((item, i) => {
      TweenLite.to(item.childNodes, this.props.duration, {
        x: -this.charWidth[i],
        ease: this.props.secondEase,
        onComplete: () => {
          TweenLite.set(item.childNodes, { x: 0 });
          switch (type) {
            case 'in':
              this.hover.runningOne = false;
              if (!this.hover.hoverCheck)
                hoverOut.call(this, 'repeat');
              break;
            case 'out':
              this.hover.runningTwo = false;
              if (this.hover.hoverCheck)
                hoverIn.call(this, 'repeat');
              break;
          }
        }
      }, 0);
    });
  }

  hoverInAnimation() {
    TweenLite.set(this.bgbox.current, { transformOrigin: '0 0' });
    TweenLite.to(this.bgbox.current, this.props.duration, { scaleX: 1, ease: 'zwanzig-grad' });
    this.hoverAnimation('in');
  }

  hoverOutAnimation() {
    TweenLite.set(this.bgbox.current, { transformOrigin: '100% 100%' });
    TweenLite.to(this.bgbox.current, this.props.duration, { scaleX: 0, ease: 'zwanzig-grad' });
    this.hoverAnimation('out');
  }

  render() {
    return (
      <Link href={this.props.link}>
        <a
          className="button_effect"
          style={this.style.elem}
          ref={this.elem}
          onMouseEnter={hoverIn.bind(this, 'mouse')}
          onMouseLeave={hoverOut.bind(this, 'mouse')}
        >
          {this.state.domPreperation}
          <div ref={this.bgbox} style={this.style.div} />
        </a>
      </Link>
    );
  }
}
