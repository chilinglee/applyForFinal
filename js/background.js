let userId = localStorage.getItem("userId");
let accessToken = localStorage.getItem("accessToken");
let isLogin = false;

var spotList = [];
let spotArea = document.querySelector("div.spot-area");
axios.get("https://apply-for-final.onrender.com/spots").
    then(res => {
        spotList = [...res.data];
        spotList.forEach(sp => {
            let temp = document.querySelector("template#spot-card");
            let card = temp.content.cloneNode(true);
            let title = card.querySelector(".card-title");
            let text = card.querySelector(".card-text");
            let link = card.querySelector(".card-link");
            title.innerText = sp.name;
            text.innerText = sp.intro;
            link.setAttribute("href", "./detail.html?id=" + sp.id);
            spotArea.appendChild(card);
        });
    }).catch(error => {
        console.log(error);
    });

if (userId && accessToken) {
    axios.get(`https://apply-for-final.onrender.com/600/users/${userId}`, {
        headers: {
            "Authorization": `Bearer ${accessToken}`
        }
    }).then(res => {
        isLogin = true;
        switchLoginStatus(isLogin);
    }).catch(err => {
        switchLoginStatus(isLogin);
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
    window.location.reload();
}
