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
        this.selectedInputs = [];

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

                    if(this.options.on?.afterChange) {
                        let input = this.inputs.filter(input => input.getAttribute('data-multiple-select-input-id') === parent.getAttribute('data-multiple-btn-id'));
                        this.options.on?.afterChange(input[0]);
                    }
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
                
                let text = input.parentElement.querySelector('.multiple-select__option-text').innerText;

                if(input.checked) {
                    this.addSelectedButtons(this.id, index.toString(), text, input);

                    if(this.options.on?.afterChange) {
                        this.options.on?.afterChange(input);
                    }

                }

                input.addEventListener('change', (e) => {
                    if (e.target.checked) {
                        this.addSelectedButtons(this.id, index.toString(), text, input);
                    } else {
                        this.removeSelectedButtons(this.id, index.toString());
                    }

                    if(this.options.on?.afterChange) {
                        this.options.on?.afterChange(input);
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
    }

    close() {
        let optionsContainer = this.container.querySelector('.multiple-select__options');
        this.container.classList.remove('multiple-select--open');
        this.slideUp(optionsContainer, 100)
    }

    addButton(container, selectId, btnId, btnText, input) {

        let el = container.querySelector(`[data-input-name="${input.name}"][data-input-value="${input.value}"]`);
        if(el) return;

        container.insertAdjacentHTML('beforeend', `
        <button class="selected-filter-btn" data-multiple-select-id="${selectId}" data-multiple-btn-id="${btnId}" data-input-name="${input.name}" data-input-value="${input.value}">
            <span class="selected-filter-btn__close"></span>
            ${btnText}
        </button>
        `)

    }

    addSelectedButtons(selectId, btnId, btnText, input) {
        if(this.selectedInputs.includes(btnId)) return;

        if (!this.head.children.length) this.head.innerHTML = '';

        this.addButton(this.head, selectId, btnId, btnText, input);

        if (this.options.duplicateSelectedButtons) {
            this.addButton(this.options.duplicateSelectedButtons, selectId, btnId, btnText, input);
        }

        this.selectedInputs.push(btnId);
    }

    removeSelectedButtons(selectId, btnId) {
        let buttons = document.querySelectorAll(`.selected-filter-btn[data-multiple-select-id="${selectId}"][data-multiple-btn-id="${btnId}"]`);
        if (buttons.length) {
            buttons.forEach(btn => {
                btn.remove();
            })
        }

        if (!this.head.children.length) this.head.innerHTML = this.placeholder;

        this.selectedInputs = this.selectedInputs.filter(i => i != btnId);
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

        this.selectedInputs = [];
    }

    unCheckInput(inputId) {
        this.inputs.forEach(input => {
            if (input.getAttribute('data-multiple-select-input-id') === inputId) {
                input.checked = false;
            }
        })
    }

    setInputStateByName(name, value, state) {
        if(!name) return;
        
        let input = this.inputs.filter(input => input.name === name && input.value === value)[0];
        if(input) {
            input.checked = state;

            let btnId = input.getAttribute('data-multiple-select-input-id');

            if(state) {
                if(this.selectedInputs.includes(btnId)) return;

                if (!this.head.children.length) this.head.innerHTML = '';
                let text = input.parentElement.querySelector('.multiple-select__option-text').innerText;
                this.addButton(
                    this.head, 
                    this.id, 
                    btnId, 
                    text, 
                    input
                );

                this.selectedInputs.push(btnId);
            } else {
                this.removeSelectedButtons(this.id, input.getAttribute('data-multiple-select-input-id'));
            }
        }

    }

    update() {
        if (this.inputs) {
            this.inputs.forEach((input, index) => {
                let text = input.parentElement.querySelector('.multiple-select__option-text').innerText;

                if(input.checked) {
                    this.addSelectedButtons(this.id, index.toString(), text, input);

                    if(this.options.on?.afterChange) {
                        this.options.on?.afterChange(input);
                    }
                }
            })
        }
    }
}

