export const Arrow = () => (
  <>
    <svg className="circle_svg pointer" xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'>
      <circle className="pointer" cx="50" cy="50"r="48" />
    </svg>
    <svg className="hover_circle_last pointer" xmlns='http://www.w3.org/2000/svg' viewBox="0 0 100 100">
      <polyline className="pointer"  strokeWidth="1" points="32,41 50,59 68,41" />
    </svg>
  </>
);

export const Close = () => (
  <svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12.5 12.5">
    <line x1="0" y1="12.5" x2="12.5" y2="0"/>
    <line x1="12.5" y1="12.5" x2="0" y2="0"/>
  </svg>
);

export const Menu = () => (
  <svg className="pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 10">
    <line className="pointer" x2="25"/>
    <line className="pointer" y1="8" x2="25" y2="8" />
  </svg>
);

export const CursorHome = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <circle cx="50" cy="50"r="48" />
    <circle cx="50" cy="50" r="48" />
    <line x1="61.38" y1="50" x2="39.32" y2="50" />
    <path d="M52.07,59.26H64.13a9.28,9.28,0,0,0,0-18.52H52.24" transform="translate(0 0)" />
    <path d="M47.93,40.74H35.87a9.28,9.28,0,0,0,0,18.52H47.76" transform="translate(0 0)" />
  </svg>
);