export default function mobileHeight() {
  window.addEventListener('resize', setHeight);
  setHeight();

  function setHeight() {
    if(window.innerWidth <= 1024) {
      const height = window.innerHeight;
      const elements = [...document.getElementsByClassName("mobile_height")];
      elements.forEach((element) => {
        const size = element.getAttribute('data-size') || 1;
        TweenLite.set(element, { height: height * size, top: (1 - size) * height });
      });
    }
  }
}