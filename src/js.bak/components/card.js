const choiceLists = document.querySelectorAll('.product__choice-list');
const deleteCards = document.querySelectorAll('.js-card-delete')

choiceLists?.forEach((list) => {
  const buttons = list.querySelectorAll('.product__choice-btn');

  buttons.forEach((button) => {
    button.addEventListener('click', function() {
      buttons.forEach((btn) => {
        btn.classList.remove('is-active');
      });

      button.classList.add('is-active');
    });
  });
});

deleteCards?.forEach((btn) => {
  const card = btn.closest('li') || btn.closest('.card')
  
  btn.addEventListener('click', () => {
    btn.classList.remove('is-active')

    setTimeout(function() {
      card.remove();
    }, 500);
  })
})