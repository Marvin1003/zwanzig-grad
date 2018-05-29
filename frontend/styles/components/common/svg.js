import css from 'styled-jsx/css';

export default css`
  .svg_container {
    width: 35px;
    height: 35px;
    position: relative;
    cursor: pointer;
    &.svg_hover  {
      &:first-child>svg:last-child {
        transform: rotate(180deg);
      }
      circle {
        stroke: white;
        opacity: 0;
      }
    }
    svg {
      position: absolute;
      overflow: visible;
      height: 100%;
      width: 100%;
      fill: none;
      transform-origin: center center;
      &:first-of-type {
        position: absolute;
      }
      &.hover_circle_last {
        margin: auto;
      }
      circle {
        stroke-dasharray: 301.593px;
        stroke-dashoffset: 301.593px;
        stroke-width: 4;
        transform-origin: center center;
        transform: rotate(-90deg);
      }
      line, path, polyline {
        stroke: white;
      }
      line, path, polyline {
        stroke-width: 4;
      }
    }
  }
`;