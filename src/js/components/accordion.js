const accordion = document.querySelectorAll('.accordion');

if ( accordion.length > 0 ) {
	accordion.forEach((e) => {
		const detailsSummary = e.querySelector('.accordion__title');
		const anchorLink = e.querySelector('.accordion__title-anchor');
		const detailsContent = e.querySelector('.accordion__content');
		let summaryHeight = parseInt(detailsSummary.offsetHeight);
	
		e.style.height = `${summaryHeight}px`;
	
		if (e.open) {
			let contentHeight = parseInt(detailsContent.offsetHeight);
			let fullHeight = summaryHeight + contentHeight;
	
			e.style.height = `${fullHeight}px`;
		}
	
		if (anchorLink) {
			anchorLink.addEventListener('click', function(event) {
				event.preventDefault();
		
				if (e.open) {
					e.open = false;
				} else {
					e.open = true;
				}

				if (e.classList.contains('accordion--solo')) {
					accordion.forEach((accordion) => {
						if (accordion !== e) {
							accordion.open = false;
						}
					});
				}
			});
		}
	
		e.addEventListener('toggle', (event) => {
			if (e.open) {
				let contentHeight = parseInt(detailsContent.offsetHeight);
				let fullHeight = summaryHeight + contentHeight;
	
				e.style.height = `${fullHeight}px`;
			} else {
				e.style.height = `${summaryHeight}px`;
			}

			if (e.classList.contains('accordion--solo') && e.open) {
				accordion.forEach((accordion) => {
					if (accordion !== e) {
						accordion.open = false;
					}
				});
			}
		});

		window.addEventListener('resize', function() {
			summaryHeight = parseInt(detailsSummary.offsetHeight)

			if (e.open) {
				let contentHeight = parseInt(detailsContent.offsetHeight);
				let fullHeight = summaryHeight + contentHeight;
		
				e.style.height = `${fullHeight}px`;
			} else {
				e.style.height = `${summaryHeight}px`;
			}
		});
	});
}