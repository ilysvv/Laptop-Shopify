    const shopDropdown = document.getElementById('shopDropdown');
    const submenu = shopDropdown.querySelector('.submenu');
    const cartCount = document.querySelector('#cart-count');

    shopDropdown.addEventListener('click', function (e) {
        e.stopPropagation(); 
        
        this.classList.toggle('active');
        
        if (this.classList.contains('active')) {
            submenu.style.display = 'block';
        } else {
            submenu.style.display = 'none';
        }
    });

    document.addEventListener('click', function () {
        shopDropdown.classList.remove('active');
        submenu.style.display = 'none';
    });

const track = document.querySelector('.cards-track');
const nextBtn = document.querySelector('.next-btn');
const prevBtn = document.querySelector('.prev-btn');
const cards = document.querySelectorAll('.product-card');

let currentIndex = 0;

function getCardsPerView() {
    if (window.innerWidth <= 600) return 1;
    if (window.innerWidth <= 992) return 2;
    return 3; 
}

function updateSlider() {
    const cardsPerView = getCardsPerView();
    const totalCards = cards.length;
    const maxIndex = totalCards - cardsPerView;

    if (currentIndex > maxIndex) currentIndex = maxIndex;

    const cardWidth = cards[0].offsetWidth + 20;
    track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;

    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex >= maxIndex;
}

nextBtn.addEventListener('click', () => {
    const cardsPerView = getCardsPerView();
    if (currentIndex < cards.length - cardsPerView) {
        currentIndex++;
        updateSlider();
    }
});

prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        updateSlider();
    }
});

window.addEventListener('resize', updateSlider);
window.addEventListener('load', updateSlider);

function addToCart() {
    let currentNumber = parseInt(cartCount.innerText);
    currentNumber++;
    cartCount.innerText = currentNumber;
}

const navmenu = document.querySelector('.nav_menu');
const menuIcon = document.querySelector('#menu-icon');
const closeIcon = document.querySelector('#close-icon');

// فتح القائمة
if (menuIcon) {
    menuIcon.addEventListener('click', (e) => {
        e.preventDefault(); // مهم جداً عشان الـ <a> ميعملش Refresh للصفحة
        navmenu.classList.add('active');
        console.log("Menu Opened"); // للتأكد في الـ Console إن الزرار شغال
    });
}

// إغلاق القائمة
if (closeIcon) {
    closeIcon.addEventListener('click', () => {
        navmenu.classList.remove('active');
        console.log("Menu Closed");
    });
}