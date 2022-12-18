let params = new URLSearchParams(document.location.search);
let id = parseInt(params.get("id"));
let spot = [];
let pre_detail = document.querySelector("pre#detail");
axios.get("http://localhost:3000/spots?id=" + id).
    then(res => {
        spot = [...res.data];
        pre_detail.innerText = JSON.stringify(spot[0], undefined, 2);
    });