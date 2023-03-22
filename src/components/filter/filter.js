{
    let filterContainer = document.querySelector('[data-filter]');
    if (filterContainer) {
        let rows = filterContainer.querySelectorAll('.filter__row');
        if (rows.length) {
            rows.forEach(row => {
                let listHideItems = row.querySelectorAll('.filter__list li.hidden');
                let btnMore = row.querySelector('.filter__btn-more');

                if (listHideItems.length) {
                    if (btnMore) {
                        btnMore.classList.remove('hidden');

                        btnMore.addEventListener('click', () => {
                            if (row.classList.contains('show-all-items')) {
                                listHideItems.forEach(i => {
                                    i.classList.add('hidden');
                                })
                                btnMore.classList.remove('filter__btn-more--open');
                                row.classList.remove('show-all-items');
                            } else {
                                listHideItems.forEach(i => {
                                    i.classList.remove('hidden');
                                })
                                btnMore.classList.add('filter__btn-more--open');
                                row.classList.add('show-all-items');
                            }
                        })
                    }
                }
            })
        }

        let buttonsOpenFilter = document.querySelectorAll('[data-action="open-filter"]');
        if (buttonsOpenFilter.length) {
            buttonsOpenFilter.forEach(btn => {
                btn.addEventListener('click', () => {
                    filterContainer.classList.add('filter--open');
                    document.body.classList.add('overflow-hidden');
                })
            })
        }
        let buttonsCloseFilter = document.querySelectorAll('[data-action="close-filter"]');
        if (buttonsCloseFilter.length) {
            buttonsCloseFilter.forEach(btn => {
                btn.addEventListener('click', () => {
                    filterContainer.classList.remove('filter--open');
                    document.body.classList.remove('overflow-hidden');
                })
            })
        }

    }
}

class Filter {
    constructor(container, id, options = {}) {
        this.container = container;
        this.inputsCheckbox = Array.from(this.container.querySelectorAll('input[type="checkbox"]'));
        this.id = id;
        this.options = options;

        this.init();
    }

    init() {
        this.container.setAttribute('data-filter-id', this.id);

        if (this.inputsCheckbox.length) {
            this.inputsCheckbox.forEach((input, index) => {
                input.setAttribute('data-filter-id', this.id);
                input.setAttribute('data-filter-input-id', index);

                let text = input.parentElement.querySelector('.checkbox-radio__text').innerText;

                if (input.checked) {
                    this.addSelectedButtons(this.id, index, text, input);

                    if(this.options.on?.afterChange) {
                        this.options.on?.afterChange(input);
                    }
                }

                input.addEventListener('change', (e) => {
                    if (e.target.checked) {
                        this.addSelectedButtons(this.id, index, text, input);
                    } else {
                        this.removeSelectedButtons(this.id, index);
                    }

                    if(this.options.on?.afterChange) {
                        this.options.on?.afterChange(input);
                    }
                })
            })
        }

        document.addEventListener('click', (e) => {
            if (e.target.closest('.selected-filter-btn__close')) {

                let parent = e.target.parentElement;
                if(parent.getAttribute('data-filter-id')) {
                    this.removeSelectedButtons(parent.getAttribute('data-filter-id'), parent.getAttribute('data-filter-btn-id'));
                    this.unCheckInput(parent.getAttribute('data-filter-btn-id'));

                    if(this.options.on?.afterChange) {
                        let input = this.inputsCheckbox.filter(input => input.getAttribute('data-filter-input-id') === parent.getAttribute('data-filter-btn-id'));
                        this.options.on?.afterChange(input[0]);
                    }
                }

            }

        })


        if (this.options.clearAllBtn) {
            this.options.clearAllBtn.setAttribute('style', "display:none;");

            this.options.clearAllBtn.addEventListener('click', () => this.clearAll());

            if (this.options.duplicateSelectedButtons) {
                let observer = new MutationObserver(mutationRecords => {
                    if(this.options.duplicateSelectedButtons.children.length) {
                        this.options.clearAllBtn.removeAttribute('style');
                    } else {
                        this.options.clearAllBtn.setAttribute('style', "display:none;");
                    }
                });

                observer.observe(this.options.duplicateSelectedButtons, {
                    childList: true,
                });
            }

        }
    }

    addSelectedButtons(selectId, btnId, btnText, input) {



        const addButton = (container) => {
            let el = container.querySelector(`[data-input-name="${input.name}"][data-input-value="${input.value}"]`);
            if(el) return;

            container.insertAdjacentHTML('beforeend', `
            <button class="selected-filter-btn" data-filter-id="${selectId}" data-filter-btn-id="${btnId}" data-input-name="${input.name}" data-input-value="${input.value}">
                <span class="selected-filter-btn__close"></span>
                ${btnText}
            </button>
            `)
        }

        if (this.options.duplicateSelectedButtons) {
            addButton(this.options.duplicateSelectedButtons);
        }
    }

    removeSelectedButtons(selectId, btnId) {
        let buttons = document.querySelectorAll(`.selected-filter-btn[data-filter-id="${selectId}"][data-filter-btn-id="${btnId}"]`);
        if (buttons.length) {
            buttons.forEach(btn => {
                btn.remove();
            })
        }
    }

    clearAll() {

        this.inputsCheckbox.forEach(input => {
            input.checked = false;
        })

        if (this.options.duplicateSelectedButtons) {
            let buttons = document.querySelectorAll(`.selected-filter-btn[data-filter-id="${this.id}"]`);
            if (buttons.length) {
                buttons.forEach(btn => {
                    btn.remove();
                })
            }
        }
    }

    unCheckInput(inputId) {
        this.inputsCheckbox.forEach(input => {
            if (input.getAttribute('data-filter-input-id') === inputId) {
                input.checked = false;
            }
        })
    }

    setInputStateByName(name, value, state) {
        if(!name) return;
        
        this.inputsCheckbox.forEach(input => {
            if(input.name === name && input.value === value) {
                input.checked = state;

                if(!state) {
                    this.removeSelectedButtons(this.id, input.getAttribute('data-filter-input-id'));
                }
            }
        })
    }
}