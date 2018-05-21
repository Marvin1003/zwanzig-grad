import css from 'styled-jsx/css';

export default css`
  $layoutGAP: 10vw;
  $height: 37%;
  // MENU DESKTOP
  :global(.container) {
    cursor : -webkit-grab;
  }
  .wrapper {
    width: 100vw;
    height: 100%;
    position: relative;
    -webkit-overflow-scrolling: touch;
    overflow-x: scroll;
    overflow-y: hidden;
  }
  .wrapper :global(ul) {
    height: 100%;
    display: flex;
    align-items: center;
  }

  .wrapper :global(li) {
    display: flex;
    height: $height;
    margin-left: 320px;
    flex: 0 0 33.33vw;
  }

  .closemenu {
    position: absolute;
    top: $layoutGAP;
    right: $layoutGAP;
  }

  .impressum_wrapper {
    cursor: pointer;
    overflow: hidden;
    position: absolute !important;
    right: $layoutGAP;
    bottom: $layoutGAP;
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

  :global(.quattrocento) {
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
    font-size: 35px;
    overflow: hidden;
    :global .lazy_container{
      position: relative;
      z-index: -1;
    }
  }

  //-------------------------------------
`;
