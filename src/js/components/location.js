const locations = document.querySelectorAll('.js-location')
const alertLocation = document.querySelector('.alert--location')

if (locations.length > 0) {
	locations.forEach((btn) => {
		const dropdown = document?.querySelector('.location__dropdown'),
					headerOverlay = document?.querySelector('[data-menu-overlay]'),
					dropdownItem = document?.querySelectorAll('.location__dropdown-item'),
					dropdownClose = document?.querySelector('.location__dropdown-close'),
					text = btn.querySelector('.location__text')

		function dropdownShow() {
			btn.classList.add('is-active');
			dropdown.classList.add('is-show');

			if (window.innerWidth <= 1024) {
				headerOverlay.dataset.menuOverlay = 'true';
			}
		}

		function dropdownHide() {
			btn.classList.remove('is-active');
			dropdown.classList.remove('is-show');
			if (!(document.querySelector('.header__menu').classList.contains('menu--active'))) {
				headerOverlay.dataset.menuOverlay = 'false';
			}
		}

		btn.addEventListener('click', () => {
			dropdownShow()
		})

		dropdownClose.addEventListener('click', () => {
			dropdownHide()
		})

		headerOverlay.addEventListener('click', () => {
			dropdownHide()
		})

		if (dropdownItem.length > 0) {
			dropdownItem.forEach((item) => {
				item.addEventListener('click', function() {
					dropdownHide()
					text.textContent = item.innerHTML
				})
			})
		}
	})
}

if (alertLocation && !localStorage.getItem('alertClosed')) {
  const alertLocationInner = document.querySelector('#alertLocation');
	const alertCloseButton = alertLocation.querySelectorAll('.js-alert-close');
  alertLocation.style.display = 'block';
  alertLocationInner.style.display = 'flex';
	
	alertCloseButton?.forEach((alertClose) => {
		alertClose.addEventListener('click', function() {
			localStorage.setItem('alertClosed', 'true');
			alertLocation.style.display = '';
  		alertLocationInner.style.display = '';
		});
	})
}
