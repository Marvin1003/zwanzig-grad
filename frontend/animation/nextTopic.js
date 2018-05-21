let timeline, timeout, tween;

export default function(headlineArr, colorArr, direction, initial) {
  if(location.pathname !== '/')
    return; 
    
  const headlineDuration = 0.5;

  const headline = document.getElementsByClassName('topic')[0];

  const target = document.querySelectorAll('.section_background_wrapper');

  // const color = colorArr[window.APP.nextSection];

  const nextButton = document.querySelector('.next');
  const prevButton = document.querySelector('.prev');
  const nextCircle = nextButton.querySelector('circle');
  const prevCircle = prevButton.querySelector('circle');

  const diashowInterval = 15000;
  const tl = new TimelineLite();
  
  let reverseHover = false;
  let active = false;

  let reverse = true;
  
  if(!window.APP.autoScrolling) {
    window.APP.autoScrolling = true;

    // UPDATE WINDOW.APP.NEXTSECTION
    updateNextSection(direction);

    // UPDATE CURRENTLINK
    this.updateCurrentLink();

    TweenLite.set(target[window.APP.nextSection], { visibility: 'visible' });
  
    if(!initial) {
      try {
        timeline.kill();
      } catch(e) { }

      // SPEED UP TIMELINE
      const strokeDashoffset = direction === 'down' ? 0 : 301.593;
      const tl2 = new TimelineLite();
      tl2.to(nextCircle, 0.5, { strokeDashoffset, ease: 'zwanzig-grad' })
         .to(nextCircle, 0.5, { alpha: 0, ease: Power4.easeOut });
      TweenLite.to(prevCircle, 0.5, { strokeDashoffset: 301.593 });

      if(direction === 'down') {   
        setZindex(2, 1);
        TweenLite.to(target[window.APP.prevSection], 1, { xPercent: -50, ease: 'zwanzig-grad' });
        TweenLite.fromTo(target[window.APP.nextSection], 1, { xPercent: 100 }, {
          xPercent: 0,
          ease: 'zwanzig-grad'
        });
      } else {
        setZindex(1, 2);
        
        TweenLite.fromTo(target[window.APP.nextSection], 1, { xPercent: -50 }, { xPercent: 0, ease: 'zwanzig-grad' });
        TweenLite.to(target[window.APP.prevSection], 1, {
          xPercent: 100,
          ease: 'zwanzig-grad'
        });
      }
    } else {
      try {
        desktopDiashowManager();
      } catch(e) { }
      TweenLite.set(target[window.APP.nextSection], { xPercent: 0, zIndex: 2, ease: 'zwanzig-grad' });
    }
 
    !initial && updateSecIndicator.call(this);
    
    const y = (direction === 'down') ? -75 : 75;
    // 110 instead of 100 as line-height is partially to low causing a visual bug where some part of the characters are still visible 
    const yPercent = (direction === 'down') ? -110 : 110;

    if(window.innerWidth > 1025) 
      var callback = window.APP.updateImages;
    
    if(!initial) {
      var headlineTL = new TimelineLite();
      const headlineTL2 = new TimelineLite({ onComplete: handleComplete, paused: true });

      headlineTL
        .fromTo(headline, headlineDuration, 
          { yPercent: 0 }, 
          { yPercent , ease: 'zwanzig-grad' })
        .set(headline, { text: headlineArr[window.APP.nextSection], onComplete: () => {
          headlineTL2.play();

          headlineTL2.fromTo(headline, headlineDuration, 
            { yPercent: -yPercent }, 
            { yPercent: 0, ease: 'zwanzig-grad' });
        }
      })

    } else {
      var headlineTL = new TimelineLite({ onComplete: handleComplete });

      headlineTL
        .set(headline, { text: headlineArr[window.APP.nextSection] })
        .fromTo(headline, headlineDuration + 0.5, 
          { yPercent }, { yPercent: 0, ease: 'zwanzig-grad' });
    }
  } 

  function handleComplete() {
    window.APP.autoScrolling = false;
    window.APP.prevSection = window.APP.nextSection;
    
    callback && callback(window.APP.nextSection);

    try {
      timeline.kill();
    } catch(e) { }
    timeline = new TimelineLite({ onComplete: () =>{ window.APP.nextTopic('down', false) } 
      });
    timeline
      .set(nextCircle, { alpha: 1 })
      .fromTo(nextCircle, diashowInterval / 1000, 
        { strokeDasharray: 301.593, strokeDashoffset: 301.593 },
        { strokeDashoffset: 0, ease: Power0.easeNone });
  }

  function updateNextSection() {
    if (direction === 'up') {
      const up = ((window.APP.nextSection - 1) + window.APP.sectionAmount) % window.APP.sectionAmount ;
      window.APP.nextSection = up;
    }
    else if (direction === 'down') {
      const down = (window.APP.nextSection + 1) % window.APP.sectionAmount ;
      window.APP.nextSection = down;
    }
  }

  function updateSecIndicator() {
    this.current.current.innerText = `0${window.APP.nextSection + 1}`;
    this.amount.current.innerText = `0${window.APP.sectionAmount}`;
  }

  function setZindex(zIndex1, zIndex2) {
    // RESET ZINDEX
    TweenLite.set(target, { zIndex: 0 });
    // SET PROPER ZINDEX FOR TARGET ELEMENTS
    TweenLite.set(target[window.APP.nextSection], { zIndex: zIndex1 });
    TweenLite.set(target[window.APP.prevSection], { zIndex: zIndex2 });
  }

  function sortedChars() {
    if(direction === 'up') {
      return [
        [...document.querySelectorAll('.topic_chars:nth-of-type(even)')].reverse(),
        [...document.querySelectorAll('.topic_chars:nth-of-type(odd)')].reverse()
      ]
    } else if(direction === 'down'){
      return [
        [...document.querySelectorAll('.topic_chars:nth-of-type(even)')],
        [...document.querySelectorAll('.topic_chars:nth-of-type(odd)')]
      ]
    }
  }

  function desktopDiashowManager() {
    nextButton.addEventListener("mouseenter", buttonHoverActive);
    nextButton.addEventListener("mouseleave", buttonHoverNotActive);
    prevButton.addEventListener("mouseenter", buttonHoverActive);
    prevButton.addEventListener("mouseleave", buttonHoverNotActive);

    // DONT MAKE THE INNERWIDTH CHECK HERE - CHECKING INSIDE THE EVENT WORKS ON RESIZE
    window.addEventListener("mousemove", stopDiashow);
    // DOESNT WORK IN OPERA - MIGHT ADD SUPPORT DETECTION AND FOCUS AND BLUR EVENT FALLBACK
    window.addEventListener('visibilitychange', handleVisibilityChange);

    window.addEventListener('mousedown', stopDiashow);
  }

  function animateButtons(type, target) {
    if(!window.APP.autoScrolling && !window.APP.touch) {
      timeline.pause();
      if(type === 'play') {
        reverseHover = false;
        if(target === nextCircle) {
          active = false;
          reverse = false
        } else
          reverse = true;

        tween = TweenLite.fromTo(target , 1, { alpha: 1 }, { strokeDashoffset: 0, ease: 'zwanzig-grad' });
      }
      else if(type === 'reverse') {
        reverseHover = true;
        if(!reverse)
          stopDiashow();
        if(reverse) {
          tween = TweenLite.to(target , 1, 
            { strokeDashoffset: 301.593, ease: 'zwanzig-grad', onComplete: continueDiashow });
          }
      }
    }
  }

  function buttonHoverActive(e) {
    animateButtons('play', e.target.querySelector('circle'));
    stopDiashow(undefined, false, true);
  }
  function buttonHoverNotActive(e) {
    animateButtons('reverse', e.target.querySelector('circle'));
  }

  function handleVisibilityChange() {
    document.hidden && stopDiashow()
  }

  function stopDiashow(e, hidden) {
    if(location.pathname !== '/') {
      // REMOVE UNNECESSARY EVENT LISTENER
      nextButton.parentNode.removeEventListener("mouseenter", buttonHoverActive);
      nextButton.parentNode.removeEventListener("mouseleave", buttonHoverNotActive);
      prevButton.parentNode.removeEventListener("mouseenter", buttonHoverActive);
      prevButton.parentNode.removeEventListener("mouseleave", buttonHoverNotActive);
      window.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('mousedown', stopDiashow);
      window.removeEventListener("mousemove", stopDiashow);
      return;
    }

    try {
      if((timeline.isActive() || reverseHover) && !active) {
        active = true;
        try {
          reverseHover && tween.pause();
        } catch(e) { }
        try {
          timeline.pause();
        } catch(e) { }
        TweenLite.to(nextCircle, 1, { strokeDashoffset: 301.593, ease: 'zwanzig-grad', onComplete: continueDiashow });
      }
    } catch(e) { }
  } 
    
    
  function continueDiashow(e) {
    if(!window.APP.autoScrolling && active) {
      reverseHover = false;
      active = false;
      timeline.kill();
      timeline.restart();
    }
  }

  // CUSTOM MOUSEEND EVENT
  (function customEvent() {
    let timeout;
    function mouseEnd(e) {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        const event = new Event("mousemoveend", { bubbles: true });
        e.target.dispatchEvent(event);
      }, 1000);
    }
    window.addEventListener("mousemove", mouseEnd);
  })();
}


// function gyroParallax({ alpha, beta, gamma }) {
//   const background = document.getElementsByClassName("section_background_wrapper")[window.APP.nextSection].childNodes[0];
 
//   beta = Math.max(-90, Math.min(parseInt(beta - iBeta), 90)) * 0.15;
//   gamma = Math.max(-90, Math.min(parseInt(gamma - iGamma), 90)) * 0.15;

//   TweenLite.to(document.body, 0.1, { rotationX: beta, rotationY: -gamma });
// }
// function getInitialData({ alpha, beta, gamma }) {
//   [iAlpha, iBeta, iGamma] = [alpha, beta, gamma];
// }