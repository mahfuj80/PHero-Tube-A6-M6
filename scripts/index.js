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
    // focusing all category for color it;
    document.getElementById('1000').focus();
    // clicking it to show all category as default;
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
    // Fetching Data From API
    const singleCategoryResponse = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`);
    const singleCategory = await singleCategoryResponse.json();
    // Get the Status is Data Available or Not;
    const isDataAvailable = singleCategory.status;
    // Get the items container for showing data /  no data available message;
    const cardContainer = document.getElementById('card-container');
    // Check Data is available or not?
    if (!isDataAvailable) {
        // if Data is not available;
        // clear the previous Html of item container
        cardContainer.innerHTML = '';
        // Set the error message html;
        cardContainer.innerHTML = `
        <div class="col-span-4 flex flex-col justify-center items-center gap-8 py-10 h-[70vh] m-auto">
            <img class="" src="./images/Icon.png" alt="Icon">
            <h1 class="text-black font-bold text-4xl text-center">Oops!! Sorry, There is no <br> content here</h1>
        </div>
        `;
        // if data is available;
    } else if (isDataAvailable) {
        // clean the previous html elements;
        cardContainer.innerHTML = '';
        // getting the array for run forEach loop and showing the data;
        const singleCategoryItems = singleCategory.data;
        singleCategoryItems.forEach(singleItems => {
            const card = document.createElement('div');
            card.innerHTML = `
                <!-- Card Start -->
                <div class="card relative">
                    <figure><img class="rounded-xl w-[100%] md:w-[400px] md:h-[224px]" src="${singleItems.thumbnail}" alt="Shoes" /></figure>
                    <div class="card-body flex flex-row items-start gap-5 px-0">
                        <div>
                            <img flex-row class=" h-[60px] w-16 rounded-full" src="${singleItems.authors[0].profile_picture}"
                                alt="icon">
                        </div>
                        <div class="space-y-2">
                            <h2 class="card-title font-bold text-black">${singleItems.title}
                            </h2>
                            <div class="flex gap-2 items-center">
                                <p class="flex-initial text-[#171717b3]">${singleItems.authors[0].profile_name}</p>
                                <i class="fa-solid fa-circle-check" style="color: #3881ff;"></i>
                            </div>
                            <p class="text-[#171717b3]">${singleItems.others.views} views</p>
                        </div>
                    </div>
                    <div
                        class="absolute text-white font-light px-3 py-1 rounded bg-[#171717] top-[45%] right-5 md:top-[35%] lg:top-[45%]">
                        ${singleItems.others.posted_date}
                    </div>
                </div>
                <!-- Card End -->
            `;
            cardContainer.appendChild(card);
            // console.log(singleItems.thumbnail);
        });
    };
    // console.log(typeof isDataAvailable);
}

fetchUrl();