let userId = localStorage.getItem("userId");
let accessToken = localStorage.getItem("accessToken");
let isLogin = false;
let userFavLs = [];

var spotList = [];
let spotArea = document.querySelector("div.spot-area");
if (userId && accessToken) {
    axios.get(`https://apply-for-final.onrender.com/600/users/${userId}`, {
        headers: {
            "Authorization": `Bearer ${accessToken}`
        }
    }).then(res => {
        isLogin = true;
        userFavLs = res.data.fav;
        switchLoginStatus(isLogin);
        renderFavList();
    }).catch(err => {
        switchLoginStatus(isLogin);
    });
} else {
    Swal.fire({
        "title": "Please login.",
        "icon": "error"
    }).then(res => {
        window.location = "./login.html";
    });
}

function renderFavList() {
    spotArea.innerHTML = "";
    axios.get("https://apply-for-final.onrender.com/spots").
        then(res => {
            spotList = [...res.data];
            spotList.forEach(sp => {
                if (userFavLs.indexOf(sp.id) >= 0) {
                    let temp = document.querySelector("template#spot-card");
                    let card = temp.content.cloneNode(true);
                    let title = card.querySelector(".card-title");
                    let text = card.querySelector(".card-text");
                    let link = card.querySelector(".card-link");
                    let a_unfav = card.querySelector("a#unfav");
                    title.innerText = sp.name;
                    text.innerText = sp.intro;
                    link.setAttribute("href", "./detail.html?id=" + sp.id);
                    a_unfav.addEventListener("click", function () {
                        unfav(sp.id);
                    });
                    spotArea.appendChild(card);
                }
            });
        }).catch(error => {
            console.log(error);
        });
}

function switchLoginStatus(isLogin) {
    let ul_login = document.querySelector("ul#login");
    let ul_unlogin = document.querySelector("ul#unlogin");
    if (isLogin) {
        if (ul_login.classList.contains("d-none")) {
            document.querySelector("ul#login").classList.remove("d-none");
        }
        if (!ul_unlogin.classList.contains("d-none")) {
            document.querySelector("ul#unlogin").classList.add("d-none");
        }
    } else {
        if (!ul_login.classList.contains("d-none")) {
            document.querySelector("ul#login").classList.add("d-none");
        }
        if (ul_unlogin.classList.contains("d-none")) {
            document.querySelector("ul#unlogin").classList.remove("d-none");
        }
    }
}

function logOut() {
    localStorage.setItem("userId", "");
    localStorage.setItem("accessToken", "");
    window.location = "./homepage.html"
}

function unfav(spotId) {
    if (userId) {
        let index = userFavLs.indexOf(spotId);
        if (index >= 0) {
            userFavLs.splice(index, 1);
        }
        axios({
            method: "patch",
            url: `https://apply-for-final.onrender.com/600/users/${userId}`,
            headers: {
                "Authorization": `Bearer ${accessToken}`
            },
            data: {
                fav: userFavLs
            }
        }).then(res => {
            renderFavList();
        }).catch(err => {
            Swal.fire({
                icon: "error",
                title: err
            });
        });
    } else {
        Swal.fire({
            icon: "error",
            title: "Please login."
        }).then(res => {
            window.location = "./login.js";
        });
    }
}
