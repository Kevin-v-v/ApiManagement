var nextPage = "";
var lastPage = "";
var currentApiURL = "";

function next() {
    currentApiURL = nextPage;
    getApiData();
    debugger;
}

function back() {
    currentApiURL = lastPage;
    getApiData();
}

function search() {
    currentApiURL = "https://rickandmortyapi.com/api/character";
    getApiData();
}
function getApiData() {
    document.getElementById("results").innerHTML = "";
    var data = undefined;
    var request = new XMLHttpRequest();
    request.open("GET", currentApiURL, true);
    request.send();

    request.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            debugger;
            var resultRawData = this.response;
            data = JSON.parse(resultRawData);
            showApiData(data);
        }
    };
}

function showApiData(data) {
    var element = document.getElementById("results");
    var counter = document.createElement("h4");
    counter.style.color = "blue";
    counter.innerHTML = "Cantidad de personajes encontrados: " + data.info.count;
    element.appendChild(counter);

    for (var i = 0; i < data.results.length; i++) {
        var currentItem = data.results[i];
        var personaje = document.createElement("h5");
        personaje.innerHTML =
            '<image class="rounded float-left" height="120" src=" ' +
            currentItem.image +
            '"></image>';
        personaje.style.color = "blue";
        var htmlStyle = "<hr/ ><strong>" + currentItem.name + "</strong><br />";
        htmlStyle += "Status: " + currentItem.status;
        htmlStyle += "<br /> Gender: " + currentItem.gender;
        htmlStyle += "<br /> Location: " + currentItem.location.name + "<br />";
        personaje.innerHTML += htmlStyle;
        document.getElementById("results").appendChild(personaje);
    }

    if (data.info.next != null) {
        document.getElementById("buttonNext").style.display = "inline";
        nextPage = data.info.next;
    } else {
        document.getElementById("buttonNext").style.display = "none";
    }

    if (data.info.prev != null) {
        document.getElementById("buttonBack").style.display = "inline";
        lastPage = data.info.prev;
    } else {
        document.getElementById("buttonBack").style.display = "none";
    }
}
