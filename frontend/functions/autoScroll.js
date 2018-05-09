
export default function autoScroller() {
  let scrollSpeed;
  let prevTouch = 0;
  let nextTouch = 0;
  let direction;
  let activeTouch;
  const wheelData = [];

  window.addEventListener('wheel', preventScrolling, { capture: true });
  window.addEventListener('wheel', autoScroll);
  window.addEventListener('touchstart', touchSafeScroll, { passive: true });
  window.addEventListener('touchmove', toggleActiveTouch, { passive: false });
  window.addEventListener('touchend', autoScroll, { passive: true });
  window.addEventListener('keyup', handleArrowNavigation);
  

  buttons();
  initiateAnimation(true);
  /* FUNCTIONS */

  function autoScroll(e) {
    // REMOVE IF USER LEFT HOME OR OPENED MENU
    if (location.pathname.slice(1) !== '') {
      window.removeEventListener('wheel', preventScrolling, { capture: true });
      window.removeEventListener('wheel', autoScroll);
      window.removeEventListener('touchstart', touchSafeScroll, { passive: true });
      window.removeEventListener('touchmove', toggleActiveTouch, { passive: false });
      window.removeEventListener('touchend', autoScroll, { passive: true });
      window.removeEventListener('keyup', handleArrowNavigation);
    }
    if(window.APP.menu || location.pathname.slice(1) !== '') 
      return false;

    if (e.type === 'wheel') {
      scrollSpeed = e.deltaY;

      // Limit to 100 - better performance
      if (wheelData.length > 99)
        wheelData.shift();

      // previous deltaY data
      wheelData.push(Math.abs(scrollSpeed));
    } else if (e.type === 'touchend')
      nextTouch = e.changedTouches[0];

    if(!window.APP.autoScrolling) {
      switch (e.type) {
        case 'wheel':
          // averageScrollStrength idea not by me - i had a different approach. This one is more reliable.
          const nextStrength = averageScrollStrength(wheelData, 20);
          const prevStrength = averageScrollStrength(wheelData, 70);
          const allowScrolling = nextStrength > prevStrength;
          if (allowScrolling) {
            if (scrollSpeed < 0)
              direction = 'up';
            else if (scrollSpeed > 0)
              direction = 'down';

            initiateAnimation(false, direction);
          }
          break;
  
        case 'touchend':
          const yDiff = Math.abs(nextTouch.pageY - prevTouch.pageY);
          const xDiff = Math.abs(nextTouch.pageX - prevTouch.pageX);
          
          if(yDiff > xDiff) {
            if (nextTouch.pageY > prevTouch.pageY)
              direction = 'up';
            else if (nextTouch.pageY < prevTouch.pageY)
              direction = 'down';
          }
          if(yDiff < xDiff) {
            if (nextTouch.pageX > prevTouch.pageX)
              direction = 'up';
            else if (nextTouch.pageX < prevTouch.pageX)
              direction = 'down';
          }

          if(activeTouch)
            initiateAnimation(false, direction);

          activeTouch = false;
          break;

        default:
          console.log('Event not supported');
      }
    }
  }

  function handleArrowNavigation(e) {
    if(e.keyCode === 40 || e.keyCode === 39 || e.keyCode === 32)
      initiateAnimation(false, 'down');
    if(e.keyCode === 38 || e.keyCode === 37)
      initiateAnimation(false, 'up');
  }

  function initiateAnimation(initiate = false, direction) {
    try {
      window.APP.nextTopic(direction, initiate,);
    } catch(e) { }
  }

  function toggleActiveTouch(e) {
    activeTouch = true;
    // TO DISABLE OVERSCROLL ON IOS DEVICES
    if(location.pathname === '/') {
      e.preventDefault();
      return false;
    }
  }

  function touchSafeScroll(e) {
    prevTouch = e.changedTouches[0];
  }

  function preventScrolling(e) {
    e.preventDefault();
  }

  function averageScrollStrength(data, number) {
    let sum = 0;

    // taking `number` elements from the end to get the average, if there are not enough, 1
    const lastWheelData = data.slice(Math.max(data.length - number, 1));

    for (let i = 0; i < lastWheelData.length; i++) {
      sum += lastWheelData[i];
    }

    return Math.ceil(sum / number);
  }


  function buttons() {
    const next = document.getElementsByClassName('next')[0];
    const prev = document.getElementsByClassName('prev')[0];

    next.addEventListener('click', () => initiateAnimation(false, 'down'));
    prev.addEventListener('click', () => initiateAnimation(false, 'up'));
  }

  /* ----------------------------------------------- */
}




  // customEvent();


  // function customEvent() {
  //   let timeout;
  //   function wheelEnd(e) {
  //     clearTimeout(timeout);
  //     timeout = setTimeout(() => {
  //       const event = new CustomEvent('wheelend', { bubbles: true });
  //       e.target.dispatchEvent(event);
  //     }, 50);
  //   }
  //   window.addEventListener('wheel', wheelEnd);
  // }

// let smallestOffset = Math.min(...Array.from(sections,
//   (section) => Math.abs(section.getBoundingClientRect().top)));

// const currentSection = sections.indexOf(
// sections.find((section) => {
//   if(Math.abs(section.getBoundingClientRect().top) === smallestOffset)
//     return sections;
// }));
// return currentSection;


// function currentSection() {
//   let initial = sections[0];
//   for (let i = 0; i < sectionAmount - 1; i++) {
//     const nextSection = sections[i + 1];
//     if ((Math.abs(initial.offsetTop) > Math.abs(nextSection.offsetTop))) 
//       initial = nextSection;
//   }
//   return sections.indexOf(initial);
// }
