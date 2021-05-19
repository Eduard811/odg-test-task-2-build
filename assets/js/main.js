'use strict'

function Popup() {
  const popup = document.querySelector('.b-popup')
  const openButton = document.querySelector('[data-popup-button]')
  const closeButton = document.querySelector('.b-popup__close')
  const inside = document.querySelector('.b-popup__wrapper')
  let isOpen = false

  const openOrClose = () => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    document.body.style.position = isOpen ? 'fixed' : ''
    document.body.style.width = isOpen ? '100%' : ''
    document.body.style.top = isOpen ? '0px' : ''

    setTimeout(() => {
      isOpen
        ? document.addEventListener('click', handleOutsideClick)
        : document.removeEventListener('click', handleOutsideClick)
    })
  }

  const open = () => {
    popup.classList.add('b-popup_active')
    isOpen = true
    openOrClose()
  }

  const close = () => {
    popup.classList.remove('b-popup_active')
    isOpen = false
    openOrClose()
  }

  const handleOutsideClick = (event) => {
    const path = event.path || (event.composedPath && event.composedPath())
    !path.includes(inside) && close()
  }

  openButton.addEventListener('click', open)
  closeButton.addEventListener('click', close)
}

function inputsGenerator() {
  const calculateButton = document.querySelector('.b-field__button')
  const block = document.querySelector('.b-field__block-two')
  const input = document.querySelector('[data-field-input]')
  const state = {
    apartmentСost: 10000000, //стоимость квартиры
    salary: 0, //зарплата в месяц
    taxDeduction: 0, // налоговый вычет за год
    maxTaxDeduction: 0, // максимальный налоговый вычет
    checkBoxs: [], // суммы для чекбоксов после подсчета
  }

  const createInputs = () => {
    if (state.checkBoxs.length > 0) {
      block.classList.toggle('b-field__block-two_active')
      block.innerHTML = state.checkBoxs
        .map((sum, i) => {
          return `<div class="b-field__checkbox-block">
            <input
            type="checkbox"
            name="total"
            id="total-checkbox-${i + 1}"
            class="b-field__checkbox"
            >
            <label for="total-checkbox-${i + 1}" class="b-field__checkbox-label">${sum} рублей <span>в ${
            i + 1
          }-ый год</span></label>
            </div>`
        })
        .join('')
    } else {
      block.innerHTML = ''
      block.classList.remove('b-field__block-two_active')
    }
  }

  const onChangeInput = (event) => {
    state.salary = event.target.value
    let result = calculateRecoupment()
    if (result) {
      state.checkBoxs = result
    }
  }

  const calculateRecoupment = () => {
    if (state.salary >= 10000) {
      state.apartmentСost > 2000000
        ? (state.maxTaxDeduction = 260000)
        : (state.maxTaxDeduction = Math.round((state.apartmentСost / 100) * 13))

      state.taxDeduction = Math.round(((state.salary * 12) / 100) * 13)
      const newArray = []
      let acc
      for (let i = 1; state.taxDeduction * i + 1 <= state.maxTaxDeduction; i++) {
        newArray.push(state.taxDeduction)
        acc = i
      }
      let max = acc + 2
      if (state.taxDeduction * max > state.maxTaxDeduction) {
        let difference = state.taxDeduction * acc - state.maxTaxDeduction

        newArray.push(Math.abs(difference))
      }

      return newArray
    } else {
      state.salary = 0
      state.checkBoxs.length = 0
    }
  }

  input.addEventListener('input', onChangeInput)
  calculateButton.addEventListener('click', createInputs)
}

document.addEventListener('DOMContentLoaded', () => {
  Popup()
  inputsGenerator()
})
