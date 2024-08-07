const addCard = document?.querySelectorAll('[data-add-card]')

if (addCard.length > 0) {
	addCard.forEach((card) => {
		const wrapperButtons = card?.querySelector('.card__buttons'),
					addButton = card?.querySelector('.btn--add'),
					goToCard = card?.querySelector('.btn--goto'),
					counter = card?.querySelector('.counter'),

					isFalse = card.getAttribute('data-add-card') === 'false'

		function cardStatusAdded() {
			wrapperButtons?.classList.add('flex-wrap-md')
			addButton?.classList.add('is-hidden')
			goToCard?.classList.remove('is-hidden')
			counter?.classList.remove('is-hidden')
		}

		function cardStatusStandard() {
			wrapperButtons?.classList.remove('flex-wrap-md')
			addButton?.classList.remove('is-hidden')
			goToCard?.classList.add('is-hidden')
			counter?.classList.add('is-hidden')
		}

		if (!isFalse) {
			cardStatusAdded()
		} else {
			cardStatusStandard()
		}

		addButton?.addEventListener('click', cardStatusAdded)
	})
}