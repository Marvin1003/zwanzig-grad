export default function mobileHeight() {
  window.addEventListener('resize', setHeight);
  setHeight();

  function setHeight() {
    const height = window.innerHeight;
    const elements = [...document.getElementsByClassName("mobile_height")];
    elements.forEach((element) => {
      const size = parseInt(element.getAttribute('data-size')) || 1;
      const top = size !== 1 ? (1 - size) * height : null;

      TweenLite.set(element, { height: height * size });
      top && TweenLite.set(element, { top });
    });
  }
}