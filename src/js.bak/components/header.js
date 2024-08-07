import { getHeaderHeight } from '../functions/header-height';

window.onload = function () {
  const header = document?.querySelector('.header');
  const headerBottom = document?.querySelector('.header__bottom');
  const dependentElements = document.querySelectorAll('.dependent-element')
  let prevScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
  let dynamicHeaderHeight = header.offsetHeight;

  document.documentElement.style.setProperty('--dynamic-header-height', `${dynamicHeaderHeight}px`);

  window.addEventListener('scroll', function () {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollPosition > 80) {
      let dynamicHeaderHeight = window.innerWidth >= 1024 ? headerBottom.offsetHeight : header.offsetHeight;

      document.documentElement.style.setProperty('--dynamic-header-height', `${dynamicHeaderHeight}px`);

      header?.classList.add('header-fixed');

      if (scrollPosition < prevScrollPosition || scrollPosition === 0) {
        let dynamicHeaderHeight = header.offsetHeight;

        document.documentElement.style.setProperty('--dynamic-header-height', `${dynamicHeaderHeight}px`);

        header?.classList.add('header--full');

        dependentElements?.forEach((item) => {
          item.classList.add('dependent-element--full')
        })
      } else {
        header?.classList.remove('header--full');

        dependentElements?.forEach((item) => {
          item.classList.remove('dependent-element--full')
        })
      }

      prevScrollPosition = scrollPosition;

      getHeaderHeight()
      window.addEventListener('resize', getHeaderHeight);
    } else {
      header?.classList.remove('header-fixed');
      document.documentElement.style.setProperty('--header-height', '0');
      document.documentElement.style.setProperty('--dynamic-header-height', `${dynamicHeaderHeight}px`);
      window.addEventListener('resize', function () {
        document.documentElement.style.setProperty('--header-height', '0');
      });
    }
  });



  const headerDropdowns = document?.querySelectorAll('.header__dropdown')

  if (headerDropdowns.length > 0) {
    headerDropdowns.forEach((dropdown) => {
      const btnClose = dropdown.querySelector('.header__dropdown-close')

      dropdown.addEventListener('click', function () {
        headerDropdowns.forEach((otherDropdown) => {
          otherDropdown.classList.remove('is-active')
        })

        dropdown.classList.add('is-active')
      })

      if (btnClose) {
        btnClose.addEventListener('click', function (event) {
          event.stopPropagation();
          dropdown.classList.remove('is-active');
        });
      }
    })
  }
}