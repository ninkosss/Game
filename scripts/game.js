var myCar;

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 480;
        this.canvas.height = 270;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    update : function() {
        this.clear();
        myCar.update();
    }
}

class Car {
    constructor(width, height, color, x, y) {
        this.width = width;
        this.height = height;
        this.color = color;
        this.x = x;
        this.y = y;
        this.speed = 0;
        this.angle = 0;
        this.maxSpeed = 3;
        this.acceleration = 0.1;
        this.friction = 0.05;
    }

    update() {
        const ctx = myGameArea.context;
        
        // Застосовуємо фрикцію
        this.speed *= (1 - this.friction);
        
        // Обмежуємо швидкість
        if (this.speed > this.maxSpeed) this.speed = this.maxSpeed;
        if (this.speed < -this.maxSpeed) this.speed = -this.maxSpeed;
        
        // Рухаємо машинку
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;
        
        // Обмежуємо межі екрану
        if (this.x < 0) this.x = 0;
        if (this.x > myGameArea.canvas.width - this.width) this.x = myGameArea.canvas.width - this.width;
        if (this.y < 0) this.y = 0;
        if (this.y > myGameArea.canvas.height - this.height) this.y = myGameArea.canvas.height - this.height;
        
        // Зберігаємо поточний стан контексту
        ctx.save();
        
        // Переміщуємо початок координат до центру машинки
        ctx.translate(this.x + this.width/2, this.y + this.height/2);
        
        // Повертаємо машинку відповідно до кута
        ctx.rotate(this.angle);
        
        // Малюємо кузов машинки
        ctx.fillStyle = this.color;
        ctx.fillRect(-this.width/2, -this.height/2, this.width, this.height);
        
        // Малюємо вікна
        ctx.fillStyle = "#87CEEB";
        ctx.fillRect(-this.width/2 + 5, -this.height/2 + 3, this.width - 10, this.height - 6);
        
        // Малюємо колеса
        ctx.fillStyle = "#333";
        ctx.fillRect(-this.width/2 - 2, -this.height/2 - 2, 4, 4);
        ctx.fillRect(this.width/2 - 2, -this.height/2 - 2, 4, 4);
        ctx.fillRect(-this.width/2 - 2, this.height/2 - 2, 4, 4);
        ctx.fillRect(this.width/2 - 2, this.height/2 - 2, 4, 4);
        
        // Відновлюємо стан контексту
        ctx.restore();
    }
    
    accelerate() {
        this.speed += this.acceleration;
    }
    
    brake() {
        this.speed -= this.acceleration;
    }
    
    turnLeft() {
        this.angle -= 0.1;
    }
    
    turnRight() {
        this.angle += 0.1;
    }
    
    honk() {
        // Створюємо звук клаксона за допомогою Web Audio API
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            // Підключаємо осцилятор до гейн-ноди
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            // Налаштовуємо звук клаксона
            oscillator.frequency.setValueAtTime(800, audioContext.currentTime); // Висока частота
            oscillator.frequency.setValueAtTime(600, audioContext.currentTime + 0.1); // Знижуємо
            oscillator.frequency.setValueAtTime(400, audioContext.currentTime + 0.2); // Ще нижче
            
            // Налаштовуємо гучність
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
            
            // Налаштовуємо тип хвилі (пилкоподібна для різкого звуку)
            oscillator.type = 'sawtooth';
            
            // Відтворюємо звук
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.3);
            
        } catch (error) {
            console.log('Не вдалося відтворити звук клаксона:', error);
            // Альтернативний спосіб - використання системного звуку через alert (тихий)
            // alert('\u0007'); // Системний звук (працює не завжди)
        }
    }
}

// Система керування автомобілем
const keys = {
    up: false,
    down: false,
    left: false,
    right: false,
    honk: false
};

document.addEventListener('keydown', (event) => {
    switch(event.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
            keys.up = true;
            break;
        case 'ArrowDown':
        case 's':
        case 'S':
            keys.down = true;
            break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
            keys.left = true;
            break;
        case 'ArrowRight':
        case 'd':
        case 'D':
            keys.right = true;
            break;
        case ' ':
        case 'h':
        case 'H':
            if (!keys.honk) {
                keys.honk = true;
                myCar.honk();
            }
            break;
    }
});

document.addEventListener('keyup', (event) => {
    switch(event.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
            keys.up = false;
            break;
        case 'ArrowDown':
        case 's':
        case 'S':
            keys.down = false;
            break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
            keys.left = false;
            break;
        case 'ArrowRight':
        case 'd':
        case 'D':
            keys.right = false;
            break;
        case ' ':
        case 'h':
        case 'H':
            keys.honk = false;
            break;
    }
});

// Головний цикл гри
function gameLoop() {
    // Обробляємо натиснуті клавіші
    if (keys.up) {
        myCar.accelerate();
    }
    if (keys.down) {
        myCar.brake();
    }
    if (keys.left) {
        myCar.turnLeft();
    }
    if (keys.right) {
        myCar.turnRight();
    }
    
    // Оновлюємо гру
    myGameArea.update();
    
    // Запускаємо наступний кадр
    requestAnimationFrame(gameLoop);
}

// Запускаємо ігровий цикл
window.onload = () => {
    myGameArea.start();
    myCar = new Car(40, 20, "red", 240, 200);
    gameLoop();
}