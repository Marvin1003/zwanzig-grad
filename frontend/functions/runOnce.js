export default function once(fn) {
  let run = true;
  return function (...args){
    if(run) {
      run = false;
      fn(...args);
    }
  }
}
