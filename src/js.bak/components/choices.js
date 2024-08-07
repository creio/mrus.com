import Choices from 'choices.js'

const selectChoices = document.querySelectorAll('.js-choices'),
			selectChoicesOuline = document.querySelectorAll('.js-choices--outline')
			
const selectConfig = {
	allowHTML: true,
	placeholder: true,
	searchEnabled: false,
	shouldSort: false,
	itemSelectText: '',
}

const selectConfigOutline = {
	allowHTML: true,
	placeholder: true,
	searchEnabled: false,
	shouldSort: false,
	itemSelectText: '',
	classNames: {
		containerOuter: 'choices choices--outline'
	},
}

if (selectChoices.length > 0) {
	selectChoices.forEach((select) => {
		const choices = new Choices(select, selectConfig)
	})
}

if (selectChoicesOuline.length > 0) {
	selectChoicesOuline.forEach((select) => {
		const choices = new Choices(select, selectConfigOutline)
	})
}