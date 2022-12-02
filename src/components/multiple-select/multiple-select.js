class MultipleSelect extends Utils {
    constructor(container, id = 0, options = null) {
        super()
        this.container = container;
        this.head = this.container.querySelector('.multiple-select__head');
        this.optionsContainer = this.container.querySelectorAll('.multiple-select__options');
        this.inputs = Array.from(this.container.querySelectorAll('.multiple-select__options input'));
        this.allMultipleSelectsOnPage = document.querySelectorAll('[data-multiple-select]');
        this.id = id;
        this.options = options;
        this.placeholder = this.head.innerText;

        if (!container) return console.log('MultipleSelect error');

        this.init();
    }

    init() {
        this.container.setAttribute('data-multiple-select-id', this.id);

        // == toggle dropdonw ==
        this.head.addEventListener('click', (e) => {
            if (e.target.closest('.selected-filter-btn')) return;

            if (this.container.classList.contains('multiple-select--open')) {
                this.close();
            } else {
                this.open();
            }
        })

        document.addEventListener('click', (e) => {
            let closeBtnInMultipleSelect = false;
            if (e.target.closest('.selected-filter-btn__close')) {
                closeBtnInMultipleSelect = e.target.closest('.multiple-select');

                let parent = e.target.parentElement;
                if (parent.getAttribute('data-multiple-select-id') == this.id) {
                    this.removeSelectedButtons(parent.getAttribute('data-multiple-select-id'), parent.getAttribute('data-multiple-btn-id'));
                    this.unCheckInput(parent.getAttribute('data-multiple-btn-id'));
                }
            }

            if (e.target.closest('.multiple-select') || closeBtnInMultipleSelect) {
                if(e.target.closest('.multiple-select') === this.container) {
                    return;
                }
            }
            this.close();
        })
        // == toggle dropdonw ==

        // == multiple handler ==
        if (this.inputs) {
            this.inputs.forEach((input, index) => {
                input.setAttribute('data-multiple-select-id', this.id);
                input.setAttribute('data-multiple-select-input-id', index);

                input.addEventListener('change', (e) => {
                    if (e.target.checked) {
                        this.addSelectedButtons(this.id, index, input.value);
                    } else {
                        this.removeSelectedButtons(this.id, index);
                    }
                })
            })
        }

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
        // // == multiple handler ==
    }

    open() {
        let optionsContainer = this.container.querySelector('.multiple-select__options');
        this.container.classList.add('multiple-select--open');
        this.slideDown(optionsContainer, 100);

        // if(this.allMultipleSelectsOnPage.length) {
        //     this.allMultipleSelectsOnPage.forEach(multipleSelect => {
        //         if(multipleSelect === this.container) return;

        //     })
        // }
    }

    close() {
        let optionsContainer = this.container.querySelector('.multiple-select__options');
        this.container.classList.remove('multiple-select--open');
        this.slideUp(optionsContainer, 100)
    }

    addSelectedButtons(selectId, btnId, btnText) {
        if (!this.head.children.length) this.head.innerHTML = '';

        const addButton = (container) => {
            container.insertAdjacentHTML('beforeend', `
            <button class="selected-filter-btn" data-multiple-select-id="${selectId}" data-multiple-btn-id="${btnId}">
                <span class="selected-filter-btn__close"></span>
                ${btnText}
            </button>
            `)
        }

        addButton(this.head);

        if (this.options.duplicateSelectedButtons) {
            addButton(this.options.duplicateSelectedButtons);
        }
    }

    removeSelectedButtons(selectId, btnId) {
        let buttons = document.querySelectorAll(`.selected-filter-btn[data-multiple-select-id="${selectId}"][data-multiple-btn-id="${btnId}"]`);
        if (buttons.length) {
            buttons.forEach(btn => {
                btn.remove();
            })
        }

        if (!this.head.children.length) this.head.innerHTML = this.placeholder;
    }

    clearAll() {
        this.head.innerText = this.placeholder;
        this.inputs.forEach(input => {
            input.checked = false;
        })

        if (this.options.duplicateSelectedButtons) {
            let buttons = document.querySelectorAll(`.selected-filter-btn[data-multiple-select-id="${this.id}"]`);
            if (buttons.length) {
                buttons.forEach(btn => {
                    btn.remove();
                })
            }
        }
    }

    unCheckInput(inputId) {
        this.inputs.forEach(input => {
            if (input.getAttribute('data-multiple-select-input-id') === inputId) {
                input.checked = false;
            }
        })
    }
}