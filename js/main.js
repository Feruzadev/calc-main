

const numbers = [...document.querySelectorAll('.num')]
const displey = document.querySelector('input')
const signs =[...document.querySelectorAll('.sign')]
const dot = document.querySelector('.dot')
const clear = document.querySelector('.c')
const del = document.querySelector('.r')
const equel = document.querySelector('.equal')

// console.log(displey.value[displey.value.length - 1])

class Calculator {
    displey
    signView
    signOperator
    oprators = ['+','-','✕','÷']
    setDisplay (value) {
        displey.value = displey.value + value
    }

    get firstValue () {
        return displey.value[0]
    }
    get lastValue () {
        return displey.value[displey.value.length - 1]
    }

    numbers (event) {
        // console.log(event.target.textContent)

        const num = event.target.textContent
        if (this.lastValue == 0 && displey.value.length == 1) return displey.value = num
           
        if (
            this.lastValue == 0  &&  this.signView
        )  return displey.value = displey.value.slice(0,-1) + num


        this.setDisplay(num)
    }

    signs (event) {
        this.signView = null
        this.signOperator = null
        console.log(event.target.dataset.sign)
        const signView = event.target.textContent
        const signOperator = event.target.dataset.sign

        if (this.displey  || this.lastValue  == "."  || this.signOperator) { 
            return
        }

        if (
            this.oprators.includes(this.lastValue)
        ) return  displey.value = displey.value.slice(0,-1) + signView

     

       
        this.signView = signView
        this.signOperator = signOperator
        this.setDisplay(signView)
    }

    dot () {

        if (
            !displey.value  || 
            this.oprators.includes(this.lastValue)
        )return displey.value = displey.value + "0."

        if(
            this.lastValue == "."
        ) return

        this.setDisplay('.')
    }

    clear () {
       return   displey.value =  null
    }
    del () {
       let deleted = displey.value.split('')
    //    console.log(deleted)
       let newVal = deleted.slice(0,-1).join("")
    //    console.log(newVal)

       displey.value = newVal
    }

    equel () {
        const[num1,num2] = displey.value.split(this.signView)
        displey.value = eval(num1 + this.signOperator + num2)
        // console.log(displey.value)
        // this.setDisplay()
        this.signView = null
        this.signOperator = null
    }

}

const calc = new Calculator();

for (const number of numbers) {
    // console.log(number)
    number.addEventListener('click',(event) => {
        return calc.numbers(event)
    })
}

for (const sign of signs) {
    // console.log(sign)

    sign.addEventListener('click',(event) => {
        return calc.signs(event)
    })
}

dot.addEventListener('click', () => {
    return calc.dot()
})

clear.addEventListener('click', () => {
    calc.clear()
})


del.addEventListener('click', () => {
    calc.del()
})

equel.addEventListener('click', () => {
    calc.equel()
})

 
