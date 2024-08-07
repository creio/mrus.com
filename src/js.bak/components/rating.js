const rating = document.querySelectorAll('.rating')

if (rating.length > 0) {
	rating.forEach((wrapper) => {
		const labels = wrapper.querySelectorAll('.rating__stars-label')

		if (labels.length > 0) {
			labels.forEach((label) => {
				const input = label.querySelector('.rating__stars-input');

				label.addEventListener('mouseenter', function () {
					label.classList.add('is-hover');
				});

				label.addEventListener('mouseleave', function () {
					label.classList.remove('is-hover');
				});

				label.addEventListener('click', function () {
					labels.forEach((otherLabel) => {
						if (otherLabel !== label) {
							otherLabel.classList.remove('is-active');
							otherLabel.querySelector('.rating__stars-input').removeAttribute('checked');
						}
					})

					label.classList.add('is-active');
					input.setAttribute('checked', '');
				});
			});
		}
	})
}