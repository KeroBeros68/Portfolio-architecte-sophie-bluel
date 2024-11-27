async function main() {
    let gallery = await fetchGallery();
    let categories = await fetchCategories();

    showGallery(gallery)
    generateFilters(categories);

    const buttons = document.querySelectorAll('.filterButton');
    buttons.forEach(button => {
        button.addEventListener('click', event => {
            const button = event.target.innerText;
            filter(button,gallery,categories);
        });
    });


}

main()

