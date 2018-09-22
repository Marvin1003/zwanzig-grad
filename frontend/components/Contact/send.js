export default function ajax(form, resetCaptcha) {
  const xhr = new XMLHttpRequest();

  // FORMDATA OBJECT TO JSON OBJECT
  const fields = document.querySelectorAll("form > div");
  const formData = {};
  fields.forEach(
    container =>
      (formData[container.childNodes[0].name] = container.childNodes[0].value)
  );

  const formDataJSON = JSON.stringify(formData);

  xhr.open("POST", "/send", true);
  xhr.setRequestHeader("Content-type", "application/json");
  xhr.send(formDataJSON);

  function handleStates() {
    resetCaptcha();

    const status = document.getElementsByClassName("status")[0];
    if (this.readyState === this.DONE && this.status === 200) {
      status.style.color = "#C1C12B";
      status.textContent = "Done.";
    } else if (this.status === 500) {
      status.style.color = "red";
      status.textContent = "Something went wrong.";
    }
    status.style.display = "block";
  }

  xhr.onreadystatechange = handleStates;
}
