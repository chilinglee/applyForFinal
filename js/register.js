function signUp() {
    let email = document.querySelector("#inputEmail").value;
    let password = document.querySelector("#inputPassword").value;

    if (email && password) {
        axios.post("http://localhost:3000/signup", {
            "email": email,
            "password": password,
            "fav": []
        }).then(res => {
            //alert("Success!");
            window.location.assign("./login.html");
        }).catch(err => {
            alert(err.response.data);
        })
    } else {
        alert("Please enter your email & password.");
    }
}