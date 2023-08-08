const http = require('http');
const fs = require('fs');
let usersarray = require('./users');
let viewTableRows = 5; // количество отображаемых строк
let user_aray_response = new Array (viewTableRows) //массив для хранения выборки (чтобы отобразить на одной странице)
let page = 0;  //текущая страница для отображения данных
let request_cnt = 0;
let pageNumberForCurrSelection;  //колчиество страниц для текущей выборки
let NumberForCurrSelection; //колчиество записей для текущей выборки
const mode_enum = {
    "none": 0,
    "requestAll": 1,
    "user": 2,
}
let mode = mode_enum.requestAll;
let modeParam;
let = users_temp_arr =[];  //массив для выборок

http.createServer((req, res) => {

    function sendResponse () {
            for (let i = 0; i < viewTableRows; i++) {
                user_aray_response[i] = users_temp_arr[i + page * viewTableRows];
            }
            NumberForCurrSelection = users_temp_arr.length;
            pageNumberForCurrSelection = Math.ceil(NumberForCurrSelection / viewTableRows);
            
            //добавим в ответ информацию о текущей странице, количестве записей и количестве страниц
            user_aray_response.unshift({ page: page, rows: NumberForCurrSelection, pages:pageNumberForCurrSelection })
            res.write(JSON.stringify(user_aray_response))
            res.end()
            user_aray_response = []
    }
    
    let data = ""
    request_cnt++;
    console.log(`URL: ${req.url} |  Method: ${req.method} | ReqCnt: ${request_cnt}`)

    if (req.method === 'GET') {
        // console.log('req.url.indexOf(/api/) ' + req.url.indexOf('/api/'))
        if (req.url.indexOf('/api/') == (-1)) {
            if (req.url === '/') {
                fs.readFile('./index.html', 'utf-8', (err, data) => {
                    if (err) { console.log(err); throw err }
                    // console.log('------- загружаем index.html');
                    res.setHeader('Content-type', 'text/html')
                    // console.log(data);
                    res.end(data);
                    return
                })
            } else {
                fs.readFile('./' + req.url, (err, data) => {
                    if (err) {
                        console.log(' - - - - -   ---   какая-то ошибка1')
                        console.log(err);
                        console.log(' - - - - -   ---   какая-то ошибка2')
                        // throw err
                    };
                    // console.log('------- загружаем ресурсы ' + req.url);
                    res.end(data);
                    return;
                })
            }
        } else {
            if (req.url === '/api/allusers') {
                mode = mode_enum.requestAll;
                page = 0;
                users_temp_arr = [];
            }
            if (req.url === '/api/nextPage') {
                if (page < pageNumberForCurrSelection - 1) page++;

            }
            if (req.url === '/api/prevPage') {
                if (page > 0) page--;
            }
            if (req.url.indexOf('/api/user/') > (-1)) {  //проверяю что после /user/ указан параметр

                if (req.url.indexOf('/', 10) > (-1)) {  //защита от символа слэша в параметре
                    res.end('указан неверный парметр')
                    return
                }
                mode = mode_enum.user; // устанавливаем режим выборки по имени пользователя или его id
                modeParam = req.url.slice(10);
                page = 0;
                users_temp_arr = [];
            }
            if ((req.url === '/api/sortfio/up') || ((req.url === '/api/sortfio/dn'))) {
                if (req.url.indexOf('dn') > 0) {
                    users_temp_arr.sort((a, b) => {
                        if (a.fio > b.fio) return -1;
                        if (a.fio < b.fio) return 1;
                    })
                }
                if (req.url.indexOf('up') > 0) {
                    users_temp_arr.sort((a, b) => {
                        if (a.fio > b.fio) return 1;
                        if (a.fio < b.fio) return -1;
                    })

                }
            }
            if (req.url === '/api/sorttown') {
                users_temp_arr.sort((a, b) => {
                    if (a.addr > b.addr) return 1;
                    if (a.addr < b.addr) return -1;
                })
            }
            if ((req.url === '/api/sortid/up') || ((req.url === '/api/sortid/dn'))) {
                if (req.url.indexOf('dn') > 0) {
                    users_temp_arr.sort((a, b) => {
                        if (a.id > b.id) return -1;
                        if (a.id < b.id) return 1;
                    })
                }
                if (req.url.indexOf('up') > 0) {
                    users_temp_arr.sort((a, b) => {
                        if (a.id > b.id) return 1;
                        if (a.id < b.id) return -1;
                    })
                }
                page = 0;
            }

            switch (mode) {
                case mode_enum.requestAll:
                    for (let i = 0; i < usersarray.length; i++) { users_temp_arr[i] = usersarray[i]; }
                    break;
                case mode_enum.user:
                    // TODO
                    // не работает поиск строки с пробелом между словами
                    users_temp_arr = [];
                    usersarray.forEach((element) => {
                        if (isNumeric(modeParam)) {
                            if (modeParam == element.id) {
                                users_temp_arr.push(element);
                            }
                        } else {
                            if ( element.fio.toLowerCase().indexOf(modeParam) >= 0) {
                                users_temp_arr.push(element);
                            }
                        }
                    })
                    break;
                default:
                    break;
            }
            mode = mode_enum.none;

            sendResponse();
        }
    }

    if (req.method === 'DELETE') {
        users_temp_arr = [];
        req.on('data', (chunk) => {
            data += chunk;
        })
        req.on('end', () => {
            if (req.url === '/api/userId') {
                deleteUserById(data);
                console.log('Удаляем id ' + data)
                for (let i = 0; i < usersarray.length; i++) { users_temp_arr[i] = usersarray[i]; }
            }

            if (req.url === '/api/userName') {
                deleteUserByName(data);
                console.log('Удаляем по имени ' + data)
                for (let i = 0; i < usersarray.length; i++) { users_temp_arr[i] = usersarray[i]; }
            }

            if (req.url === '/api/allusers') {
                usersarray = []
            }
            sendResponse();
        })
       
    }
    if (req.method === 'POST') {
        req.on('data', (chunk) => {
            data += chunk;
        });
        req.on('end', () => {
            let us = JSON.parse(data);
            usersarray.push({ id: find_number(usersarray), fio: us.fio, numb: us.numb, addr: us.addr })
            for (let i = 0; i < usersarray.length; i++) { users_temp_arr[i] = usersarray[i]; }  
            sendResponse();
        })
    }

}).listen(3000);


//проверка на число
function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

//поиск пропущенного индекса в массиве, если пропущенных нет, то возвращает новый максимальный элемент
function find_number(arr) {
    let array_index = [];
    arr.map((elem) => {
        array_index.push(elem.id);
    })

    let i;
    for (i = 1; i < array_index.length + 1; i++) {
        if (array_index.indexOf(i) < 0) break;
    }
    console.log(`добавляем элемент №${i}`)
    return i
}

//удаление из основного массива по Id
function deleteUserById(num) {
    usersarray.forEach((elem, i, arr) => {
        if (num == elem.id) {
            arr.splice(i, 1);
        }
    })
}
//удаление из основного массива по Name
function deleteUserByName(fio) {
    usersarray.forEach((elem, i, arr) => {
        if (fio == elem.fio) {
            arr.splice(i, 1);
        }
    })
}