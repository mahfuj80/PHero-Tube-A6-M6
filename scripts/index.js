// all category data in one array:
const allData = [];
const request1 = fetch('https://openapi.programming-hero.com/api/videos/category/1000').then(response => response.json());
const request2 = fetch('https://openapi.programming-hero.com/api/videos/category/1000').then(response => response.json());
Promise.all([request1, request2])
    .then(([data1, data2]) => {

        console.log(data1.data, data2.data);
    })
    .catch(error => {
        console.error(error);
    });

// getUserAsync();