// AUTO EXPANDING TEXT AREA
export default () => {
  const textarea = document.getElementsByTagName('textarea')[0];
  const max = window.getComputedStyle(textarea).getPropertyValue('max-height');

  function resize() {
    const height = parseInt(textarea.style.height.replace(/px$/, ''), 10) || 0;
    const maxHeight = parseInt(max.replace(/px$/, ''), 10);
    
    if ((textarea.value.trim().length === 0 && height >= maxHeight) || height < maxHeight) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight + 1}px`;
    } else
      textarea.style.overflow = 'initial';
  }

  textarea.addEventListener('input', resize);
  window.addEventListener('resize', resize);
};
