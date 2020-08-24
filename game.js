const btnStart = document.getElementById('start')
const ligh_blue = document.getElementById('ligh_blue')
const violet = document.getElementById('violet')
const orange = document.getElementById('orange')
const green = document.getElementById('green')
const lastest_level = 10


class Game {
  constructor() {
    this.initialize = this.initialize.bind(this)
    this.initialize()
    this.generateSequence()
    setTimeout(() => {
      this.nextLevel()
    }, 500)
  }
  initialize() {
    this.nextLevel = this.nextLevel.bind(this)
    this.selectColor = this.selectColor.bind(this)
    this.toggleBtnStart()
    this.level = 1
    this.colors = {
      ligh_blue,
      violet,
      orange,
      green
    }
  }
  toggleBtnStart() {
    if (btnStart.classList.contains('hide')) {
      btnStart.classList.remove('hide')
    }
    else {
      btnStart.classList.add('hide')

    }
  }
  generateSequence() {
    this.sequence = new Array(10).fill(0).map(n => Math.floor(Math.random() * 4))
  }
  nextLevel() {
    this.subLevel = 0
    this.iluminateSequence()
    this.addEventsClick()
  }
  transformNumberToColor(number) {
    switch (number) {
      case 0:
        return 'ligh_blue'
      case 1:
        return 'violet'
      case 2:
        return 'orange'
      case 3:
        return 'green'
    }
  }
  transformColorToNumber(number) {
    switch (number) {
      case 'ligh_blue':
        return 0
      case 'violet':
        return 1
      case 'orange':
        return 2
      case 'green':
        return 3
    }
  }
  iluminateSequence() {
    for (let i = 0; i < this.level; i++) {
      const color = this.transformNumberToColor(this.sequence[i])
      console.log(color)
      setTimeout(() => this.iluminateColor(color), 1000 * i)
    }
  }
  iluminateColor(color) {
    this.colors[color].classList.add('light')
    setTimeout(() => this.turnOfColor(color), 350)
  }
  turnOfColor(color) {
    this.colors[color].classList.remove('light')
  }
  addEventsClick() {
    this.colors.ligh_blue.addEventListener('click', this.selectColor)
    this.colors.violet.addEventListener('click', this.selectColor)
    this.colors.orange.addEventListener('click', this.selectColor)
    this.colors.green.addEventListener('click', this.selectColor)
  }
  removeEventsClick() {
    this.colors.ligh_blue.removeEventListener('click', this.selectColor)
    this.colors.violet.removeEventListener('click', this.selectColor)
    this.colors.orange.removeEventListener('click', this.selectColor)
    this.colors.green.removeEventListener('click', this.selectColor)
  }
  selectColor(ev) {
    const nameColor = ev.target.dataset.color
    const numberColor = this.transformColorToNumber(nameColor)
    this.iluminateColor(nameColor)
    if (numberColor === this.sequence[this.subLevel]) {
      this.subLevel++
      if (this.subLevel === this.level) {
        this.level++
        this.removeEventsClick()
        if (this.level === (lastest_level + 1)) {
          this.winGame()
        } else {
          setTimeout(() => this.nextLevel(), 1000)
        }
      }
    } else {
      this.loseGame()
    }
  }
  winGame() {
    swal('Platzi', 'Congratulation win the game!!', 'success')
      .then(this.initialize)
  }
  loseGame() {
    swal('Platzi', 'Sorry you lose :(', 'error')
      .then(() => {
        this.removeEventsClick()
        this.initialize()
      })
  }
}

function startGame() {
  var game = new Game
}