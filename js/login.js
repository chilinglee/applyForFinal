function signIn() {
    let email = document.querySelector("#inputEmail").value;
    let password = document.querySelector("#inputPassword").value;

    if (email && password) {
        axios.post("https://apply-for-final.onrender.com/login", {
            "email": email,
            "password": password
        }).then(res => {
            localStorage.setItem("accessToken",
                res.data.accessToken);
            localStorage.setItem("userId",
                res.data.user.id);
            let url = "";
            if (res.data.user.role === "admin") {
                url = "./background.html";
            } else {
                url = "./homepage.html";
            }
            Swal.fire({
                icon: "success",
                title: "Sucess!",
                timer: 1000,
                timerProgressBar: true,
                showConfirmButton: false
            }).
                then((next) => {
                    window.location.assign(url);
                })
        }).catch(err => {
            Swal.fire({
                icon: "error",
                title: err
            });
        })
    } else {
        Swal.fire({
            icon: "error",
            title: "Please enter your email & password."
        });
    }
}