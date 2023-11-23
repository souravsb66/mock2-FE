let token = JSON.parse(localStorage.getItem("token")) || null;
let logout = document.querySelector(".logout-btn");
let container = document.querySelector(".card-container");
let pages = document.querySelector(".page-container");
let sort = document.querySelector("#sort");
let search = document.querySelector("#search");
let filter = document.querySelector("#filter");

let baseURL = "https://mock2-be.onrender.com";

if(!token) {
    window.location.href = "./login.html";
}

logout.addEventListener("click", () => {
    localStorage.removeItem("token");
    window.location.reload();
})

function fetchPaginatedData(url, page, sort, filer, search) {

    
    fetch(`${url}/freelancers?_limit=4&_page=${page ? page : 1}`)
    .then((res) => {
        let totalCount = res.headers.get("X-Total-Count");
        let limit = 4;
        let totalPages = Math.ceil(totalCount/ limit);
        pages.innerHTML = "";

        for(let pageNumber = 1; pageNumber <= totalPages; pageNumber++) {
            
            let pageBtn = document.createElement("button");
            pageBtn.innerText = pageNumber;
            pageBtn.classList.add("page-btn");

            pageBtn.addEventListener("click", () => {
                fetchPaginatedData(baseURL, pageNumber);
            })

            pages.append(pageBtn);
        }

        return res.json();
    })
    .then((data) => {
        // console.log(data);

        container.innerHTML = "";
        appendCard(data);
    })
    .catch((err) => {
        console.log(err);
    })
}


//Sorting
sort.addEventListener("change", (e) => {
    
    e.preventDefault();
    
    // console.log(e.target.value);
    let sortOrder = e.target.value;
    
    fetchData(`${baseURL}/freelancers?sort=hourly_rate&_order=${sortOrder}`)
})

// async function fetchData(url) {
//     let res = await fetch(url);
//     let data = await res.json();

//     container.innerHTML = "";
//     appendCard(data);
// }


function appendCard(data) {
    let cardList = document.createElement("div");
    cardList.className = "card-list";

    container.append(cardList);
    data.forEach((ele) => {
        let card = createCard(ele);
        cardList.append(card);
    })
}

function createCard(item) {

    let card = document.createElement("div");
    card.className = "user-card";

    // picture, name, email, profession,
    // skills, rate, status
    // edit, delete, hire
    
    let image = document.createElement("img");
    image.className = "user-card-image";
    image.src = item.profile_picture;

    let name = document.createElement("h3");
    name.className = "user-card-name";
    name.innerText = "Name: " + item.name;

    let email = document.createElement("p");
    email.className = "user-card-email";
    email.innerText = "Email: " + item.email;

    let profession = document.createElement("p");
    profession.className = "user-card-profession";
    profession.innerText = "Profession: " + item.profession;

    let skills = document.createElement("p");
    skills.className = "user-card-skills"
    skills.innerText = "Skills: " + item.skills;

    let rate = document.createElement("p");
    rate.className = "user-card-rate";
    rate.innerText = "Rate: " + item.hourly_rate;

    let status = document.createElement("p");
    status.className = "user-card-status";
    status.innerText = "Booking Status: " + item.isBooked;

    let buttonDiv = document.createElement("div");
    let edit = document.createElement("button");
    edit.innerText = "Edit";
    edit.addEventListener("click", () => {
        console.log(item);
    })

    let deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete";
    deleteBtn.addEventListener("click", () => {
        console.log(item);
    })

    let hire = document.createElement("button");
    hire.innerText = "Hire Me";
    hire.addEventListener("click", () => {
        console.log(item);
    })

    buttonDiv.append(edit, deleteBtn, hire)

    card.append(image, name, email, profession, skills, rate, status, buttonDiv);

    return card
    // return item.name
}

fetchPaginatedData(baseURL);