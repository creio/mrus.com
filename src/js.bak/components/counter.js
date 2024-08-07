const counters = document.querySelectorAll('.counter');

if (counters.length > 0) {
	counters.forEach((item) => {
		const input = item.querySelector('.counter__input');
		const minusBtn = item.querySelector('.counter__minus');
		const plusBtn = item.querySelector('.counter__plus');

		minusBtn.addEventListener('click', function() {
			if (event.shiftKey) {
				decrementCounterBy(10);
			} else {
				decrementCounter();
			}
			updateInputWidth();
		});
		
		plusBtn.addEventListener('click', function() {
			if (event.shiftKey) {
				incrementCounterBy(10);
			} else {
				incrementCounter();
			}
			updateInputWidth();
		});

		input.addEventListener('input', function() {
			validateInput()
			updateInputWidth();
		});

		input.addEventListener('blur', function() {
			if (input.value === '') {
				input.value = '1';
			}
		});

		input.addEventListener('keydown', function() {
			if (input.value === '0') {
				removeCardMini();
			}
		});

		function incrementCounter() {
			let currentValue = parseInt(input.value);
			input.value = isNaN(currentValue) ? 1 : currentValue + 1;
		}
	
		function decrementCounter() {
			let currentValue = parseInt(input.value);
			if (isNaN(currentValue)) {
				input.value = 1;
			} else if (currentValue > 1) {
				input.value = currentValue - 1;
			} else if (currentValue === 1) {
				input.value = 0;
				removeCardMini();
			}
		}

		function incrementCounterBy(value) {
			let currentValue = parseInt(input.value);
			input.value = isNaN(currentValue) ? value : currentValue + value;
		}
	
		function decrementCounterBy(value) {
			let currentValue = parseInt(input.value);
			if (isNaN(currentValue) || currentValue === 10) {
				input.value = 1;
			} else if (currentValue >= value) {
				input.value = currentValue - value;
			}

			if (parseInt(input.value) <= 0) {
				removeCardMini();
			}
		}

		function validateInput() {
			input.value = input.value.replace(/\D/g, '');
		}
		
		function updateInputWidth() {
			const valueLength = input.value.length;
			input.style.width = `${valueLength + 0.25}ch`;
		}

		function removeCardMini() {
			const cardMini = input.closest('.card--mini');
			if (cardMini) {
				cardMini.remove();
			}
		}
	})
}