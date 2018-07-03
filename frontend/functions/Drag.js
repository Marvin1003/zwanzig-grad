export default class DragAnimation {
  constructor(elem, ease, headlines, duration, strength) {
    this.elem = document.querySelector(elem);
    this.topics = document.querySelectorAll('a');
    this.headlines = document.querySelectorAll(headlines);

    this.ease = ease;
    this.strength = strength;
    this.duration = duration;

    this.scrollStrength = 0.35;
    this.width = window.innerWidth;

    this.coordinates = {
      startX: 0,
      endX: 0,
      previousX: 0
    };
    this.distances = {
      difference: 0,
      currentEaseX: 0,
      calcEase: 0,
      totalLength: 0
    };
    this.checks = {
      isMoving: false,
      interrupt: false
    };
    this.timer = {
      start: null,
      end: null
    };

    this.interruptSpace = 5;
    this.tween = null;

    // BIND THIS TO EVENT LISTENER
    this.mouseMove = this.mouseMove.bind(this);
    this.mouseDown = this.mouseDown.bind(this);
    this.mouseUp = this.mouseUp.bind(this);
    this.changeScrollDirection = this.changeScrollDirection.bind(this);
    this.contextmenu = this.contextmenu.bind(this);
    
    this.scrollTo = 0;
    
    // ADD MOUSEMOVE EVENT HANDLER
    window.onmouseup = this.mouseUp;
    window.onmousedown = this.mouseDown;
    window.onwheel = this.changeScrollDirection;
    window.oncontextmenu = this.contextmenu;

    TweenLite.set(document.body, { cursor: '-webkit-grab' });
  }

  errorHandling() {
    TweenLite.set('*', { clearProps: 'cursor' });
    // REMOVE DRAGER EVENT HANDLER
    window.onmouseup = null;
    window.onmousedown = null;
    window.onmousemove = null;
    window.onwheel = null;
    window.oncontextmenu = null;
  }

  contextmenu(e) {
    e.preventDefault();
  }

  changeScrollDirection(e) {
    try {
      e.preventDefault();
      try {
        var scrollWidth = this.elem.scrollWidth - window.innerWidth;
      } catch(e) { return; }

      if (this.scrollTo < 0)
        this.scrollTo = 0;
      else if (this.scrollTo > scrollWidth)
        this.scrollTo = scrollWidth;
      else
        this.scrollTo = ((e.deltaY + e.deltaX) * this.scrollStrength) + this.elem.scrollLeft;

      TweenLite.to(this.elem, 0.1, { scrollTo: { x: this.scrollTo, y: 0 }, ease: Power4.easeOut });
    } catch(e) {
      this.errorHandling();
    }
  }

  mouseDown(e) {
    try {
      // ADD MOUSEMOVE EVENT HANDLER
      window.onmousemove = this.mouseMove;

      // SET CURSOR OF CONTAINER
      TweenLite.set(document.body, { cursor: '-webkit-grabbing' });

      // CURRENT POSITION
      this.coordinates.startX = e.clientX;

      // CURRENT SCROLL POSITIOJN
      this.distances.currentEaseX = this.elem.scrollLeft;

      if (this.tween)
        this.tween.pause();
    } catch(e) {
      this.errorHandling();
    }
  }

  mouseUp() {
    try {
      // HANDLE EVENT LISTENER
      window.onmousedown = this.mouseDown;
      window.onmousemove = null;

      // SET CURSOR
      TweenLite.set(document.body, { cursor: '-webkit-grab' });

      // PERFORMANTER MACHEN BEI LANGEWEILE !!!
      TweenLite.set(this.elem.parentNode, { clearProps: 'pointerEvents' });

      // ANIMATE TO
      if (this.checks.isMoving && !this.checks.interrupt) {
        this.distance = this.coordinates.endX - this.coordinates.startX;

        // CALCULATE POSITION TO EASE TO
        this.distances.calcEase = (this.distances.difference - ((this.distance / this.strength) * (this.width / 1000)));
          
        // if(this.distances.calcEase > (this.elem.scrollWidth - w))
        //   this.distances.calcEase = (this.elem.scrollWidth - w);

        // CALCULATE ANIMATIONDURATION
        this.animationDuration = (this.duration / (Math.abs(this.distance)) / 2).toFixed(2);

        this.animationDuration = Math.max(0.5, Math.min(this.animationDuration, 2));

        this.tween = TweenLite.to(this.elem, this.animationDuration, { scrollTo: { x: this.distances.calcEase }, ease: this.ease });

        this.checks.isMoving = false;
      }
    } catch(e) {
      this.errorHandling();
    }
  }

  mouseMove(e) {
    try {
      // HANDLE EVENT LISTENER
      window.onmousedown = null;

      // SET CURSOR
      TweenLite.set(document.body, { cursor: '-webkit-grabbing' });

      TweenLite.set(this.elem.parentNode, { pointerEvents: 'none' });

      // CURRENT POSITION
      this.coordinates.endX = e.clientX;

      // CALCULATE DIFFERENCE
      this.distances.difference = this.distances.currentEaseX - (this.coordinates.endX - this.coordinates.startX);
      // CHECK IF NOT MOVING
      if (Math.abs(this.coordinates.endX - this.coordinates.previousX) < this.interruptSpace && this.coordinates.endX > 0)
        this.checks.interrupt = true;
      else
        this.checks.interrupt = false;

      TweenLite.to(this.elem, 0.35, { scrollTo: { x: this.distances.difference }, ease: this.ease });

      this.checks.isMoving = true;
      this.coordinates.previousX = e.clientX;
    }
    catch(e) {
      this.errorHandling();
    }
  }
}


  // if(this.distances.calcEase >= this.scrollWidth) {
      //   this.destination = this.distances.calcEase - this.scrollWidth;
      //   const test = new TimelineLite();
      //   const hi = this.scrollWidth - this.elem.scrollLeft;
      //   this.destination = this.destination > this.overflow ? this.overflow : this.destination;
      //   const a = (this.destination/(hi + this.destination))*100;
      //   const b = (hi/(hi + this.destination))*100;
      //   const c = this.animationDuration/100;
      //   const aT = c * a;
      //   const bT = c * b;
      //   test.to(this.elem, bT, { scrollTo: { x: this.scrollWidth }, ease: Linear.easeNone })
      //       .to(this.elem, aT, { x: -this.destination, ease: Power1.easeOut  })
      //       .to(this.elem, aT, { x: 0, ease: Power1.easeOut });
      // }