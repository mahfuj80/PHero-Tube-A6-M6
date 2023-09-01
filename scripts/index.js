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

async function categoryDisplay(key) {
    const id = key.toString();
    const singleCategoryResponse = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`);
    const singleCategory = await singleCategoryResponse.json();
    const isDataAvailable = singleCategory.status;
    // console.log(typeof isDataAvailable);
}

fetchUrl();