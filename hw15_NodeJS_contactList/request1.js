function requestall() {
    let req = new XMLHttpRequest();
    req.open('GET', 'http://localhost:3000/allusers', true); //3000 сервер back-end
    req.send(11212);

    req.onreadystatechange = () => {
        if (req.readyState != 4) return;

        if (req.status != 200) {
            console.log(req.status +": "+ req.statusText); 
        } else {
            console.log(req.responseText);
        }
    }
}
function request(num) {
    let req = new XMLHttpRequest();
    req.open('GET', `http://localhost:3000/user/${num}`, true); //3000 сервер back-end
    // req.setRequestHeader("User-Agent", "XMLHttpRequest");
    req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    req.send(num);

    req.onreadystatechange = () => {
        if (req.readyState != 4) return;

        if (req.status != 200) {
            console.log(req.status +": "+ req.statusText); 
        } else {
            console.log(req.responseText);
        }
    }
}

function requestnumber() {
    let req = new XMLHttpRequest();
    
    
    let l = document.getElementById("inputstring");
    req.open('GET', `http://localhost:3000/user/${l.value}`, true); //3000 сервер back-end
    // req.setRequestHeader("User-Agent", "XMLHttpRequest");
    req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    req.send(l.value);

    req.onreadystatechange = () => {
        if (req.readyState != 4) return;

        if (req.status != 200) {
            console.log(req.status +": "+ req.statusText); 
        } else {
            console.log(req.responseText);
        }
    }
}

function sortbyfio(){
    let req = new XMLHttpRequest();
    req.open('GET', 'http://localhost:3000/sortfio', true);
    req.send();
    req.onreadystatechange = () => {
        if (req.readyState != 4) return;

        if (req.status != 200) {
            console.log(req.status +": "+ req.statusText); 
        } else {
            console.log(req.responseText);
        }
    }
}
function sortbytown(){
    let req = new XMLHttpRequest();
    req.open('GET', 'http://localhost:3000/sorttown', true);
    req.send();
    req.onreadystatechange = () => {
        if (req.readyState != 4) return;

        if (req.status != 200) {
            console.log(req.status +": "+ req.statusText); 
        } else {
            console.log(req.responseText);
        }
    }
}

function sortbyid(){
    let req = new XMLHttpRequest();
    req.open('GET', 'http://localhost:3000/sortid', true);
    req.send();
    req.onreadystatechange = () => {
        if (req.readyState != 4) return;

        if (req.status != 200) {
            console.log(req.status +": "+ req.statusText); 
        } else {
            console.log(req.responseText);
        }
    }
}


function deleteall(){
    let req = new XMLHttpRequest();
    req.open('DELETE', 'http://localhost:3000/allusers', true);
    // req.setRequestHeader("User-Agent", "XMLHttpRequest");
    req.send(null);
    req.onreadystatechange = () => {
        if (req.readyState != 4) return;

        if (req.status != 200) {
            console.log(req.status +": "+ req.statusText); 
        } else {
            console.log(req.responseText);
        }
    }
}
