export default function fakeBar(elem) {
  let firstStep = random(15, 30);
  let currentProgress = 0;
  let tween;

  animate = animate.bind(this, elem);

  animate(firstStep, 0);
  
  // manageFakeBar = manageFakeBar.bind(this);
  window.addEventListener('online', manageFakeBar);
  window.addEventListener('offline', manageFakeBar);  

  function manageFakeBar({ type }) {
    switch(type) {
      case 'online': 
      !this.props.pageMounted
        ? tween.play()
        : tween.kill();
        break;
      case 'offline':
        tween.pause();
        break;
    }
  }

  function animate(elem, step = random(5, 10), delay = random(500, 5000)) { 
    if(this.props.pageMounted)
      return;

    const scaleX = (1 / 100) * step;
    currentProgress += scaleX;

    if(currentProgress < 0.9) 
      tween = TweenLite.to(elem, 1, { scaleX: currentProgress, delay: delay / 1000, ease: 'zwanzig-grad', onComplete: animate, onUpdate: () => this.props.pageMounted && tween.kill() });
  }
}

function random(min, max) {
  return parseInt(Math.random() * (max - min) + (min + 1));
}
