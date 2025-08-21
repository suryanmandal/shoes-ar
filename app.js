let prevBtn = document.getElementById('prev');
let nextBtn = document.getElementById('next');
let carousel = document.querySelector('.carousel');
let items = carousel.querySelectorAll('.list .item');
let indicator = carousel.querySelector('.indicators');
let dots = indicator.querySelectorAll('.indicators ul li');

let active = 0;
let firstPosition = 0;
let lastPosition = items.length - 1;
let autoPlay;

const startAutoPlay = () => {
    clearInterval(autoPlay); 
    autoPlay = setInterval(() => {
        nextBtn.click();
    }, 5000);
}
startAutoPlay();

const setSlider = () => {
    let itemActiveOld = carousel.querySelector('.list .item.active');
    if(itemActiveOld) itemActiveOld.classList.remove('active');
    items[active].classList.add('active');

    let dotActiveOld = indicator.querySelector('.indicators ul li.active');
    if(dotActiveOld) dotActiveOld.classList.remove('active');
    dots[active].classList.add('active');

    indicator.querySelector('.number').innerText = '0' + (active + 1);
    startAutoPlay();
}
setSlider();

nextBtn.onclick = () => {
    active = active + 1 > lastPosition ? 0 : active + 1;
    carousel.style.setProperty('--calculation', 1);
    setSlider();
}
prevBtn.onclick = () => {
    active = active - 1 < firstPosition ? lastPosition : active - 1;
    carousel.style.setProperty('--calculation', -1);
    setSlider();
    clearInterval(autoPlay);
    autoPlay = setInterval(() => {
        nextBtn.click();
    }, 5000);
}
dots.forEach((item, position) => {
    item.onclick = () => {
        active = position;
        setSlider();
    }
});

// Filter functionality
const priceRange = document.getElementById('priceRange');
const priceValue = document.getElementById('priceValue');
const sizeFilters = document.querySelectorAll('input[name="size"]');
const categoryFilters = document.querySelectorAll('input[name="category"]');
const footwearItems = document.querySelectorAll('.footwear-item');

priceRange.oninput = () => {
    priceValue.textContent = priceRange.value;
    applyFilters();
};

sizeFilters.forEach(filter => {
    filter.onchange = applyFilters;
});

categoryFilters.forEach(filter => {
    filter.onchange = applyFilters;
});

function applyFilters() {
    const maxPrice = parseInt(priceRange.value);
    const selectedSizes = Array.from(sizeFilters)
        .filter(filter => filter.checked)
        .map(filter => filter.value);
    const selectedCategories = Array.from(categoryFilters)
        .filter(filter => filter.checked)
        .map(filter => filter.value);

    footwearItems.forEach(item => {
        const price = parseInt(item.dataset.price);
        const size = item.dataset.size;
        const category = item.dataset.category;

        const priceMatch = price <= maxPrice;
        const sizeMatch = selectedSizes.length === 0 || selectedSizes.includes(size);
        const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(category);

        if (priceMatch && sizeMatch && categoryMatch) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}