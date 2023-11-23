let form = document.querySelector(".user-form");
let message = document.querySelector(".message");

let baseURL = "https://mock2-be.onrender.com";


form.addEventListener("submit", (e) => {
  e.preventDefault();

  let skills = document.querySelector("#skills").value;
  
  let skillsArray = skills.split(" ");
//   console.log(skillsArray);

  let userData = {
    name: document.querySelector("#name").value,
    email: document.querySelector("#email").value,
    password: document.querySelector("#password").value,
    profession: document.querySelector("#profession").value,
    skills: skillsArray,
    hourly_rate: document.querySelector("#rate").value,
    profile_picture: document.querySelector("#profile-img").value,
    isBooked: false,
  };

//   console.log(userData);

  fetch(`${baseURL}/freelancers`, {
    method: "POST",
    body: JSON.stringify(userData),
    headers: {
        "Content-Type": "application/json"
    }
  })
  .then((res) => {return res.json()})
  .then((data) => {
    console.log(data);
    message.innerText = "Successfully registered.";
    setTimeout(() => {
        message.style.display = "none"
    },2000)
  })
  .catch((err) => {
    console.log(err);
  })
});
