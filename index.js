// ==========================================
// 1. تعريف المتغيرات (Select Elements)
// ==========================================
const cartCount = document.querySelector('#cart-count');
const shopDropdown = document.getElementById('shopDropdown');
const submenu = shopDropdown ? shopDropdown.querySelector('.submenu') : null;

const track = document.querySelector('.cards-track');
const nextBtn = document.querySelector('.next-btn');
const prevBtn = document.querySelector('.prev-btn');
const cards = document.querySelectorAll('.product-card');

const navmenu = document.querySelector('.nav_menu');
const menuIcon = document.querySelector('#menu-icon');
const closeIcon = document.querySelector('#close-icon');

// جميع الأزرار والروابط التي تؤدي لسكشن داخلي
const scrollLinks = document.querySelectorAll('a[href^="#"], .shop-btn, .shop-now-btn');

let currentIndex = 0;

// ==========================================
// 2. الوظائف الأساسية (Functions)
// ==========================================

// تحديث عدد السلة من الـ LocalStorage
function initializeCart() {
    if (cartCount) {
        cartCount.innerText = localStorage.getItem('shoppify_cart') || 0;
    }
}

// دالة إضافة للمنتجات
function addToCart() {
    if (cartCount) {
        let currentNumber = parseInt(cartCount.innerText) || 0;
        currentNumber++;
        cartCount.innerText = currentNumber;
        localStorage.setItem('shoppify_cart', currentNumber);
    }
}

// منطق السلايدر (Slider Logic)
function getCardsPerView() {
    if (window.innerWidth <= 600) return 1;
    if (window.innerWidth <= 992) return 2;
    return 3;
}

function updateSlider() {
    if (!track || cards.length === 0) return;
    const cardsPerView = getCardsPerView();
    const maxIndex = Math.max(0, cards.length - cardsPerView);
    
    if (currentIndex > maxIndex) currentIndex = maxIndex;

    const cardWidth = cards[0].offsetWidth + 20;
    track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;

    if (prevBtn) prevBtn.disabled = currentIndex === 0;
    if (nextBtn) nextBtn.disabled = currentIndex >= maxIndex;
}

// دالة التمرير السلس العامة
function smoothScroll(targetId) {
    const targetSection = document.querySelector(targetId);
    if (targetSection) {
        targetSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// ==========================================
// 3. مستمعي الأحداث (Event Listeners)
// ==========================================

// تشغيل الوظائف عند تحميل الصفحة
window.addEventListener('load', () => {
    initializeCart();
    updateSlider();
});
window.addEventListener('resize', updateSlider);

// قائمة الـ Dropdown
if (shopDropdown && submenu) {
    shopDropdown.addEventListener('click', (e) => {
        e.stopPropagation();
        shopDropdown.classList.toggle('active');
        submenu.style.display = shopDropdown.classList.contains('active') ? 'block' : 'none';
    });

    document.addEventListener('click', () => {
        shopDropdown.classList.remove('active');
        submenu.style.display = 'none';
    });
}

// أزرار السلايدر
nextBtn?.addEventListener('click', () => {
    if (currentIndex < cards.length - getCardsPerView()) {
        currentIndex++;
        updateSlider();
    }
});

prevBtn?.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        updateSlider();
    }
});

// القائمة الجانبية (Mobile Menu)
menuIcon?.addEventListener('click', (e) => {
    e.preventDefault();
    navmenu?.classList.add('active');
});

closeIcon?.addEventListener('click', () => {
    navmenu?.classList.remove('active');
});

// التمرير السلس لكل روابط الموقع (Smooth Scroll for all)
scrollLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        let href = link.getAttribute('href') || '#value-packs'; // إذا كان زر وليس رابط سيفترض الذهاب للباكس
        
        if (href.startsWith('#')) {
            e.preventDefault();
            smoothScroll(href);
            
            // إغلاق المينيو إذا كان الرابط بداخلها
            if (navmenu?.classList.contains('active')) {
                navmenu.classList.remove('active');
            }
        }
    });
});