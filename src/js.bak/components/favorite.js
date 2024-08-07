const btnFavorites = document.querySelectorAll('.btn-add-favorite')

if (btnFavorites.length > 0) {
	btnFavorites.forEach((btn) => {
		btn.addEventListener('click', function() {
			btn.classList.toggle('is-active');
		})
	})
}