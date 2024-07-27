const backButtons = document.querySelectorAll('.btn-back');

if (backButtons.length > 0) {
	backButtons.forEach(button => {
		button.addEventListener('click', () => {
			window.history.back();
		});
	});
}