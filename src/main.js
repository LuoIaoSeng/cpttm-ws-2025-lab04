import './index.css'

const game = {
    dom: document.querySelector('.app'),
    answers: [],
    temp: [],
    tempIndex: [],
    checkNum: -1,
    counter: 0,
    waitTime: 3,
    init: function () {
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 9; j++) {
                this.answers.push(j)
            }
        }

        this.answers = this.answers.sort(() => Math.random() - 0.5)

        for (let i = 0; i < 36; i++) {

            const childDiv = document.createElement('div')
            // childDiv.setAttribute('data-index', i)
            childDiv.setAttribute('data-answer', this.answers[i])
            childDiv.classList = 'item'
            childDiv.innerText = this.answers[i]
            this.dom.appendChild(childDiv)
        }

        setTimeout(() => {
            document.querySelectorAll('.item').forEach((dom) => {
                dom.innerText = ''
                dom.addEventListener('click', () => {
                    this.clickDom(dom)
                })
            })
        }, this.waitTime * 1000)
    },
    clickDom: function (dom) {
        // const index = dom.getAttribute('data-index')
        const value = dom.getAttribute('data-answer')
        if(this.temp.indexOf(dom) != -1) return
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

game.init()
