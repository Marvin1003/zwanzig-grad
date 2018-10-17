export function hoverIn(type = 'mouse') {
  this.hover.hoverCheck = true;
  if (type === 'mouse' && !this.hover.runningTwo) {
    if (!this.hover.runningTwo && !this.hover.runningOne) {
      this.hoverInAnimation(this);
      this.hover.runningOne = true;
    }
    
  } else if (!this.hover.runningTwo && this.hover.hoverCheck) {
    this.hoverInAnimation();
    this.hover.runningOne = true;
  }
}

export function hoverOut(type = 'mouse') {
  this.hover.hoverCheck = false;
  if (type === 'mouse' && !this.hover.runningOne) {
    if (!this.hover.runningOne && !this.hover.runningTwo) {
      this.hoverOutAnimation(this);
      this.hover.runningTwo = true;
    }

  } else if (!this.hover.runningOne && !this.hover.hoverCheck) {
    this.hoverOutAnimation();
    this.hover.runningTwo = true;
  }
}
