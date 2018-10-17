import css from "styled-jsx/css";

export default css`
  .slider {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: absolute;
    top: 0;
    left: 0;
    canvas {
      transformorigin: center;
      position: relative;
      transform: scale(1.1);
    }
  }
`;
