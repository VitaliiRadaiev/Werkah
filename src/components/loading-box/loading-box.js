{
    let loadingBoxElements = document.querySelectorAll('[data-loading-box]');
    if(loadingBoxElements.length) {
        loadingBoxElements.forEach(loadingBox => {
            let files = []
            let input = loadingBox.querySelector('input');
            let namesContainer = loadingBox.querySelector('.loading-box__names');
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