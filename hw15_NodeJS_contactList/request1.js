let dir_sor_by_id = true;
let dir_sor_by_fio = true;
let dir_sor_by_addr = true;
let num_rows_per_page = 5;  //Это значение нужно передавать на сервер при запросе

let pointer_sort = 0;
const pointer_sort_obj = {
    "non" : 0,
    "id_up": 1,
    "id_dn": 2,
    "name_up": 3,
    "name_dn": 4,
    "address_up": 5,
    "address_dn": 6,

}
//когда полностью загрузится документ то вывовется функция отобразивть всех конктатов
document.onload = requestall()
//мгновенный поиск при вводе имени или номера
document.getElementById('inputstring').oninput = function() {
    requestnumber()
}
function requestall() {
    let req = new XMLHttpRequest();
    req.open('GET', 'http://localhost:3000/api/allusers', true); //3000 сервер back-end
    req.send(11212);

    req.onreadystatechange = () => {
        if (req.readyState != 4) return;

        if (req.status != 200) {
            console.log(req.status +": "+ req.statusText); 
        } else {
            // console.log(req.responseText);
            display_elements(req.responseText);

        }
    }
    pointer_sort = 0;
    document.getElementById('inputstring').value =''
}
function request(num) {
    let req = new XMLHttpRequest();
    req.open('GET', `http://localhost:3000/api/user/${num}`, true); //3000 сервер back-end
    // req.setRequestHeader("User-Agent", "XMLHttpRequest");
    req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    req.send(num);

    req.onreadystatechange = () => {
        if (req.readyState != 4) return;

        if (req.status != 200) {
            console.log(req.status +": "+ req.statusText); 
        } else {
            display_elements(req.responseText);
        }
    }
}
function requestnumber() {
    let req = new XMLHttpRequest();
        
    let l = document.getElementById("inputstring");
    req.open('GET', `http://localhost:3000/api/user/${l.value}`, true); //3000 сервер back-end
    // req.setRequestHeader("User-Agent", "XMLHttpRequest");
    req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    req.send(l.value);

    req.onreadystatechange = () => {
        if (req.readyState != 4) return;

        if (req.status != 200) {
            console.log(req.status +": "+ req.statusText); 
        } else {
            display_elements(req.responseText);            
        }
    }
}
function sortbyfio(){
    let req = new XMLHttpRequest();
    if (dir_sor_by_fio) {
        dir_sor_by_fio = !dir_sor_by_fio
        req.open('GET', 'http://localhost:3000/api/sortfio/up', true);
        pointer_sort = pointer_sort_obj.name_up;
    } else {
        dir_sor_by_fio = !dir_sor_by_fio
        req.open('GET', 'http://localhost:3000/api/sortfio/dn', true);
        pointer_sort = pointer_sort_obj.name_dn;
    }
    req.send();
    req.onreadystatechange = () => {
        if (req.readyState != 4) return;

        if (req.status != 200) {
            console.log(req.status +": "+ req.statusText); 
        } else {
            display_elements(req.responseText);
        }
    }
    
}
function sortbytown(){
    let req = new XMLHttpRequest();
    req.open('GET', 'http://localhost:3000/api/sorttown', true);
    req.send();
    req.onreadystatechange = () => {
        if (req.readyState != 4) return;

        if (req.status != 200) {
            console.log(req.status +": "+ req.statusText); 
        } else {
            display_elements(req.responseText);
        }
    }
    pointer_sort = pointer_sort_obj.address_up
}
function sortbyid(){
    let req = new XMLHttpRequest();
    if (dir_sor_by_id) {
        dir_sor_by_id = !dir_sor_by_id
        req.open('GET', 'http://localhost:3000/api/sortid/up', true);
        pointer_sort = pointer_sort_obj.id_up;
    } else {
        dir_sor_by_id = !dir_sor_by_id
        req.open('GET', 'http://localhost:3000/api/sortid/dn', true);
        pointer_sort = pointer_sort_obj.id_dn;
    }
    req.send();
    req.onreadystatechange = () => {
        if (req.readyState != 4) return;

        if (req.status != 200) {
            console.log(req.status +": "+ req.statusText); 
        } else {
            display_elements(req.responseText);
        }
    }
}
function deleteall(){
    let req = new XMLHttpRequest();
    req.open('DELETE', 'http://localhost:3000/api/allusers', true);
    // req.setRequestHeader("User-Agent", "XMLHttpRequest");
    req.send(null);
    req.onreadystatechange = () => {
        if (req.readyState != 4) return;

        if (req.status != 200) {
            console.log(req.status +": "+ req.statusText); 
        } else {
            display_elements(req.responseText);
        }
    }
}
function deleteId(){
    let req = new XMLHttpRequest();
    req.open('DELETE', 'http://localhost:3000/api/userId', true);
    // req.setRequestHeader("User-Agent", "XMLHttpRequest");
    req.send(document.getElementById('user_id_delete').value);
    req.onreadystatechange = () => {
        if (req.readyState != 4) return;

        if (req.status != 200) {
            console.log(req.status +": "+ req.statusText); 
        } else {
            display_elements(req.responseText);
        }
        document.getElementById('user_id_delete').value = ''
    }
}
function deleteName(){
    let req = new XMLHttpRequest();
    req.open('DELETE', 'http://localhost:3000/api/userName', true);
    // req.setRequestHeader("User-Agent", "XMLHttpRequest");
    req.send(document.getElementById('user_name_delete').value);
    req.onreadystatechange = () => {
        if (req.readyState != 4) return;

        if (req.status != 200) {
            console.log(req.status +": "+ req.statusText); 
        } else {
            display_elements(req.responseText);
        }
        document.getElementById('user_name_delete').value = ''
    }
}
function adduser(){
    let req = new XMLHttpRequest();
    req.open('POST', 'http://localhost:3000/api/', true);
    // req.setRequestHeader("User-Agent", "XMLHttpRequest");
    req.send([JSON.stringify({
        id:5, 
        fio:  document.getElementById('user_name').value, 
        numb: document.getElementById('user_tel').value,
        addr: document.getElementById('user_addr').value, 
    })]);
    req.onreadystatechange = () => {
        if (req.readyState != 4) return;

        if (req.status != 200) {
            console.log(req.status +": "+ req.statusText); 
        } else {
            display_elements(req.responseText);
        }
        document.getElementById('inputstring').value = ''
    }
}
function pageRight() {
    let req = new XMLHttpRequest();
    req.open('GET', 'http://localhost:3000/api/nextPage', true); //3000 сервер back-end
    req.send(111);

    req.onreadystatechange = () => {
        if (req.readyState != 4) return;

        if (req.status != 200) {
            console.log(req.status +": "+ req.statusText); 
        } else {
            display_elements(req.responseText);
            // console.log(req.responseText);
        }
    }
    // pointer_sort = 0;
}
function pageLeft() {
    let req = new XMLHttpRequest();
    req.open('GET', 'http://localhost:3000/api/prevPage', true); //3000 сервер back-end
    req.send(112);

    req.onreadystatechange = () => {
        if (req.readyState != 4) return;

        if (req.status != 200) {
            console.log(req.status +": "+ req.statusText); 
        } else {
            display_elements(req.responseText);
        }
    }
    // pointer_sort = 0;
}

function display_elements(item) {
    // console.log(item)
    // console.log(`тип овета ${typeof(item)}`)
    let arr = JSON.parse(item)
    let params = arr.shift();
    console.log(params)
    console.log(arr)
    document.getElementById('pageNumber').innerHTML = "Страница " + (params.page + 1);
    document.getElementById('rowCount').innerHTML = "Записей " + params.rows;
    document.getElementById('pageCount').innerHTML = "Страниц " + params.pages;
   
    
    // console.log(`тип овета ${arr.length}`)
    // document.body.innerHTML = test;
    
    // document.getElementById('listt').innerText = (JSON.parse(item))[1].fio +" "+ (JSON.parse(item))[1].addr;   
    document.getElementById('listt').innerHTML=''
    let table = document.createElement('table');  table.id='table1';
    document.getElementById('listt').appendChild(table);

    //добавим первую строку. Заголовки таблицы
    let tr1= document.createElement('tr'); tr1.id = 'tr1';
    table.appendChild(tr1)
    let th1 =document.createElement('th'); th1.innerText = 'id'; th1.width=40; th1.id = 'th1'
    tr1.appendChild(th1);
    let th2 =document.createElement('th'); th2.innerText = 'Name';th2.width=200;  th2.id = 'th2'
    tr1.appendChild(th2);
    let th3 =document.createElement('th'); th3.innerText = 'tel';th3.width=150;  th3.id = 'th3'
    tr1.appendChild(th3);
    let th4 =document.createElement('th'); th4.innerText = 'addr';th4.width=200;  th4.id = 'th4'
    tr1.appendChild(th4);

    th1.onclick = sortbyid;
    th2.onclick = sortbyfio;
    th4.onclick = sortbytown;

    //перебираем массив 
    let index;
    for (index = 0; index < arr.length; index++) {
        const element = arr[index];
        
        //для каждого элемента массива создаем новую строку таблицы
        let tr = document.createElement('tr'); tr.id = `tr${index+2}`;
        table.appendChild(tr);
    
        if (element != undefined){
        //перебираем объект по ключам key
        for (const key in element) {
            if (Object.hasOwnProperty.call(element, key)) {
                const prop = element[key];

                //для каждого свойства создаем элемент td
                let td11 = document.createElement('td'); td11.id = 'td11';
                let trr = document.getElementById(`tr${index+2}`)
                trr.appendChild(td11);
                td11.innerHTML= prop;
            }
        }
        } else {
            //заполнение пустых строк на последей странице,
            // чтобы стрелки пагинации оставались всегда на своем месте
            let td = document.createElement('td'); td.innerHTML = (' - ');
            tr.appendChild(td); td.style = "color:white";
        }
    }


    // console.log(arr);
    // console.log((JSON.parse(item))[0]);
    th1.innerText = 'id '
    th2.innerText = 'name '
    th3.innerText = 'tel'
    th4.innerText = 'addr '
    switch (pointer_sort) {
        case 1:
            th1.innerText = 'id↓'
            break;
        case 2:
            th1.innerText = 'id↑'
            break;
        case 3:
            th2.innerText = 'name↓'
            break;
        case 4:
            th2.innerText = 'name↑'
            break;
        case 5:
            th4.innerText = 'addr↓'
            break;
    
            default:
            break;
    }
}