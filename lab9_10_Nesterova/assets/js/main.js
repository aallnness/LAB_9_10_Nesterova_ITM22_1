const form = document.querySelector("#form");
const inp = document.querySelectorAll("input");
const email = document.querySelector("#email");

function check() {
  let valid = true;
  removeValidation();
  for (let i = 0; i < inp.length; i++) {
    if (inp[i].value.trim() === "") {
      valid = false;
      inp[i].setCustomValidity("Field is empty");
    }
  }
  if (validateEmail() === false) {
    valid = false;
  }
  if (valid) {
    let data = {
      username: inp[0].value,
      email: inp[1].value,
      sub: inp[2].value,
      text: document.getElementById("review_form").value
    }
    fetch("/server", { 
      method: "POST", 
      headers: { "Accept": "application/json", "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })
    .finally(() => alert("Данные успешно отправлены"))
    .then(response => response.text())
    .then(obj => console.log(obj))
  }
}

function removeValidation() {
  for (let i = 0; i < inp.length; i++) {
    inp[i].setCustomValidity("");
  }
}

function validateEmail() {
  const validateEmail = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  let mail = email.value;
  if (validateEmail.test(mail) == false) {
    email.setCustomValidity("Incorrect e-mail address");
    return false;
  }
}
