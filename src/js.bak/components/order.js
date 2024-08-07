function showAlertModal(element) {
	const alertContainer = element.closest('.alert');

	const showAlert = element.dataset.showAlert

	alertContainer.style.display = 'block';
	element.style.display = 'flex';

	if (showAlert) {
		setTimeout(() => {
			alertContainer.style.display = 'none';
			element.style.display = 'none';
		}, showAlert);
	}
}

function closeAlertModal(element) {
	const alertModal = element.closest('.alert__modal');
	const alertContainer = element.closest('.alert');

	alertContainer.style = '';
	alertModal.style = '';
}

const closeAlertModals = document.querySelectorAll('.js-alert-close')
if (closeAlertModals.length > 0) {
	closeAlertModals.forEach((btn) => {
		btn.addEventListener('click', () => closeAlertModal(btn));
	});
}

function nextOrderStep(button) {
	const parentStep = button.closest('.order__step');

	parentStep.setAttribute('data-step-collapse', 'false');
	parentStep.setAttribute('data-step-complete', 'true');

	const nextStep = parentStep.nextElementSibling;

	if (nextStep && nextStep.classList.contains('order__step')) {
		nextStep.setAttribute('data-step-collapse', 'true');
		nextStep.setAttribute('data-step-complete', 'false');
	}
}

function editOrderStep(button) {
	const parentStep = button.closest('.order__step');

	parentStep.setAttribute('data-step-collapse', 'true');
	parentStep.setAttribute('data-step-complete', 'false');
}

const editButtons = document.querySelectorAll('.order__step-header-edit')

if (editButtons.length > 0) {
	editButtons.forEach((button) => {
		button.addEventListener('click', () => {
			editOrderStep(button);
		});
	});
}

const orderValidateForms = document.querySelectorAll('.order-validate');

if (orderValidateForms.length > 0) {
	orderValidateForms.forEach((form) => {
		const btnSubmit = form.querySelector('button[type="submit"]');
		const wrapperFields = form.querySelectorAll('.wrapper-field__inner');
		const selectChoices = form.querySelectorAll('.choices')

		wrapperFields.forEach((wrapper) => {
			const input = wrapper.querySelector('.field');

			input.addEventListener('input', () => {
				if (input.value.trim() !== '') {
					wrapper.classList.remove('is-valid');
				}
			});
		});

		btnSubmit.addEventListener('click', (event) => {
			event.preventDefault();

			let isValid = true;

			wrapperFields.forEach((wrapper) => {
				const input = wrapper.querySelector('.field');

				if (input.hasAttribute('required') && input.value.trim() === '') {
					input.value = '';
					wrapper.classList.add('is-valid');
					showAlertModal(document.querySelector('#alertFormValid'))
					isValid = false;
				} else {
					wrapper.classList.remove('is-valid');
				}
			});

			if (selectChoices.length > 0) {
				selectChoices.forEach((select) => {
					const selectPlaceholder = select.querySelector('.choices__list--single .choices__placeholder')
					const selectedValue = select.getAttribute('data-value');

					if (!selectedValue && !selectPlaceholder.querySelector('.required')) {
						selectPlaceholder.insertAdjacentHTML('beforeend', '<span class="required">*</span>'.trim());
					}
					isValid = false;
				})
			}

			if (isValid) {
				form.onsubmit = function (event) {
					event.preventDefault();
				};
				nextOrderStep(btnSubmit);
			}
		});
	});
}

const radioIDSubmits = document.querySelectorAll('[data-id-submit]');

function toggleIsShow() {
	const idSubmitTarget = this.getAttribute('data-id-submit');
	const targetElements = document.querySelectorAll('[data-id-submit-target]');

	if (this.checked) {
		targetElements.forEach(function (element) {
			if (element.getAttribute('data-id-submit-target') === idSubmitTarget) {
				element.classList.add('is-show');
			} else {
				element.classList.remove('is-show');
			}
		});
	} else {
		targetElements.forEach(function (element) {
			element.classList.remove('is-show');
		});
	}
}

if (radioIDSubmits.length > 0) {
	radioIDSubmits.forEach(function (input) {
		input.addEventListener('change', toggleIsShow);

		if (input.checked) {
			toggleIsShow.call(input);
		}
	});
}

const formPromocode = document.querySelector('#formPromocode');

let isSubmit = false;
let isFieldFocused = false;

if (formPromocode) {
	const formPromocodeTitle = formPromocode.querySelector('.order__promocode-title'),
		formPromocodeResult = formPromocode.querySelector('.order__promocode-result'),
		formPromocodeField = formPromocode.querySelector('.field'),
		iconSuccess = formPromocode.querySelector('.field-success')

	const successHtml = `
		<span>
			Промокод успешно применен!
		</span>
	`

	const invalidHtml = `
		<span>
			Срок действия промокода закончился
		</span>
	`

	const validPromocodes = ['CODE1', 'CODE2', 'CODE3'];

	function checkPromocode() {
		if (!(isSubmit === true)) {
			const enteredPromocode = formPromocodeField.value.toUpperCase();

			if (validPromocodes.includes(enteredPromocode)) {
				isSubmit = true
				formPromocodeField.setAttribute('readonly', 'readonly');
				formPromocodeField.setAttribute('disabled', 'disabled');
				iconSuccess?.classList.add('is-show')
				formPromocodeTitle.classList.add('is-show');
				formPromocodeResult.innerHTML = successHtml;
				formPromocodeResult.classList.remove('is-invalid');
				formPromocodeResult.classList.add('is-show', 'is-success');
			} else {
				formPromocodeTitle.classList.add('is-show');
				formPromocodeResult.innerHTML = invalidHtml;
				formPromocodeResult.classList.remove('is-success');
				formPromocodeResult.classList.add('is-show', 'is-invalid');
			}
		}
	}

	formPromocodeField.addEventListener('blur', function () {
		checkPromocode()
	});

	formPromocode.onsubmit = function (event) {
		event.preventDefault();

		checkPromocode()
	}
}