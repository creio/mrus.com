const scrollElements = document.querySelectorAll('.scroll-element'),
	scrollSections = document.querySelectorAll('.section-scroll'),
	scrollScrollAccordions = document.querySelectorAll('.accordion-scroll'),
	scrollNavigations = document.querySelectorAll('.nav-scroll')

window.onscroll = () => {

	scrollSections?.forEach((section) => {

		let scrollGap = section.getAttribute('data-scroll-gap')
		let gapValues = scrollGap ? scrollGap.split(',') : [0, 0]

		let firstGap = parseInt(String(gapValues[0]).trim(), 10)
		let secondGap = parseInt(String(gapValues[1]).trim(), 10)

		let top = window.scrollY
		let headerHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--dynamic-header-height'), 10)
		let gap = window.innerWidth >= 1024 ? secondGap + 2 : firstGap + 2
		let offset = section.getBoundingClientRect().top + window.scrollY - headerHeight - gap
		let height = section.offsetHeight
		let id = section.getAttribute('id')

		if (top >= offset && top <= offset + height) {
			const scrollNavigation = document.querySelector('.nav-scroll[data-href*="' + id + '"]')

			scrollScrollAccordions?.forEach((accordion) => {
				accordion.open = false
			})
			scrollNavigations?.forEach((nav) => {
				if (nav.closest('.tabs__nav-item')) {
					nav.addEventListener('click', () => {
						
						scrollNavigations?.forEach((otherNav) => {
							otherNav.classList.remove('is-active')
			
							if (otherNav.classList.contains('tabs__nav-btn--active')) {
								otherNav.classList.remove('tabs__nav-btn--active');
							}
						})
	
						nav.classList.add('is-active')
	
						if (nav.classList.contains('tabs__nav-btn--active')) {
							nav.classList.add('tabs__nav-btn--active');
						}
					})
				}
			})
			scrollNavigations?.forEach((otherNav) => {
				otherNav.classList.remove('is-active')

				if (otherNav.classList.contains('tabs__nav-btn--active')) {
					otherNav.classList.remove('tabs__nav-btn--active');
				}
			})

			scrollNavigation.classList.add('is-active')
			if (scrollNavigation.closest('.accordion-scroll')) {
				const scrollAccordion = scrollNavigation.closest('.accordion-scroll')

				scrollAccordion.open = true
			}
			if (scrollNavigation.closest('.scroll-element-nav')) {
				const	activeNav = scrollNavigation.closest('.scroll-element-nav').querySelector('.nav-scroll')

				activeNav.classList.add('is-active')

				scrollElements?.forEach((element) => {
					if (element.scrollWidth > element.clientWidth && activeNav.classList.contains('is-active')) {
						let gap = element.getAttribute('data-element-gap') || 0;
		
						const navScrollLeft = activeNav.getBoundingClientRect().left;
						const elementLeft = element.getBoundingClientRect().left;
						const scrollAmount = navScrollLeft - elementLeft - gap;
		
						element.scrollBy({
							left: scrollAmount,
							behavior: 'smooth'
						});
					}
				})
			}
		}
	})
}

scrollNavigations?.forEach((nav, index) => {
	
	let activeNav, gap, headerHeight, href, scrollGap, gapValues, firstGap, secondGap
	let gapsArray = [];

	nav.addEventListener('click', (event) => {
		event.preventDefault();

		scrollNavigations?.forEach((otherNav) => {
			if (otherNav.classList.contains('is-active')) {
				activeNav = otherNav;
			}
		});

		const activeIndex = Array.from(scrollNavigations).indexOf(activeNav);

		scrollSections?.forEach((section) => {
			scrollGap = section.getAttribute('data-scroll-gap');
			gapValues = scrollGap ? scrollGap.split(',') : [0, 0];
	
			firstGap = parseInt(String(gapValues[0]).trim(), 10);
			secondGap = parseInt(String(gapValues[1]).trim(), 10);
	
			gapsArray.push({ firstGap, secondGap });
		});
	
		gap = window.innerWidth >= 1024 ? gapsArray[index].secondGap : gapsArray[index].firstGap
		headerHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--dynamic-header-height'), 10)
		
		if (index > activeIndex) {
			headerHeight = window.innerWidth >= 1024 ? document.querySelector('.header__bottom').offsetHeight : document.querySelector('.header').offsetHeight;
		} else {
			headerHeight = document.querySelector('.header').offsetHeight;
		}

		href = nav.getAttribute('data-href');

		const scrollTarget = document.getElementById(href);
		const topOffset = headerHeight + gap;
		const elementPosition = scrollTarget.getBoundingClientRect().top;
		const offsetPosition = elementPosition - topOffset;

		window.scrollBy({
			top: offsetPosition,
			behavior: 'smooth'
		});

	});
});

scrollElements?.forEach((element) => {

	if (element.scrollWidth > element.clientWidth) {
		const scrollNavs = element.querySelectorAll('.nav-scroll');

		scrollNavs?.forEach((navScroll) => {
			navScroll.addEventListener('click', () => {
				let gap = element.getAttribute('data-element-gap') || 0;

				const navScrollLeft = navScroll.getBoundingClientRect().left;
				const elementLeft = element.getBoundingClientRect().left;
				const scrollAmount = navScrollLeft - elementLeft - gap;

				element.scrollBy({
					left: scrollAmount,
					behavior: 'smooth'
				});
			});
		});
	}

})