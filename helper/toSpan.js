export default function toSpan(elem, className = "", ) {
  const textArr = elem.innerText.split(" ");
  elem.innerHTML = textArr.map((word) => (
    `<span style="display: inline-block">${[...word].map((char) => `<span style="display: inline-block" class="${className}">${char}</span>`).join("")}</span> `)
  ).join("");
}