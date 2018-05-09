import toSpan from '../functions/helper/toSpan';
let timeout; 
let timeline;

export default function(headlineArr, subtextArr, colorArr, direction, initial) {
  const headlineDuration = 0.5;
  const subtextDuration = 0.5;

  const headline = document.getElementsByClassName('topic')[0];
  const subtext = document.getElementsByClassName('topic_subtext')[0];

  const target = document.querySelectorAll('.home_container > section');

  const nextButton = document.querySelector('.next circle');
  const prevButton = document.querySelector('.prev circle');
  
  let buttonHover = null;
  
  const diashowInterval = 15000;
  const tl = new TimelineLite();
  
  const color = colorArr[window.APP.nextSection];

  let mouseMove = false;

  try {
    desktopDiashowManager();
  } catch(e) { console.log(e) }

  // CLEAR PREVIOUS TIMEOUT
  clearTimeout(timeout);
  
  if(!window.APP.autoScrolling && location.pathname === '/') {
    window.APP.autoScrolling = true;

    // UPDATE WINDOW.APP.NEXTSECTION
    updateNextSection(direction);

    // UPDATE CURRENTLINK
    this.updateCurrentLink();
  
    if(!initial) {

      const progress = direction === 'down' ? 1 : 0;
      // SPEED UP TIMELINE
      tl.to(timeline, 0.5, { progress, ease: 'zwanzig-grad', onComplete: () => {
        if(direction === 'down') {
          TweenLite.fromTo(nextButton, 0.5, 
            { strokeDashoffset: 0 }, { strokeDashoffset: -232.478, ease: 'zwanzig-grad' });
        }
      }});

      timeline.pause();

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
      TweenLite.set(target[window.APP.nextSection], { xPercent: 0, zIndex: 2, ease: 'zwanzig-grad' });
    }
 
    !initial && updateSecIndicator.call(this);
    
    const y = (direction === 'down') ? -75 : 75;
    const yPercent = (direction === 'down') ? -100 : 100;

    const delay = 0.05;
    
    if(window.innerWidth > 1025) 
      var callback = window.APP.updateImages;
    
    if(!initial) {
      var headlineTL = new TimelineLite();
      var subtextTL = new TimelineLite();
      const headlineTL2 = new TimelineLite({ onComplete: handleComplete, paused: true });

      headlineTL
        .fromTo('.topic_chars:nth-of-type(even)', headlineDuration, 
          { yPercent: 0 }, 
          { yPercent , ease: 'zwanzig-grad' })
        .fromTo('.topic_chars:nth-of-type(odd)', headlineDuration, 
          { yPercent: 0 }, 
          { yPercent, ease: 'zwanzig-grad' }, delay)
        .set(headline, { text: headlineArr[window.APP.nextSection], onComplete: () => {
          toSpan(headline, 'topic_chars');
          headlineTL2.play();

          headlineTL2.fromTo('.topic_chars:nth-of-type(odd)', headlineDuration, 
            { yPercent: -yPercent }, 
            { yPercent: 0, ease: 'zwanzig-grad' });
          headlineTL2.fromTo('.topic_chars:nth-of-type(even)', headlineDuration, 
            { yPercent: -yPercent }, 
            { yPercent: 0, ease: 'zwanzig-grad' }, delay);
        }
      })
          
      subtextTL
        .set(subtext, { alpha: 1 })
        .to(subtext, subtextDuration, { alpha: 0, ease: 'zwanzig-grad' })
        .set(subtext, { alpha: 0, text: subtextArr[window.APP.nextSection] })
        .to(subtext, subtextDuration, { alpha: 1, ease: 'zwanzig-grad' });

    } else {
      var headlineTL = new TimelineLite({ onComplete: handleComplete });
      var subtextTL = new TimelineLite();

      headlineTL
        .set(headline, { text: headlineArr[window.APP.nextSection], onComplete: () => toSpan(headline, 'topic_chars') })
        .fromTo('.topic_chars:nth-of-type(odd)', headlineDuration + 0.5, 
          { yPercent }, { yPercent: 0, ease: 'zwanzig-grad' })
        .fromTo('.topic_chars:nth-of-type(even)', headlineDuration + 0.5, 
          { yPercent }, {yPercent: 0, ease: 'zwanzig-grad' }, delay);


      subtextTL
        .set(subtext, { text: subtextArr[window.APP.nextSection] })
        .fromTo(subtext, subtextDuration, 
          { alpha: 0, y }, { alpha: 1, y: 0, ease: 'zwanzig-grad' });
    }

    // SET PROPER COLOR
    // if(initial) {
    //   TweenLite.set('.layout', { color });
    //   TweenLite.set('.header_home', { color });
    // } else if(colorArr[window.prevSection] !== colorArr[window.nextSection]) {
    //   TweenLite.to('.layout', 0.5, { color });
    //   TweenLite.to('.header_home', 0.5, { color });
    // }
  } 

  function handleComplete() {
    window.APP.autoScrolling = false;
    window.APP.prevSection = window.APP.nextSection;

    callback && callback(window.APP.nextSection);

    if(window.innerWidth < 1025 || !mouseMove)
      timeout = setTimeout(() => window.APP.nextTopic('down', false), diashowInterval);

    timeline = new TimelineLite();
    timeline
      .set(nextButton, { alpha: 1 })
      .fromTo(nextButton, diashowInterval / 1000, 
        { strokeDasharray: 232.478, strokeDashoffset: 232.478 },
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
    nextButton.parentNode.addEventListener("mouseenter", buttonHoverActive);
    nextButton.parentNode.addEventListener("mouseleave", buttonHoverNotActive);
    prevButton.parentNode.addEventListener("mouseenter", buttonHoverActive);
    prevButton.parentNode.addEventListener("mouseleave", buttonHoverNotActive);
    // DONT MAKE THE INNERWIDTH CHECK HERE - CHECKING INSIDE THE EVENT WORKS ON RESIZE
    window.addEventListener("mousemove", stopDiashow);
    // DOESNT WORK IN OPERA - MIGHT ADD SUPPORT DETECTION AND FOCUS AND BLUR EVENT FALLBACK
    window.addEventListener('visibilitychange', handleVisibilityChange);

    window.addEventListener('mousedown', stopDiashow);
  }

  function buttonHoverActive() {
    buttonHover = true;
    stopDiashow(undefined, false, true);
  }
  function buttonHoverNotActive() {
    buttonHover = false;
  }

  function handleVisibilityChange() {
    document.hidden && stopDiashow(undefined, true)
  }

  function stopDiashow(e, hidden, hover) {
    if(location.pathname !== '/') {
      // REMOVE UNNECESSARY EVENT LISTENER
      nextButton.parentNode.removeEventListener("mouseenter", buttonHoverActive);
      nextButton.parentNode.removeEventListener("mouseleave", buttonHoverNotActive);
      prevButton.parentNode.removeEventListener("mouseenter", buttonHoverActive);
      prevButton.parentNode.removeEventListener("mouseleave", buttonHoverNotActive);
      window.removeEventListener("mousemove", stopDiashow);
      window.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('mousedown', stopDiashow);
      return;
    }

    if(window.innerWidth > 1024 || hidden || hover) { 
      clearTimeout(timeout);
      mouseMove = true;
    }

    try {
      if(timeline.isActive() || buttonHover === false ) {
        buttonHover = null;
        timeline.pause();
        tl.to(timeline, 1, { progress: 0, ease: 'zwanzig-grad', onComplete: continueDiashow });
      } else if(hidden) {
        tl.set(timeline, { progress: 0 });
        continueDiashow();
      } 
    } catch(e) { console.log(e) }
  }

  function continueDiashow(e) {
    if(!buttonHover && !timeline.isActive()) {
      timeline.restart();
      
      clearTimeout(timeout);
      mouseMove = false;
      timeout = setTimeout(() => window.APP.nextTopic('down', false), diashowInterval);
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