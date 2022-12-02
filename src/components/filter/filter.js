{
    let filterContainer = document.querySelector('[data-filter]');
    if(filterContainer) {
        let rows = filterContainer.querySelectorAll('.filter__row');
        if(rows.length) {
            rows.forEach(row => {
                let listHideItems = row.querySelectorAll('.filter__list li.hidden');
                let btnMore = row.querySelector('.filter__btn-more');

                if(listHideItems.length) {
                    if(btnMore) {
                        btnMore.classList.remove('hidden');

                        btnMore.addEventListener('click', () => {
                            if(row.classList.contains('show-all-items')) {
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
        if(buttonsOpenFilter.length) {
            buttonsOpenFilter.forEach(btn => {
                btn.addEventListener('click', () => {
                    filterContainer.classList.add('filter--open');
                    document.body.classList.add('overflow-hidden');
                })
            })
        }
        let buttonsCloseFilter = document.querySelectorAll('[data-action="close-filter"]');
        if(buttonsCloseFilter.length) {
            buttonsCloseFilter.forEach(btn => {
                btn.addEventListener('click', () => {
                    filterContainer.classList.remove('filter--open');
                    document.body.classList.remove('overflow-hidden');
                })
            })
        }
    }
}