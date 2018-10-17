import Router from 'next/router';

let smoothScrollingEnabled = false;

const values = {
  container: null,
  height: null,
  scrollTo: 0,
  animationDuration: 0.5
};

function smoothScrolling(e) {
  // IF MENU OPEN RETURN FALSE
  if(window.menu)
    return false;
    
  e.preventDefault();
  // FIRERING HERE TO PREVENTS SOME BUGS  - TEMPORARY SOLUTION
  checkContainer(values);

  if (values.scrollTo < 0)
    values.scrollTo = 0;
  else if (values.scrollTo > values.height)
    values.scrollTo = values.height;
  else {
    const yOffset = values.container === window ? window.pageYOffset : values.container.scrollTop;

    // HIERMIT RUMSPIELEN
    values.scrollTo = (yOffset + (e.deltaY * 2) * 2);
  }
  // HIERMIT RUMSPIELEN
  values.animationDuration = Math.abs(e.deltaY / 100).toFixed(2);

  // HIERMIT RUMSPIELEN
  values.animationDuration = 
    values.animationDuration > 1 ?
    1 : values.animationDuration < 0.3 ?
    0.3 : values.animationDuration;

  // HIERMIT RUMSPIELEN
  TweenLite.to(values.container, values.animationDuration, { scrollTo: { y: values.scrollTo }, ease: Power1.easeOut });
}

function checkContainer(values) {
  // ON HOMEPAGE KILL SMOOTHSCROLLING - ALREADY ANOTHER EFFECT AFFECTING THE WHEEL EVENT
  if (!location.pathname.slice(1))
    return false;
  const parallax = document.querySelector('.parallax');

  if (window.innerWidth > 1024 && parallax) {
    [values.container, values.height] = [parallax, parallax.scrollHeight - window.innerHeight];
    if (!smoothScrollingEnabled)
      window.addEventListener('wheel', smoothScrolling);
    return true;
  } else if (document.body.scrollHeight > window.innerHeight) {
    [values.container, values.height] = [window, document.body.scrollHeight - window.innerHeight];
    if (!smoothScrollingEnabled)
      window.addEventListener('wheel', smoothScrolling);
    return true;
  }

  window.removeEventListener('wheel', smoothScrolling);
  smoothScrollingEnabled = false;
  return false;
}

export default function scrolling() {
  // STOP EVERY MIGHT RUNNING EVENT HANDLER
  window.onwheel = null;
  checkContainer(values);
}

// REFIRE IF ROUTE CHANGES
Router.onRouteChangeComplete = () => scrolling;