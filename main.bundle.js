/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	const canvas = document.getElementById('game');
	const ctx = canvas.getContext('2d');
	const Game = __webpack_require__(1);
	const game = new Game(canvas, ctx, canvas.width, canvas.height);
	const startScreen = document.getElementById('start-screen');
	const level2Screen = document.getElementById('level2-screen');
	const level3Screen = document.getElementById('level3-screen');
	const winScreen = document.getElementById('win-screen');
	const pauseScreen = document.getElementById('pause-screen');
	const trumpty = document.getElementById('trumpty');
	const gameOverScreen = document.getElementById('gameover-screen');

	window.addEventListener('mousemove', setMousePosition, false);

	window.onload = function () {
	  startScreen.style.display = 'block';
	};

	window.addEventListener('click', function () {
	  startScreen.style.display = 'none';
	  new Game(ctx, canvas, canvas.width, canvas.height);
	  animate();
	});

	window.addEventListener('keydown', function (event) {
	  if (event.keyCode == 32) {
	    event.preventDefault();
	    pauseGame();
	  }
	});

	window.addEventListener('keydown', function (event) {
	  if (event.keyCode == 13) {
	    window.location.reload(true);
	  }
	});

	function animate() {
	  game.startGame();
	  game.context.clearRect(0, 0, game.canvas.width, game.canvas.height);
	  game.newBall.drawBall(game.context);
	  game.moveBall();
	  game.thePaddle.draw(game.context);
	  game.drawBricks();
	  game.newBall.paddleTouch(game.thePaddle);
	  game.player.drawIndicatorsText(game.context);
	  game.checkDeath();
	  game.brickCollision();
	  showCorrectScreen();
	  requestAnimationFrame(animate);
	}

	function pauseGame() {
	  game.isPaused = !game.isPaused;
	  if (game.isPaused) {
	    pauseScreen.style.display = 'block';
	  } else {
	    pauseScreen.style.display = 'none';
	  }
	}

	function setMousePosition(event) {
	  game.mouseX = event.clientX;
	  game.thePaddle.hoverPaddle(game.mouseX);
	}

	function showCorrectScreen() {
	  if (game.screen === true && game.level === 1) {
	    level2Screen.style.display = 'block';
	  } else if (game.screen === true && game.level === 2) {
	    level3Screen.style.display = 'block';
	  } else if (game.screen === true && game.level > 2) {
	    winScreen.style.display = 'block';
	    trumpty.classList.add('trumpty-animation');
	  } else if (game.gameOver === true) {
	    gameOverScreen.style.display = 'block';
	  } else if (game.screen === false) {
	    level2Screen.style.display = 'none';
	    level3Screen.style.display = 'none';
	    winScreen.style.display = 'none';
	  }
	}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	// class scripts
	const Player = __webpack_require__(2);
	const Ball = __webpack_require__(3);
	const Paddle = __webpack_require__(5);
	const Brick = __webpack_require__(6);
	const levelArray = __webpack_require__(7);

	module.exports = class Game {
	  constructor(canvas, context) {
	    this.canvas = canvas;
	    this.context = context;
	    this.newBall = new Ball(30, 300, 4.8, 5, 5, Math.PI * 2, false, 'green');
	    this.thePaddle = new Paddle(100, 500, 50, 10, 100, '#994e1b');
	    this.player = new Player(0, 3);
	    this.brick = new Brick();
	    this.brickArray = [];
	    this.gameCounter = 0;
	    this.level = 0;
	    this.mouseX = 0;
	    this.isPaused = true;
	    this.screen = false;
	    this.gameOver = false;
	  }

	  startGame() {
	    if (this.gameCounter === 0) {
	      this.buildBricks();
	      this.gameCounter++;
	    }
	  }

	  showLevelsScreen() {
	    if (this.level === 1) {
	      this.screen = true;
	      this.isPaused = true;
	      setTimeout(() => {
	        this.buildBricks();
	        this.screen = false;
	      }, 3000);
	    } else if (this.level === 2) {
	      this.screen = true;
	      this.isPaused = true;
	      setTimeout(() => {
	        this.buildBricks();
	        this.screen = false;
	      }, 3000);
	    } else if (this.level > 2) {
	      this.isPaused = true;
	      this.screen = true;
	    } else {
	      this.screen = false;
	    }
	  }

	  checkDeath() {
	    if (this.newBall.y + this.newBall.radius > 600) {
	      this.player.playerDie();
	      this.newBall.reset();
	      this.isPaused = true;
	    }
	    if (this.player.isDead === true) {
	      this.gameOver = true;
	    }
	  }

	  brickCollision() {
	    this.brickArray.forEach((brick, index) => {
	      if (brick.collisionDetection(this.newBall)) {
	        this.brickArray.splice(index, 1);
	        this.newBall.dy = -this.newBall.dy;
	        this.player.score += 50;
	        this.levelCheck();
	      }
	    });
	  }

	  moveBall() {
	    if (this.isPaused === false) {
	      this.newBall.move();
	    }
	  }

	  drawBricks() {
	    this.brickArray.forEach(brick => brick.draw(this.context));
	  }

	  buildBricks() {
	    if (this.brickArray.length === 0 && this.level < 3) {
	      levelArray[this.level].forEach(brick => {
	        this.brickArray.push(new Brick(brick.x, brick.y, brick.height, brick.width, brick.color));
	      });
	    }
	  }

	  levelCheck() {
	    if (this.brickArray.length === 0 & this.level < 3) {
	      this.newBall.reset();
	      this.level++;
	      this.showLevelsScreen();
	    }
	  }
	};

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	class Player {
	  constructor(score = 0, livesRemaining = 3) {
	    this.livesRemaining = livesRemaining;
	    this.wins = 0;
	    this.score = score;
	    this.isDead = false;
	  }

	  playerDie() {
	    let self = this;

	    if (self.livesRemaining <= 1) {
	      self.isDead = true;
	    } else {
	      self.livesRemaining--;
	    }
	    return self;
	  }

	  drawIndicatorsText(ctx) {
	    ctx.fillStyle = 'Black';
	    ctx.font = "20px Arial";
	    ctx.fillText("Lives: " + this.livesRemaining, 665, 580);
	    ctx.fillText('Score: ' + this.score, 10, 580);
	  }
	}

	module.exports = Player;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	var GamePieces = __webpack_require__(4);

	class Ball extends GamePieces {
	  constructor(x, y, dx, dy, color) {
	    super(x, y, color);
	    this.dx = dx;
	    this.dy = dy;
	    this.radius = 10;
	    this.color = color;
	  }

	  drawBall(ctx) {
	    ctx.fillStyle = '#ab810e';
	    ctx.beginPath();
	    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
	    ctx.strokeStyle = '#ab810e';
	    ctx.closePath();
	    ctx.fill();
	    return this;
	  }

	  move() {
	    this.x += this.dx;
	    this.y += this.dy;
	    if (this.x + this.radius > 750 || this.x - this.radius < 0) {
	      this.dx = -this.dx;
	    }

	    if (this.y - this.radius < 0) {
	      this.dy = -this.dy;
	    }

	    if (this.x <= 5) {
	      this.x = 6;
	    } else if (this.x >= 745) {
	      this.x = 744;
	    }

	    if (this.y <= 5) {
	      this.y = 6;
	    }
	    return this;
	  }

	  reset() {
	    this.x = 30;
	    this.y = 300;
	  }

	  paddleTouch(paddle) {
	    let p0 = paddle.x - 20;
	    let p20 = paddle.x + 35;
	    let p40 = paddle.x + 55;
	    let p60 = paddle.x + 75;
	    let p80 = paddle.x + 95;
	    let p100 = paddle.x + 155;

	    if (this.y + this.radius === paddle.y) {
	      if (this.x > p0 && this.x <= p20) {
	        this.dy = -this.dy;
	        this.dx = -7;
	      } else if (this.x > p20 && this.x <= p40) {
	        this.dy = -this.dy;
	        this.dx = -4.5;
	      } else if (this.x > p40 && this.x <= p60) {
	        this.dy = -this.dy;
	        this.dx = 0;
	      } else if (this.x > p60 && this.x <= p80) {
	        this.dy = -this.dy;
	        this.dx = 4.5;
	      } else if (this.x > p80 && this.x <= p100) {
	        this.dy = -this.dy;
	        this.dx = 7;
	      }
	    }
	  }
	}

	module.exports = Ball;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

	class GamePieces {
	  constructor(x, y, height, width, color) {
	    this.x = x;
	    this.y = y;
	    this.height = height;
	    this.width = width;
	    this.color = color;
	  }

	  draw(ctx) {
	    ctx.fillStyle = this.color;
	    ctx.fillRect(this.x, this.y, this.width, this.height, this.color);
	    return this;
	  }
	}

	module.exports = GamePieces;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	var GamePieces = __webpack_require__(4);

	class Paddle extends GamePieces {
	  constructor(x, y, dx, height, width, color) {
	    super(x, y, height, width, color);
	    this.dx = dx;
	  }

	  hoverPaddle(mouseX) {
	    this.x = mouseX - 600;
	    if (this.x <= 0) {
	      this.x = 0;
	    } else if (this.x + this.width >= 750) {
	      this.x = 750 - this.width;
	    }
	  }
	}

	module.exports = Paddle;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	var GamePieces = __webpack_require__(4);

	class Brick extends GamePieces {
	  constructor(x = 0, y = 0, height = 30, width = 100, color = 'blue') {
	    super(x, y, height, width, color);
	    return this;
	  }

	  collisionDetection(ball) {
	    if (ball.x + ball.radius > this.x && ball.x - ball.radius < this.x + this.width && ball.y + ball.radius > this.y && ball.y - ball.radius < this.y + this.height) {

	      return true;
	    }
	  }
	}

	module.exports = Brick;

/***/ }),
/* 7 */
/***/ (function(module, exports) {

	module.exports = [[{ x: 5, y: 2, width: 104, height: 30, color: '#b34700' }, { x: 112, y: 2, width: 104, height: 30, color: '#803300' }, { x: 219, y: 2, width: 104, height: 30, color: '#994d00' }, { x: 326, y: 2, width: 104, height: 30, color: '#993d00' }, { x: 433, y: 2, width: 104, height: 30, color: '#b34700' }, { x: 540, y: 2, width: 104, height: 30, color: '#994d00' }, { x: 648, y: 2, width: 97, height: 30, color: '#803300' }, { x: 5, y: 35, width: 50, height: 30, color: '#b34700' }, { x: 59, y: 35, width: 102, height: 30, color: '#994d00' }, { x: 164, y: 35, width: 102, height: 30, color: '#b34700' }, { x: 269, y: 35, width: 102, height: 30, color: '#993d00' }, { x: 374, y: 35, width: 102, height: 30, color: '#803300' }, { x: 479, y: 35, width: 102, height: 30, color: '#993d00' }, { x: 584, y: 35, width: 102, height: 30, color: '#994d00' }, { x: 689, y: 35, width: 55, height: 30, color: '#b34700' }, { x: 5, y: 68, width: 104, height: 30, color: '#b34700' }, { x: 112, y: 68, width: 104, height: 30, color: '#803300' }, { x: 219, y: 68, width: 104, height: 30, color: '#994d00' }, { x: 326, y: 68, width: 104, height: 30, color: '#993d00' }, { x: 433, y: 68, width: 104, height: 30, color: '#b34700' }, { x: 540, y: 68, width: 104, height: 30, color: '#994d00' }, { x: 648, y: 68, width: 97, height: 30, color: '#803300' }, { x: 5, y: 102, width: 50, height: 30, color: '#b34700' }, { x: 59, y: 102, width: 102, height: 30, color: '#994d00' }, { x: 164, y: 102, width: 102, height: 30, color: '#b34700' }, { x: 269, y: 102, width: 102, height: 30, color: '#993d00' }, { x: 374, y: 102, width: 102, height: 30, color: '#803300' }, { x: 479, y: 102, width: 102, height: 30, color: '#993d00' }, { x: 584, y: 102, width: 102, height: 30, color: '#994d00' }, { x: 689, y: 102, width: 55, height: 30, color: '#b34700' }], [{ x: 5, y: 2, width: 102, height: 30, color: '#b34700' }, { x: 112, y: 2, width: 102, height: 30, color: '#803300' }, { x: 219, y: 2, width: 102, height: 30, color: '#994d00' }, { x: 326, y: 2, width: 102, height: 30, color: '#993d00' }, { x: 433, y: 2, width: 102, height: 30, color: '#b34700' }, { x: 540, y: 2, width: 102, height: 30, color: '#994d00' }, { x: 648, y: 2, width: 97, height: 30, color: '#803300' }, { x: 5, y: 35, width: 50, height: 30, color: '#b34700' }, { x: 60, y: 35, width: 102, height: 30, color: '#994d00' }, { x: 168, y: 35, width: 102, height: 30, color: '#b34700' }, { x: 273, y: 35, width: 102, height: 30, color: '#993d00' }, { x: 378, y: 35, width: 102, height: 30, color: '#803300' }, { x: 483, y: 35, width: 102, height: 30, color: '#993d00' }, { x: 588, y: 35, width: 102, height: 30, color: '#994d00' }, { x: 693, y: 35, width: 50, height: 30, color: '#b34700' }, { x: 5, y: 68, width: 102, height: 30, color: '#b34700' }, { x: 112, y: 68, width: 102, height: 30, color: '#803300' }, { x: 219, y: 68, width: 102, height: 30, color: '#994d00' }, { x: 326, y: 68, width: 102, height: 30, color: '#993d00' }, { x: 433, y: 68, width: 102, height: 30, color: '#b34700' }, { x: 540, y: 68, width: 102, height: 30, color: '#994d00' }, { x: 648, y: 68, width: 97, height: 30, color: '#803300' }, { x: 5, y: 102, width: 50, height: 30, color: '#b34700' }, { x: 59, y: 102, width: 102, height: 30, color: '#994d00' }, { x: 164, y: 102, width: 102, height: 30, color: '#b34700' }, { x: 269, y: 102, width: 102, height: 30, color: '#993d00' }, { x: 374, y: 102, width: 102, height: 30, color: '#803300' }, { x: 479, y: 102, width: 102, height: 30, color: '#993d00' }, { x: 584, y: 102, width: 102, height: 30, color: '#994d00' }, { x: 689, y: 102, width: 55, height: 30, color: '#b34700' }, { x: 5, y: 136, width: 102, height: 30, color: '#b34700' }, { x: 112, y: 136, width: 102, height: 30, color: '#803300' }, { x: 219, y: 136, width: 102, height: 30, color: '#994d00' }, { x: 326, y: 136, width: 102, height: 30, color: '#993d00' }, { x: 433, y: 136, width: 102, height: 30, color: '#b34700' }, { x: 540, y: 136, width: 102, height: 30, color: '#994d00' }, { x: 648, y: 136, width: 97, height: 30, color: '#803300' }], [{ x: 3, y: 2, width: 70, height: 30, color: '#b34700' }, { x: 80, y: 2, width: 70, height: 30, color: '#803300' }, { x: 155, y: 2, width: 70, height: 30, color: '#994d00' }, { x: 230, y: 2, width: 70, height: 30, color: '#993d00' }, { x: 305, y: 2, width: 70, height: 30, color: '#b34700' }, { x: 380, y: 2, width: 70, height: 30, color: '#994d00' }, { x: 455, y: 2, width: 70, height: 30, color: '#803300' }, { x: 530, y: 2, width: 70, height: 30, color: '#994d00' }, { x: 605, y: 2, width: 70, height: 30, color: '#b34700' }, { x: 680, y: 2, width: 70, height: 30, color: '#993d00' }, { x: 2, y: 37, width: 15, height: 30, color: '#b34700' }, { x: 23, y: 37, width: 70, height: 30, color: '#803300' }, { x: 100, y: 37, width: 70, height: 30, color: '#993d00' }, { x: 175, y: 37, width: 70, height: 30, color: '#b34700' }, { x: 250, y: 37, width: 70, height: 30, color: '#994d00' }, { x: 325, y: 37, width: 70, height: 30, color: '#803300' }, { x: 400, y: 37, width: 70, height: 30, color: '#b34700' }, { x: 475, y: 37, width: 70, height: 30, color: '#993d00' }, { x: 550, y: 37, width: 70, height: 30, color: '#803300' }, { x: 625, y: 37, width: 70, height: 30, color: '#993d00' }, { x: 700, y: 37, width: 50, height: 30, color: '#b34700' }, { x: 3, y: 72, width: 70, height: 30, color: '#803300' }, { x: 80, y: 72, width: 70, height: 30, color: '#993d00' }, { x: 155, y: 72, width: 70, height: 30, color: '#b34700' }, { x: 230, y: 72, width: 70, height: 30, color: '#994d00' }, { x: 305, y: 72, width: 70, height: 30, color: '#803300' }, { x: 380, y: 72, width: 70, height: 30, color: '#b34700' }, { x: 455, y: 72, width: 70, height: 30, color: '#993d00' }, { x: 530, y: 72, width: 70, height: 30, color: '#803300' }, { x: 605, y: 72, width: 70, height: 30, color: '#993d00' }, { x: 680, y: 72, width: 70, height: 30, color: '#b34700' }, { x: 2, y: 108, width: 15, height: 30, color: '#b34700' }, { x: 23, y: 108, width: 70, height: 30, color: '#803300' }, { x: 100, y: 108, width: 70, height: 30, color: '#993d00' }, { x: 175, y: 108, width: 70, height: 30, color: '#b34700' }, { x: 250, y: 108, width: 70, height: 30, color: '#994d00' }, { x: 325, y: 108, width: 70, height: 30, color: '#803300' }, { x: 400, y: 108, width: 70, height: 30, color: '#b34700' }, { x: 475, y: 108, width: 70, height: 30, color: '#993d00' }, { x: 550, y: 108, width: 70, height: 30, color: '#803300' }, { x: 625, y: 108, width: 70, height: 30, color: '#993d00' }, { x: 700, y: 108, width: 50, height: 30, color: '#b34700' }, { x: 3, y: 142, width: 70, height: 30, color: '#803300' }, { x: 80, y: 142, width: 70, height: 30, color: '#993d00' }, { x: 155, y: 142, width: 70, height: 30, color: '#b34700' }, { x: 230, y: 142, width: 70, height: 30, color: '#994d00' }, { x: 305, y: 142, width: 70, height: 30, color: '#803300' }, { x: 380, y: 142, width: 70, height: 30, color: '#b34700' }, { x: 455, y: 142, width: 70, height: 30, color: '#993d00' }, { x: 530, y: 142, width: 70, height: 30, color: '#803300' }, { x: 605, y: 142, width: 70, height: 30, color: '#993d00' }, { x: 680, y: 142, width: 70, height: 30, color: '#b34700' }, { x: 2, y: 177, width: 15, height: 30, color: '#b34700' }, { x: 23, y: 177, width: 70, height: 30, color: '#803300' }, { x: 100, y: 177, width: 70, height: 30, color: '#993d00' }, { x: 175, y: 177, width: 70, height: 30, color: '#b34700' }, { x: 250, y: 177, width: 70, height: 30, color: '#994d00' }, { x: 325, y: 177, width: 70, height: 30, color: '#803300' }, { x: 400, y: 177, width: 70, height: 30, color: '#b34700' }, { x: 475, y: 177, width: 70, height: 30, color: '#993d00' }, { x: 550, y: 177, width: 70, height: 30, color: '#803300' }, { x: 625, y: 177, width: 70, height: 30, color: '#993d00' }, { x: 700, y: 177, width: 50, height: 30, color: '#b34700' }]];

/***/ })
/******/ ]);