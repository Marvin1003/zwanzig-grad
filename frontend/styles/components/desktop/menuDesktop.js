import css from 'styled-jsx/css';

export default css`
  // MENU DESKTOP
  :global(.container) {
    cursor : -webkit-grab;
  }
  .wrapper {
    position: relative;
    height: 100%;
    width: 100vw;
    -webkit-overflow-scrolling: touch;
    overflow-x: scroll;
    overflow-y: hidden;
    background-color: #F3F4F7;  
  }
  .wrapper :global(ul) {
    height: 100%;
    display: flex;
    align-items: center;
  }

  .wrapper :global(li) {
    display: flex;
    margin-left: 320px;
    flex: 0 0 33.33vw;
    height: 37%;
  }

  .closemenu {
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    :global(line) {
      stroke: black;
    }
  }

  :global(.topic_link_menu) {
    user-select: none;
    position: relative;
    height: 100%;
    width: 100%;
    :global(img) {
      height: 100%; 
      width: 100%;
      object-fit: cover;
      &:last-of-type {
        margin-right: 320px;
      }
    }
  }

  :global(.geomanist) {
    position: absolute;
    top: 50%;
    transform: translate(calc(25px - 50%), -50%);
    z-index: 2;
    font-size: 30px;
    text-transform: uppercase;
    &:before{
      content: " ";
      position: absolute;
      height: 100%;
      width: calc(75% + 25px);
      left: -25px;
      transform: scaleX(1);
      z-index: -1;
      background-color: #C1C12B;
    }
    :global .lazy_container{
      position: relative;
      z-index: -1;
    }
  }


  .bottom_header {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 75px;
    width: calc(100vw - 100px);
    bottom: 0;
    left: 50px;

    :global(.text_hover) {
      position: relative;
      font-size: 12px;
    }
  }
  // &:after, &:before {
  //       content: '';
  //       height: 20px;
  //       width: 1px;
  //       position: absolute;
  //       left: 50%;
  //       top: 50%;
  //       background-color: black;
  //       transform: translate(-50%, -50%);
  //       transition: background 0.5s ease-out;
  //     }
  //     &:after {
  //       transform: translate(-50%, -50%) rotate(-45deg);
  //     }
  //     &:before {
  //       transform: translate(-50%, -50%) rotate(45deg);
  //     }
  //-------------------------------------
`;
