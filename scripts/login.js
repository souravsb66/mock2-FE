let admin_form = document.querySelector("#admin-form");

let loginURL = "https://reqres.in/api/login";
let token = JSON.parse(localStorage.getItem("token")) || null;

if(token) {
    window.location.href = "./freelancers.html";
}

// console.log(token);

admin_form.addEventListener("submit", (e) => {
    e.preventDefault();

    let adminData = {
        email: document.querySelector("#admin-email").value,
        password: document.querySelector("#admin-password").value
    }

    // console.log(adminData);

    fetch(loginURL, {
        method: "POST",
        body: JSON.stringify(adminData),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then((res) => { return res.json() })
    .then((data) => {
        // console.log(data.token);
        localStorage.setItem("token", JSON.stringify(data.token));
        window.location.href = "./freelancers.html";
    })
    .catch((err) => {
        console.log(err);
    })
})