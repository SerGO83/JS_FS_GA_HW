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

//входное (основное) меню
inquirer
    .prompt([{
        type:'list',
        name: 'choose',
        message: 'Ваш выбор',
        choices: ['Показать список заметок', 'Создать новую заметку', 'Изменить']
    }
])
    .then((ans)=> {
        if (ans.choose === 'Показать список заметок') {
            fs.readdir('./tasks', (err,files)=> {  //считываем каталог файлов в папке tasks
                if (err) throw err;
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
                        let data = fs.readFileSync(`./tasks/${file_name}`, "utf-8");
                        console.log(data)  //отображаем содержимое заметки
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
            })
        }
        if (ans.choose === 'Создать новую заметку') {
            console.log('Создание новой заметки')
            inquirer
                .prompt(qustion_new_task)
                .then((ans)=>{
                    console.log(ans)
                    fs.writeFileSync(`./tasks/${ans.new_task}`, ans.new_task_1);
                })
        }
    })
