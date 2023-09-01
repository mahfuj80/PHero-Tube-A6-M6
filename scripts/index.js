// all category data in one array:
async function fetchUrl() {
    const categoryNameResponse = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const categoriesName = await categoryNameResponse.json();
    // Pass category to the category Name section;
    createCategoryItem(categoriesName.data);
};
// Dynamic Category;
const createCategoryItem = (categoriesName) => {
    const categoryContainer = document.getElementById('category-container');
    categoriesName.forEach(category => {
        const button = document.createElement('div')
        button.innerHTML = `
        <button onclick="categoryDisplay(${category.category_id})" id="${category.category_id}"
                class="outline-none py-2 rounded-lg px-5 text-black bg-[#25252526] focus:bg-[#FF1F3D] focus:font-semibold focus:text-white">${category.category}</button>
        `
        categoryContainer.appendChild(button);
    });
    document.getElementById('1000').focus();
    document.getElementById('1000').click();
}

let rememberKey = '';
async function categoryDisplay(key, isShort = 0) {
    // Need Previous key for Shorting by view;
    if (key === 'previousKey') {
        key = rememberKey;
    };
    const id = key.toString();
    rememberKey = id;
    const singleCategoryResponse = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`);
    const singleCategory = await singleCategoryResponse.json();
    const isDataAvailable = singleCategory.status;
    const itemsContainer = document.getElementById('items-container')
    if (!isDataAvailable) {
        itemsContainer.innerHTML = '';
        itemsContainer.innerHTML = `
        <div class="flex flex-col justify-center items-center gap-8 py-10 h-[70vh] m-auto">
            <img class="" src="./images/Icon.png" alt="Icon">
            <h1 class="text-black font-bold text-4xl text-center">Oops!! Sorry, There is no <br> content here</h1>
        </div>
        `
    } else if (isDataAvailable) {
        itemsContainer.innerHTML = '';
        const singleCategoryItems = singleCategory.data;
        console.log(singleCategoryItems);
        singleCategoryItems.forEach(singleItems => {
            console.log(singleItems.category_id);
        });
    }
    // console.log(typeof isDataAvailable);
}

fetchUrl();