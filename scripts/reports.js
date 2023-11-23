let token = JSON.parse(localStorage.getItem("token")) || null;

if(!token) {
    window.location.href = "./login.html";
}

logout.addEventListener("click", () => {
    localStorage.removeItem("token");
    window.location.reload();
})
