export default function inViewPort(image) {
  try{
    var cRect = image.getBoundingClientRect();
  } catch(e) {
    console.log(`InViewport: ${e}`);
    return false;
  }
  const windowH = window.innerHeight;
  const windowW = window.innerWidth;
  // RETURN TRUE IF ELEMENT IS IN VIEWPORT
  switch (this.props.type) {
    case 1:
      if ((cRect.top > 0) && (cRect.bottom < windowH))
        return true;
      break;
    case 2:
      if ((cRect.left > 0) && (cRect.right < windowW))
        return true;
      break;
    default:
      return false;
  }
  return false;
}
