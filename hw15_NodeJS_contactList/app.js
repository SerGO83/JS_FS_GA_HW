const http = require('http');

let users = [
    { id: 1, fio: "Ivanov", numb: "799655", addr: 'piter' },
    { id: 3, fio: "Samoilov", numb: "712355", addr: 'Магагадн' },
    { id: 2, fio: "Петров", numb: "794545", addr: 'Норильск' },
    { id: 21, fio: "Ivanov", numb: "11299655", addr: 'York' },
    { id: 4, fio: "Nikitina", numb: "765585", addr: 'Владивосто' },
    { id: 7, fio: "Samoilov", numb: "785547", addr: 'Marakesch' },
    { id: 5, fio: "Смирнова", numb: "785547", addr: 'Уганда' },
    { id: 6, fio: "Ivanov", numb: "4197632", addr: 'Town 1' },
]

http.createServer((req, res) => {
    let data = ""
    // req.on('data', (chunk) => { 
    //     // console.log(chunk);
    //     data += chunk;});
    // req.on('end', () => {
    //     // console.log("Данные: "+ data);
    //     // l.value = data;
    // })    
    console.log(`URL: ${req.url} |  Method: ${req.method}`)
    res.setHeader('Access-Control-Allow-Origin', '*'); //игнорируем ошибку CORS        

    if (req.method === 'GET') {
        if (req.url === '/allusers') {
            // users.map((el) => {
            //     res.write(JSON.stringify(el))
            // })
            res.write(JSON.stringify(users))
            res.end()
            return;
        }

        if (req.url.indexOf('/',('/user/').length) > (-1)) {  //"защита" от символа слэша в параметре
            res.end('указан неверный парметр')
            return;
        }

        if (req.url.indexOf('/user/') > (-1)) {  //проверяю что после /user/ указан параметр
            let contact = req.url.slice(6); //получаем параметр указанный после /user/
            //перебираем массив
            users.forEach(element => {
                //если параметр число то сравниваем по свойству id
                if (isNumeric(contact)) {
                    if (element.id == req.url.slice(6)) {
                        res.write(JSON.stringify(element))
                    }
                // иначе - по свойству fio
                } else {
                    if (element.fio == req.url.slice(6)) {
                        res.write(JSON.stringify(element))
                    }
                }
            });
        }

        if (req.url === '/sortfio') {
            users.sort( (a, b) => {
                if (a.fio > b.fio) return 1;
                if (a.fio < b.fio) return -1;
               })
               res.write(JSON.stringify(users))
        }

        if (req.url === '/sorttown') {
            users.sort( (a, b) => {
                if (a.addr > b.addr) return 1;
                if (a.addr < b.addr) return -1;
               })
               res.write(JSON.stringify(users))
        }

        if (req.url === '/sortid') {
            users.sort( (a, b) => {
                if (a.id > b.id) return 1;
                if (a.id < b.id) return -1;
               })
               res.write(JSON.stringify(users))
        }
    }

    if (req.method === 'DELETE') {
        if (req.url === '/allusers') {
            console.log('delete all users')
        }
    }
    res.end();
}).listen(3000);


//проверка на число
function isNumeric(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }