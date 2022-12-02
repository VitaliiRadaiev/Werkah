{
    let multipleSelects = document.querySelectorAll('[data-multiple-select]');
    if(multipleSelects.length) {
        let btnClearSelectedFilters = document.querySelector('[data-clear-selected-filters]');
        multipleSelects.forEach((select, index) => {
            let selectedFilterList = document.querySelector('.hero-filter__selected-filters-list');

            let multipleSelect = new MultipleSelect(select, index, {
                duplicateSelectedButtons: selectedFilterList,
                clearAllBtn: btnClearSelectedFilters,
            })
        })
    }
}