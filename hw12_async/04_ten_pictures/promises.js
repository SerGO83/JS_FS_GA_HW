'use strict'
//Функция-промис загрузки изображения
function loadImage(url){
    let promise = new Promise(function (resolve, reject)  {
        let image = new Image();
        image.src = url
        image.onload =  function(){resolve(image)};
        image.onerror = function(){reject(88)};
    })
    return promise
}

// вариант 1. Картинки могут загружаться в произвольном порядке
let prom1;
for (let index = 1; index < 6; index++) {
    prom1 = loadImage('images/user0'+index+'.jpg')
    prom1.then (
        function(image){
            let pole = document.getElementById('images1');
            pole.append(image);
        },
        function(){
            let pole = document.getElementById('images1');
            let img1 = document.createElement('img');
            img1.src = "images/no photo.jpg"
            pole.append(img1);
        }
    )
}

//вариант 2. Картинки загружаются в последовательном порядке
let arrayImages = new Array;
for (let index = 0; index < 10; index++) {
    arrayImages.push(loadImage('images/10'+index+'.png'));
}
Promise.allSettled(arrayImages)
.then (function(res){
    console.log(res)
    for (let index = 0; index < res.length; index++) {
        console.log(res[index]);
        let pole = document.getElementById('images2')
        if (res[index].status=='fulfilled') {
            pole.append(res[index].value)            
        } else {
            let img1 = new Image;
            img1.src = "images/question.png"
            pole.append(img1);
        }

    }
})

