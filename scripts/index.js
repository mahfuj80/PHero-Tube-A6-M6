// all category data in one array:
const category = fetch('https://openapi.programming-hero.com/api/videos/categories').then(response => response.json());
const all = fetch('https://openapi.programming-hero.com/api/videos/category/1000').then(response => response.json());
const music = fetch('https://openapi.programming-hero.com/api/videos/category/1001').then(response => response.json());
const comedy = fetch('https://openapi.programming-hero.com/api/videos/category/1003').then(response => response.json());
const drawing = fetch('https://openapi.programming-hero.com/api/videos/category/1005').then(response => response.json());

Promise.all([category, all, music, comedy, drawing])
    .then(([category, all, music, comedy, drawing]) => {

        console.log(category, all, music, comedy, drawing);
    })
    .catch(error => {
        console.error(error);
    });
