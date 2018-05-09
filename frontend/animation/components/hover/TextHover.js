import { PureComponent } from 'react';
import Link from 'next/link';
import { hoverIn, hoverOut } from './hover';

export default class TextHover extends PureComponent {
  static defaultProps = {
    tag: 'div',
    onClick: null,
    className: '',
    effectStyle: {}
  }

  constructor(props) {
    super(props);

    // REFS
    this.effect = React.createRef();
    
    // HOVER RELATED
    this.hover = {
      hoverCheck: false,
      runningOne: false,
      runningTwo: false,
      safeItem: null
    };
    /* -----------------*/

    this.style = {
      wrapper: {
        position: 'relative',
        display: 'inline-block',        
        cursor: 'pointer'
      },
      elem: {
        position: 'relative',
        color: 'inherit',
        zIndex: 1,
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        userSelect: 'none',
      },
      effect: {
        position: 'absolute',
        left: 0,
        width: 0,
        whiteSpace: 'nowrap',
        userSelect: 'none',
        overflowX: 'hidden',
        zIndex: 2,
        color: this.props.color,
        backgroundColor: this.props.bgColor
      }
    };

    this.hoverIn = hoverIn.bind(this, 'mouse');
    this.hoverOut = hoverOut.bind(this, 'mouse');
  }

  hoverInAnimation() {
    // GET THE EFFECT NODE
    const hoverIn = new TimelineLite({
      onComplete: () => {
        this.hover.runningOne = false;
        !this.hover.hoverCheck ? hoverOut.call(this, 'repeat') : null;
      }
    });
    hoverIn
      .set(this.effect.current, { direction: 'ltr', left: 0, right: 'auto' })
      .to(this.effect.current, this.props.duration, { width: '100%', ease: 'zwanzig-grad' })
  }

  hoverOutAnimation() {
    // GET THE EFFECT NODE
    const hoverOut = new TimelineLite({
      onComplete: () => {
        this.hover.runningTwo = false;
        this.hover.hoverCheck 
        ? hoverIn.call(this, 'repeat') 
        : null;
      }
    });
    hoverOut
      .set(this.effect.current, { direction: 'rtl', right: 0, left: 'auto' })
      .to(this.effect.current, this.props.duration, { width: 0, ease: 'zwanzig-grad' });
     
  }

  render() {
    const Tag = this.props.tag;
    if(this.props.link)
      return (
        <Tag
          className={`text_hover ${this.props.className}`}
          style={this.style.wrapper}
          onClick={() =>this.props.onClick(this.props.link)}
          onMouseEnter={this.hoverIn}
          onMouseLeave={this.hoverOut}
        >
          <Link href={this.props.link}>
            <a style={this.style.elem}>
              {this.props.name}
            </a>
          </Link>
          <Link href={this.props.link}>
            <a ref={this.effect} style={Object.assign({},this.style.effect, this.props.effectStyle)}>
              {this.props.name}
            </a>
          </Link>
        </Tag>
      );

      return (
        <Tag
          className={`text_hover ${this.props.className}`}
          style={this.style.wrapper}
          onClick={() =>this.props.onClick(this.props.link)}
          onMouseEnter={this.hoverIn}
          onMouseLeave={this.hoverOut}
        >
          <a style={this.style.elem}>
            {this.props.name}
          </a>
          <a ref={this.effect} style={Object.assign({},this.style.effect, this.props.effectStyle)}>
            {this.props.name}
          </a>
        </Tag>
      );
  }
}
