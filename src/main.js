import './index.css'

const game = {
    dom: document.querySelector('.app'),
    answers: [],
    temp: [],
    tempIndex: [],
    checkNum: -1,
    counter: 0,
    numbers: 8,
    repeatedTime: 4,
    prepareTime: 3,
    init: function () {

        for (let i = 0; i < this.repeatedTime; i++) {
            for (let j = 0; j <= this.numbers; j++) {
                this.answers.push(j)
            }
        }

        this.answers = this.answers.sort(() => Math.random() - 0.5)

        document.querySelectorAll('.item').forEach((d, i) => {
            
            d.setAttribute('data-answer', this.answers[i])
            d.innerText = this.answers[i]
        })

        setTimeout(() => {
            document.querySelectorAll('.item').forEach((dom) => {
                dom.innerText = ''
                dom.addEventListener('click', () => {
                    this.clickDom(dom)
                })
            })
        }, this.prepareTime * 1000)
    },
    clickDom: function (dom) {
        const value = dom.getAttribute('data-answer')
        if (this.temp.indexOf(dom) != -1) return
        dom.innerText = value
        this.temp.push(dom)
        if (this.checkNum == -1) {
            this.checkNum = value
        } else {
            if (value != this.checkNum) {
                this.checkNum = -1
                this.temp.forEach((tdom) => {
                    tdom.classList.add('wrong')
                })
                setTimeout(() => {
                    this.temp.forEach((tdom) => {
                        tdom.innerText = ''
                        tdom.classList.remove('wrong')
                    })
                    this.temp = []
                }, 200)
            } else {
                if (this.temp.length == 4) {
                    this.temp.forEach((tdom) => {
                        tdom.classList.add('right')
                    })
                    this.temp = []
                    this.checkNum = -1
                    this.counter++
                    if (this.counter == 9) {
                        alert('You Won')
                    }
                }
            }
        }
    }
}

function initDom(numbers, repeatedTime) {
    game.dom.innerHTML = ''

    for (let i = 0; i < (numbers + 1) * repeatedTime; i++) {

        const childDiv = document.createElement('div')
        childDiv.classList = 'item'
        game.dom.appendChild(childDiv)
    }
}

document.querySelector('.numbers').addEventListener('change', (e) => {
    game.numbers = parseInt(e.target.value)
    initDom(game.numbers, game.repeatedTime)
})

document.querySelector('.repeatTime').addEventListener('change', (e) => {
    game.repeatedTime = parseInt(e.target.value)
    initDom(game.numbers, game.repeatedTime)
})

document.querySelector('.prepareTime').addEventListener('change', (e) => {
    game.prepareTime = parseInt(e.target.value)
})

document.querySelector('.start').addEventListener('click', () => {
    game.init()
})

initDom(game.numbers, game.repeatedTime)
