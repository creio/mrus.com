const wrapperRadios = document?.querySelectorAll('.custom-checkbox--radio')

if (wrapperRadios.length > 0) {
  wrapperRadios.forEach((item) => {
    const input = item.querySelector('input[type="radio"]')

    if (input.checked) {
      item.classList.add('is-active')
    }

    input.addEventListener('change', () => {
      const inputName = input.getAttribute('name')

      wrapperRadios.forEach((otherItem) => {
        const otherInput = otherItem.querySelector('input[type="radio"]')
        if (otherInput.getAttribute('name') === inputName) {
          otherItem.classList.remove('is-active')
        }
      })

      if (input.checked) {
        item.classList.add('is-active')
      }
    })
  })
}