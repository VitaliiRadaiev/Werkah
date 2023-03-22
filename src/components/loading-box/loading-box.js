{
    let loadingBoxElements = document.querySelectorAll('[data-loading-box], .gfield.form__load');
    if(loadingBoxElements.length) {
        loadingBoxElements.forEach(loadingBox => {
            let files = []
            let input = loadingBox.querySelector('input');
            let namesContainer = loadingBox.querySelector('.loading-box__names');



            if(!namesContainer) {
                namesContainer = document.createElement('div');
                namesContainer.className = 'loading-box__names';

                let container = loadingBox.querySelector('.ginput_container');
                if(container) {
                    container.append(namesContainer);
                }
            }

            if(input) {
                const changeHandler = (event) => {
                    if (!event.target.files.length) {
                        return
                    }
    
                    files = Array.from(event.target.files);
    
                    let result = files.map(item => item.name);
                    namesContainer.innerHTML = result.join('<br> ');
                }
    
                input.addEventListener('change', changeHandler);

                loadingBox.addEventListener('dragenter', (e) => {
                    loadingBox.classList.add('file-is-over');
                });
                loadingBox.addEventListener('dragleave', (e) => {
                    loadingBox.classList.remove('file-is-over');
                });
            }
        })
    }
}