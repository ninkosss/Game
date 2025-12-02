const url = "https://picsum.photos/300/300"; // це URL ресурсу, що по запиту повертає випадкову картинку
const div = document.getElementById("div");
const btn = document.getElementById("btn");

// отримати картинку асинхронно з сайту "https://picsum.photos/300/300"
const getPicFromAPI = async (obj) => {
    // Цей блок намагається виконати код всередині, або показати помилку
    try { 
        // в змінну response запишеться відповідь віддаленого сервера
        const response = await fetch(url);

        console.log(response); // Подивіться в консоль, що там приходить
        console.log(response.url); // нас цікавить саме url

        if (!response.ok) {
            // якщо сервер відповів з кодом помилки (наприклад, 404, 500)
            // пишемо в консоль помилку
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        // встановлюємо отриману картинку
        obj.src = response.url;
    } catch (error) {
        console.error('Помилка при завантаженні зображення:', error);
    } 
};

// функція що додає картинку
const addPic = () => {

    let img;

    if(div.childElementCount === 0){
        img = document.createElement('img');
    }
    else{
        img = div.childNodes[0];
    }

    div.appendChild(img);
    img.src = './images/1.jpg';

    // а тепер викликаємо нашу асинхронну функцію
    getPicFromAPI(img);
}

// обробник подій для кнопки 
btn.addEventListener( 'click', addPic);