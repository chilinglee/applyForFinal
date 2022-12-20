function signUp() {
    let email = document.querySelector("#inputEmail").value;
    let password = document.querySelector("#inputPassword").value;

    if (email && password) {
        axios.post("https://apply-for-final.onrender.com/signup", {
            "email": email,
            "password": password,
            "role": "normal",
            "fav": []
        }).then(res => {
            Swal.fire({
                icon: "success",
                title: "Sucess!",
                timer: 1000,
                timerProgressBar: true,
                showConfirmButton: false
            }).
                then((res) => {
                    window.location.assign("./login.html");
                });
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

