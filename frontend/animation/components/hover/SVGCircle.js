import { Fragment } from 'react';

import css from 'styled-jsx/css';

import { Arrow } from '../../../../static/svg/svg.js';

export default class SVGCircle extends React.Component {
  constructor(props) {
    super(props);

    // REF 
    this.svgContainer = React.createRef();
  }

  static defaultProps = {
    className: ''
  }

  componentDidMount() {
    this.svgElem = this.svgContainer.current.childNodes[0];
    this.circle = this.svgElem.childNodes[0];

    this.svgElem.addEventListener("mouseenter", () => this.animateCircle('play'));
    this.svgElem.addEventListener("mouseleave", () => this.animateCircle('reverse'));
  }

  animateCircle = (type) => {
    if(!this.props.touch) {
      if(type === 'play')
        TweenLite.fromTo(this.circle, 1.25, { alpha: 1 },
          { strokeDashoffset: 0, ease: 'zwanzig-grad' });
      else if(type === 'reverse') 
        TweenLite.to(this.circle, 1.25, 
          { strokeDashoffset: 232.478, ease: 'zwanzig-grad', onComplete: () => TweenLite.set(this.circle, { alpha: 0 }) })
    }
  }

  render() {
    return (
      <div ref={this.svgContainer} className={`svg_container ${this.props.className}`}>
        <style jsx global>{`
          .svg_container {
            width: 50px;
            height: 50px;
            position: relative;
            &:first-child>svg:last-child {
              transform: rotate(180deg);
            }
            display: flex;
            svg {
              fill: none;
              transform-origin: center center;
              circle {
                opacity: 0; 
                stroke-dasharray: 232.478; 
                stroke-dashoffset: 232.478;
                stroke: white;
                stroke-width: 3;
                transform-origin: center center;
                transform: rotate(-90deg);
              }
            }
          }
          `}</style>
        <Arrow />
      </div>
    );
  }
}


const arrow = css`button { color: hotpink; }`;
