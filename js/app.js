window.addEventListener('load', function () {
	const canvas = document.getElementById("canvas");
	const body = document.getElementById("body");
	var x; //position
	var y; //position
	var w;//ширина окна
	var h;//высота окна
	var countStars = 110; //количество звезд
	var t = 20; //скорростьобновления экрана
	var s = 0.3//скорость шариков
	function resize() {
		canvas.width = window.innerWidth; //разрешение канваса
		canvas.height = window.innerHeight;
		w = canvas.width;//ширина canvas
		h = canvas.height;//высота
	}
	resize();
	window.addEventListener("resize", resize);
	var ctx = canvas.getContext("2d");
	var stars = new Array(countStars)
	// Обновляем холст через 0.02 секунды
	setTimeout(drawFrame, t);

	//объект звезды
	function Star() {
		this.x = getRandomInt(5, w - 5);
		this.y = getRandomInt(5, h - 5);
		this.vx = getRandomInRange(-s, s);
		this.vy = getRandomInRange(-s, s);
		this.radius = getRandomInt(1, 2);
		this.color = 'white';
		this.connected = false;
	}

	//создание звезд
	function makeStars() {
		for (var i = 0; i < countStars; i++) {
			stars[i] = new Star();
		}
	}
	//отрисовка фона
	function drawBgc() {
		if (canvas.getContext) {
			ctx.beginPath();
			ctx.fillStyle = "#010103";
			ctx.fillRect(0, 0, w, h);
			ctx.closePath();
		}
	}
	function drawFrame() {
		// Очистить холст
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		drawBgc();
		// Перебираем все звезды
		for (var i = 0; i < stars.length; i++) {
			// Перемещаем каждый мячик в его новую позицию
			var star = stars[i];
			if (star.vx <= 0.0 && star.vx >= 0) {
				star.vx = getRandomInRange(-s, s);
			}
			if (star.vy <= 0.0 && star.vy >= 0) {
				star.vy = getRandomInRange(-s, s);
			}
			star.x += star.vx;
			star.y += star.vy;
			if (star.x + star.vx > w - star.radius || star.x + star.vx < star.radius) {
				star.vx = -star.vx;
			}
			if (star.y + star.vy > h - star.radius || star.y + star.vy < star.radius) {
				star.vy = -star.vy;
			}
			// // Проверяем соединительные линии
			if (star.connected) {
				//проходим по всем точкам и находим ближайшие - соединяемся
				for (var j = 0; j < stars.length; j++) {
					let zxc = Math.sqrt(((stars[i].x - stars[j].x) ** 2) + ((stars[i].y - stars[j].y) ** 2))
					if (zxc <= 180) {
						ctx.beginPath();
						ctx.strokeStyle = star.color;
						ctx.moveTo(stars[i].x, stars[i].y);
						ctx.lineTo(stars[j].x, stars[j].y);
						ctx.stroke();
						ctx.closePath();
					}
				}
			}
			else {
				ctx.beginPath();
				ctx.fillStyle = star.color;
				ctx.closePath();
			}
			ctx.beginPath();
			// Рисуем звезду
			ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
			ctx.lineWidth = 0.08;
			ctx.fill();
			ctx.stroke();
			ctx.closePath();
		}

		// Рисуем следующий кадр через 20 миллисекунд
		setTimeout(drawFrame, t);
	}
	makeStars();
	body.addEventListener('mousemove', function (e) {
		let xAxis = ((e.pageX));
		let yAxis = ((e.pageY));
		for (var i = 0; i < stars.length; i++) {
			let zxc = Math.sqrt(((xAxis - stars[i].x) ** 2) + ((yAxis - stars[i].y) ** 2));
			if (zxc <= 200) { stars[i].connected = true; }
			else { stars[i].connected = false; }
		}
	});
	function getRandomInt(min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min)) + min;
	}
	function getRandomInRange(min, max) {
		return (Math.random() * (max - min + 0)) + min;
	}
})