{
    let multipleSelectsObjects = [];
    let filter = null;
    
    let multipleSelects = document.querySelectorAll('[data-multiple-select]');
    if(multipleSelects.length) {
        let btnClearSelectedFilters = document.querySelector('[data-clear-selected-filters]');
        multipleSelects.forEach((select, index) => {
            let selectedFilterList = document.querySelector('.hero-filter__selected-filters-list');

            let multipleSelect = new MultipleSelect(select, index, {
                duplicateSelectedButtons: selectedFilterList,
                clearAllBtn: btnClearSelectedFilters,
                on: {
                    afterChange: (input) => {
                        if(input.name?.trim()) {
                            if(filter) {
                                filter.setInputStateByName(input.name?.trim(), input.value, input.checked);
                            }
                        }
                    }
                }
            })

            multipleSelectsObjects.push(multipleSelect);
        })
    }

    let filterContainer = document.querySelector('[data-filter]');
    if(filterContainer) {
        let btnClearSelectedFilters = document.querySelector('[data-clear-selected-filters]');
        let selectedFilterList = document.querySelector('.hero-filter__selected-filters-list');
        filter = new Filter(filterContainer, 4, {
            duplicateSelectedButtons: selectedFilterList,
            clearAllBtn: btnClearSelectedFilters,
            on: {
                afterChange: (input) => {
                    if(input.name?.trim()) {
                        if(multipleSelectsObjects.length) {
                            multipleSelectsObjects.forEach(multipleSelect => {
                                multipleSelect.setInputStateByName(input.name?.trim(), input.value, input.checked);
                            })
                        }
                    }
                }
            }
        });

        multipleSelectsObjects.forEach(multipleSelect => {
            multipleSelect.update();
        })
    }
}