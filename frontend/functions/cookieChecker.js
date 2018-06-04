function cookieChecker(image, type) {
  const cookie = document.cookie.split('; ').join(' ').replace(/=true/g, '').split(' ');
  let cached = false;
  if(type) 
    cached = [...image].every((img) => (cookie.includes(img.dataset.name)));
  else {
    if (cookie.includes(image.dataset.name))  {
      cached = true;
    }
    else {
      cached = false
    }
  }
  cached ? this.initiate(true, image) : this.initiate(false, image);
}

export default cookieChecker;
