import { disableScroll } from '../functions/disable-scroll'
import { enableScroll } from '../functions/enable-scroll'

const buttonsShow = document?.querySelectorAll('.btn-search'),
			headerSearch = document?.querySelector('.header__search-wrapper'),
			searchField = headerSearch?.querySelector('.search__field'),
			searchLast = headerSearch?.querySelector('.search__last'),
			searchCard = headerSearch?.querySelector('.search__card'),
			searchNews = headerSearch?.querySelector('.search__news'),
			buttonShow = headerSearch?.querySelector('[type="button"].search__btn'),
			overlay = document?.querySelector('[data-menu-overlay]')

searchNews?.classList.add('is-hidden')

function showSearch() {
	disableScroll()
	headerSearch.classList.add('is-show')
	overlay.setAttribute('data-menu-overlay', 'true')
	searchField.focus()
}

function hideSearch() {
	enableScroll()
	headerSearch.classList.remove('is-show')
	overlay.setAttribute('data-menu-overlay', 'false')
}

function handleSearchField() {
  if (searchField.value === '') {
    searchLast.classList.remove('is-hidden')
    searchNews.classList.add('is-hidden')
  } else {
    searchLast.classList.add('is-hidden')
    searchNews.classList.remove('is-hidden')
  }
}

if (buttonsShow.length > 0) {
	buttonsShow.forEach((btn) => {
		btn.addEventListener('click', showSearch)
	})
}

buttonShow?.addEventListener('click', showSearch)
overlay?.addEventListener('click', hideSearch)
searchField?.addEventListener('input', handleSearchField)