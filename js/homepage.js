
var spotList = [];
let spotArea = document.querySelector("div.spot-area");
axios.get("http://localhost:3000/spots").
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