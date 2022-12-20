let userId = localStorage.getItem("userId");
let accessToken = localStorage.getItem("accessToken");
let isLogin = false;
let userFavLs = [];

let params = new URLSearchParams(document.location.search);
let id = parseInt(params.get("id"));
let spot = [];
let pre_detail = document.querySelector("pre#detail");
axios.get("https://apply-for-final.onrender.com/spots?id=" + id).
    then(res => {
        spot = [...res.data];
        pre_detail.innerText = JSON.stringify(spot[0], undefined, 2);
    });

if (userId && accessToken) {
    axios.get(`https://apply-for-final.onrender.com/600/users/${userId}`, {
        headers: {
            "Authorization": `Bearer ${accessToken}`
        }
    }).then(res => {
        isLogin = true;
        userFavLs = res.data.fav;
        switchLoginStatus(isLogin);
        switchFavStatus(isLogin)
    }).catch(err => {
        switchLoginStatus(isLogin);
        switchFavStatus(isLogin)
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

function switchFavStatus(isLogin) {
    let div_favArea = document.querySelector("div#fav-area");
    let div_unfav = document.querySelector("div#unfav");
    let div_faved = document.querySelector("div#faved");
    if (isLogin) {
        if (div_favArea.classList.contains("d-none")) {
            document.querySelector("div#fav-area").classList.remove("d-none");
        }
    } else {
        if (!div_favArea.classList.contains("d-none")) {
            document.querySelector("div#fav-area").classList.add("d-none");
        }
    }

    if (userFavLs.length > 0 && userFavLs.filter(x => x == id).length > 0) {
        if (div_faved.classList.contains("d-none")) {
            div_faved.classList.remove("d-none")
        }
        if (!div_unfav.classList.contains("d-none")) {
            div_unfav.classList.add("d-none")
        }
    } else {
        if (!div_faved.classList.contains("d-none")) {
            div_faved.classList.add("d-none")
        }
        if (div_unfav.classList.contains("d-none")) {
            div_unfav.classList.remove("d-none")
        }
    }
}

function fav() {
    if (userId) {
        if (userFavLs.indexOf(id) < 0) {
            userFavLs.push(id);
        }
        axios({
            method: "patch",
            url: `https://apply-for-final.onrender.com/600/users/${userId}`,
            headers: {
                "Authorization": `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            data: {
                fav: userFavLs
            }
        }).then(res => {
            switchFavStatus(true);
        }).catch(err => {
            Swal.fire({
                icon: "error",
                title: err
            });
            console.log(err);
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

function unfav() {
    if (userId) {
        let index = userFavLs.indexOf(id);
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
            switchFavStatus(true);
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