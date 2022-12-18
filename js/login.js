function signIn() {
    let email = document.querySelector("#inputEmail").value;
    let password = document.querySelector("#inputPassword").value;

    if (email && password) {
        axios.post("http://localhost:3000/login", {
            "email": email,
            "password": password
        }).then(res => {
            //alert("Success!");
            window.location.assign("./homepage.html");
            localStorage.set("accessToken",
                res.data.accessToken)
        }).catch(err => {
            alert(err.response.data);
        })
    } else {
        alert("Please enter your email & password.");
    }
}