@@include('files/utils.js')
@@include('files/dynamic_adapt.js') 

class App { 
	constructor() {
		this.utils = new Utils();
		this.dynamicAdapt = new DynamicAdapt('max');
	}

	init() {
		window.addEventListener('DOMContentLoaded', () => {
			document.body.classList.add('page-is-load');

			if (this.utils.isMobile()) {
				document.body.classList.add('mobile');
			}
	
			if (this.utils.iOS()) {
				document.body.classList.add('mobile-ios');
			}

			if (this.utils.isSafari()) {
				document.body.classList.add('safari');
			}

			this.utils.replaceToInlineSvg('.img-svg');
			this.dynamicAdapt.init();
			this.headerHandler();
			this.popupHandler();
			this.slidersInit();
			this.initSmoothScroll();
			this.inputMaskInit();
			this.tabsInit();
			this.selectInit();
			this.spollerInit();
			this.initTooltipe();
			this.componentsBeforeLoad();
		});
		


		window.addEventListener('load', () => {
			
			this.componentsAfterLoad();
		});

	}

	headerHandler() {
		@@include('../components/header/header.js')
	}

	popupHandler() {
		@@include('../components/popup/popup.js')
	}
	
	slidersInit() {
		@@include('../components/testimonials/testimonials.js')
	}


	tabsInit() {
		let tabsContainers = document.querySelectorAll('[data-tabs]');
		if (tabsContainers.length) {
			tabsContainers.forEach(tabsContainer => {
				let triggerItems = tabsContainer.querySelectorAll('[data-tab-trigger]');
				let contentItems = Array.from(tabsContainer.querySelectorAll('[data-tab-content]'));
				let select = tabsContainer.querySelector('[data-tab-select]');

				const getContentItem = (id) => {
					if (!id.trim()) return;
					return contentItems.filter(item => item.dataset.tabContent === id)[0];
				}

				if (triggerItems.length && contentItems.length) {
					// init
					let activeItem = tabsContainer.querySelector('.tab-active[data-tab-trigger]');
					if(activeItem) {
						activeItem.classList.add('tab-active');
						getContentItem(activeItem.dataset.tabTrigger).classList.add('tab-active');
					} else {
						triggerItems[0].classList.add('tab-active');
						getContentItem(triggerItems[0].dataset.tabTrigger).classList.add('tab-active');
					}

					triggerItems.forEach(item => {
						item.addEventListener('click', () => {
							item.classList.add('tab-active');
							getContentItem(item.dataset.tabTrigger).classList.add('tab-active');

							triggerItems.forEach(i => {
								if (i === item) return;

								i.classList.remove('tab-active');
								getContentItem(i.dataset.tabTrigger).classList.remove('tab-active');
							})

							// update locomotive scroll
							let id = setInterval(() => {
								window.locomotivePageScroll.update();
							}, 20);
							setTimeout(() => {
								clearInterval(id);
							}, 200)
						})
					})
				}

				if(select) {
					select.addEventListener('change', (e) => {
						getContentItem(e.target.value).classList.add('tab-active');

						contentItems.forEach(item => {
							if(getContentItem(e.target.value) === item) return;

							item.classList.remove('tab-active');
						})
					})
				}
			})
		}
	}

	spollerInit() {
		let spollers = document.querySelectorAll('[data-spoller]');
		if (spollers.length) {
			spollers.forEach(spoller => {
				let isOneActiveItem = spoller.dataset.spoller.trim() === 'one' ? true : false;
				let triggers = spoller.querySelectorAll('[data-spoller-trigger]');
				if (triggers.length) {
					triggers.forEach(trigger => {
						let parent = trigger.parentElement;
						let content = trigger.nextElementSibling;

						// init
						if(trigger.classList.contains('active')) {
							content.style.display = 'block';
							parent.classList.add('active');
						}

						trigger.addEventListener('click', (e) => {
							e.preventDefault();
							parent.classList.toggle('active');
							trigger.classList.toggle('active');
							content && this.utils.slideToggle(content);

							if (isOneActiveItem) {
								triggers.forEach(i => {
									if (i === trigger) return;

									let parent = i.parentElement;
									let content = i.nextElementSibling;

									parent.classList.remove('active');
									i.classList.remove('active');
									content && this.utils.slideUp(content);
								})
							}
						})
					})
				}
			})
		}
	}

	inputMaskInit() {
		let items = document.querySelectorAll('[data-mask]');
		if (items.length) {
			items.forEach(item => {
				let maskValue = item.dataset.mask;
				let input = item.querySelector('input[type="text"]');

				if (input) {
					Inputmask(maskValue, {
						//"placeholder": '',
						clearIncomplete: true,
						clearMaskOnLostFocus: true,
					}).mask(input);
				}
			})
		}
	}

	setPaddingTopHeaderSize() {
		let wrapper = document.querySelector('[data-padding-top-header-size]');
		if (wrapper) {
			let header = document.querySelector('[data-header]');
			if (header) {
				const setPedding = () => wrapper.style.paddingTop = header.clientHeight + 'px';
				setPedding();
				let id = setInterval(setPedding, 200);
				setTimeout(() => {
					clearInterval(id);
				}, 2000)
				window.addEventListener('resize', setPedding);
			}

		}
	}

	initSmoothScroll() {
		let anchors = document.querySelectorAll('a[href*="#"]:not([data-popup="open-popup"])');
		if (anchors.length) {
			let header = document.querySelector('.header');

			anchors.forEach(anchor => {
				if (!anchor.getAttribute('href').match(/#\w+$/gi)) return;

				let id = anchor.getAttribute('href').match(/#\w+$/gi).join('').replace('#', '');

				anchor.addEventListener('click', (e) => {
					let el = document.querySelector(`#${id}`);

					if (el) {
						e.preventDefault();
						let top = Math.abs(document.body.getBoundingClientRect().top) + el.getBoundingClientRect().top;

						if (header) {
							top = top - header.clientHeight;
						}

						window.scrollTo({
							top: top - 20,
							behavior: 'smooth',
						})
					}
				})

			})
		}

	}

	selectInit() {
		@@include('../components/select/select.js');
	}

	setFontSize() {
		let elements = document.querySelectorAll('[data-set-font-size]');
		if (elements.length) {
			elements.forEach(el => {
				const setFontSize = () => {
					let value = 10 / 1400 * el.clientWidth;
					el.style.fontSize = value + 'px';
				}

				setFontSize();

				window.addEventListener('resize', setFontSize);
			})
		}
	}

	initTooltipe() {
		let tooltips = document.querySelectorAll('[data-tooltip]');
		if (tooltips.length) {
			tooltips.forEach(tooltip => {
				let icon = document.createElement('span');
				icon.className = 'tooltip-icon';
				icon.innerHTML = `
				<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path fill-rule="evenodd" clip-rule="evenodd" d="M7 0C10.8598 0 14 3.14024 14 7.00004C14 10.8598 10.8598 14 7 14C3.1402 14 0 10.8598 0 7.00004C0 3.14024 3.1402 0 7 0ZM7 5.93939C6.64856 5.93939 6.36364 6.22432 6.36364 6.57576V10.3939C6.36364 10.7454 6.64856 11.0303 7 11.0303C7.35144 11.0303 7.63636 10.7454 7.63636 10.3939V6.57576C7.63636 6.22432 7.35144 5.93939 7 5.93939ZM6.1516 3.81856C6.1516 3.3505 6.53215 2.9697 6.99992 2.9697C7.46768 2.9697 7.84823 3.3505 7.84823 3.81856C7.84823 4.28621 7.46768 4.66667 6.99992 4.66667C6.53215 4.66667 6.1516 4.28621 6.1516 3.81856Z" fill="#00A1E2"/>
				</svg>`;

				tooltip.append(icon);

				tippy(icon, {
					content: tooltip.dataset.tooltip,
					arrow: false,
				});
			})
		}
	}


	componentsBeforeLoad() {
		@@include('../components/promo-header/promo-header.js')
		@@include('../components/multiple-select/multiple-select.js')
		@@include('../components/filter/filter.js')
		@@include('../components/hero-filter/hero-filter.js')
		@@include('../components/footer/footer.js')
		@@include('../components/vacancy-single-hero/vacancy-single-hero.js')
		@@include('../components/loading-box/loading-box.js')
		@@include('../components/hero-second/hero-second.js')
		@@include('../components/text-section/text-section.js')
	}

	componentsAfterLoad() {
	}

}

let app = new App();
app.init();


