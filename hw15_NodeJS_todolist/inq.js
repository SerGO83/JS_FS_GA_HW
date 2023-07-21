import inquirer from 'inquirer';
import fs from 'fs';

const qustion_new_task = [  //два последовательных вопроса при создании заметки
    {
        type: 'input',
        name: 'new_task',
        message: 'Название заметки'
    },
    {
        type: 'input',
        name: 'new_task_1',
        message: 'Содержание заметки'
    }
]

function readfile(filename) {
    let data;
    try{
    data = fs.readFileSync(filename, "utf-8"); 
    return data
    } catch (err) {
        console.log('!!!   ----    Ошибка. Невозможно открыть файл. Возможно он удалился   ----   !!!');
        // console.log(err.message);
    }
}

//входное (основное) меню
inquirer
    .prompt([{
        type:'list',
        name: 'choose',
        message: 'Ваш выбор',
        choices: ['Показать список заметок', 'Создать новую заметку', 'Выход']
    }
])
    .then((ans)=> {
        if (ans.choose === 'Показать список заметок') {
            fs.access('./tasks', (err)=>{
                if (err) 
                {
                    console.log("Нет папки tasks")
                } else {
                    fs.readdir('./tasks', (err,files)=> {  //считываем каталог файлов в папке tasks
                        if (err) 
                        { 
                            console.log('Пропала папка с записками');
                            // throw err;
                        } else 
                        {
                            // console.log(files);
                            inquirer            //формируем новое меню из списка файлов
                                .prompt([{
                                    type:'list',
                                    name:'filename',
                                    message:'Выберите заметку',
                                    choices:files
                                }])
                                .then((ans)=>{  //выбрали какой-то файл/заметку
                                    console.log(`выбрана заметка ${ans.filename}`)
                                    let file_name = ans.filename
            //                        let data = fs.readFileSync(`./tasks/${file_name}`, "utf-8");
                                    let data = readfile(`./tasks/${file_name}`);
                                    if (data) {console.log(data)}  //отображаем содержимое заметки
                                    inquirer
                                        .prompt([{
                                            type:'list',
                                            name:'task_choose',
                                            message:'Что делаем с заметкой?',
                                            choices:['Ничего. Выход из программы', 'Удаляем', 'изменяем']
                                        }])
                                        .then((ans)=>{
                                            if (ans.task_choose==='Удаляем') {
                                            fs.unlinkSync(`./tasks/${file_name}`) 
                                            }
                                            if (ans.task_choose==='изменяем') {
                                                inquirer
                                                    .prompt([{type:'input', name:'edit_task',message:'Введите новое содержание заметки'}])
                                                    .then((ans)=>{fs.writeFileSync(`./tasks/${file_name}`, ans.edit_task)})
                                            }
                                        })
                                })
                        }
                })
    
            }
            })
        }
        if (ans.choose === 'Создать новую заметку') {
            console.log('Создание новой заметки')
            inquirer
                .prompt(qustion_new_task)
                .then((ans)=>{
                    let newFileName = ans.new_task;
                    let newFileContent = ans.new_task_1;
                    fs.access('./tasks', (err)=>{
                        if (err) {
                            console.log('!!!   ---   Пропала связь с папкой tasks    ---   !!!')
                            console.log('!!!   ---        заметка не создалась       ---   !!!')
                        } else {
                            fs.access(`./tasks/${newFileName}`, (err)=>{
                                // console.log(err);
                                if (!err) {
                                    inquirer
                                        .prompt([
                                            {
                                                type: 'expand',
                                                message: 'Такая заметка уже есть. Будем перезаписывать? (y/n)',
                                                name: 'overwrite',
                                                choices: [
                                                    {
                                                        key: 'y',
                                                        name: 'Перезаписываем',
                                                        value: 'overwrite'
                                                    },
                                                    {
                                                        key: 'n',
                                                        name: 'Отмена',
                                                        value: 'no_overwrite'
                                                    }
                                                ]
                                            }
                                        ])
                                        .then((ans)=>{
                                            if (ans.overwrite == 'overwrite') {
                                                console.log("step 1");
                                                fs.writeFileSync(`./tasks/${newFileName}`, newFileContent, 'utf-8');                                                
                                            }
                                        })

                                } else {
                                    console.log("Создана новая запись");
                                    fs.writeFileSync(`./tasks/${newFileName}`, newFileContent);
                                }
                            })
                        }
                    })
                })
        }
    })
