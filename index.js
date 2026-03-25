const cartCount = document.querySelector('#cart-count');
const shopDropdown = document.getElementById('shopDropdown');
const submenu = shopDropdown ? shopDropdown.querySelector('.submenu') : null;

// 2. الآن يمكنك استخدام cartCount بأمان
if (cartCount) {
    cartCount.innerText = localStorage.getItem('shoppify_cart') || 0;
}

// --- باقي الكود الخاص بـ Dropdown ---
if (shopDropdown && submenu) {
    shopDropdown.addEventListener('click', function (e) {
        e.stopPropagation(); 
        this.classList.toggle('active');
        submenu.style.display = this.classList.contains('active') ? 'block' : 'none';
    });

    document.addEventListener('click', function () {
        shopDropdown.classList.remove('active');
        submenu.style.display = 'none';
    });
}

// --- كود الـ Slider (تأكد أن العناصر موجودة في HTML) ---
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
    if (!track || cards.length === 0) return; // حماية في حال عدم وجود العناصر

    const cardsPerView = getCardsPerView();
    const totalCards = cards.length;
    const maxIndex = Math.max(0, totalCards - cardsPerView);

    if (currentIndex > maxIndex) currentIndex = maxIndex;

    const cardWidth = cards[0].offsetWidth + 20;
    track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;

    if (prevBtn) prevBtn.disabled = currentIndex === 0;
    if (nextBtn) nextBtn.disabled = currentIndex >= maxIndex;
}

// أضف مستمعات الأحداث للأزرار مع التأكد من وجودها
if (nextBtn) {
    nextBtn.addEventListener('click', () => {
        const cardsPerView = getCardsPerView();
        if (currentIndex < cards.length - cardsPerView) {
            currentIndex++;
            updateSlider();
        }
    });
}

if (prevBtn) {
    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateSlider();
        }
    });
}

window.addEventListener('resize', updateSlider);
window.addEventListener('load', updateSlider);

// --- دالة إضافة للمنتجات ---
function addToCart() {
    if (cartCount) {
        let currentNumber = parseInt(cartCount.innerText) || 0;
        currentNumber++;
        cartCount.innerText = currentNumber;
        // نصيحة: يفضل حفظ القيمة الجديدة في الـ localStorage هنا أيضاً
        localStorage.setItem('shoppify_cart', currentNumber);
    }
}

// --- كود القائمة الجانبية (Sidebar) ---
const navmenu = document.querySelector('.nav_menu');
const menuIcon = document.querySelector('#menu-icon');
const closeIcon = document.querySelector('#close-icon');

if (menuIcon && navmenu) {
    menuIcon.addEventListener('click', (e) => {
        e.preventDefault();
        navmenu.classList.add('active');
    });
}

if (closeIcon && navmenu) {
    closeIcon.addEventListener('click', () => {
        navmenu.classList.remove('active');
    });
}

// البحث عن كل الأزرار التي قد تؤدي لسكشن الـ Packs
const shopButtons = document.querySelectorAll('.shop-btn, .shop-now-btn');

shopButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault(); // لمنع أي سلوك افتراضي
        const packsSection = document.getElementById('value-packs');
        
        if (packsSection) {
            packsSection.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start' 
            });
        }
    });
});

// --- كود التمرير السلس وإغلاق المينيو عند الضغط على الروابط ---

// نحدد كل الروابط الموجودة داخل القائمة الجانبية
const navLinks = document.querySelectorAll('.nav_menu a');

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        // 1. الحصول على الـ ID الخاص بالسكشن من الـ href (مثلاً #packs)
        const targetId = link.getAttribute('href');

        // نتحقق إذا كان الرابط هو فعلاً ID داخلي (يبدأ بـ #) وليس صفحة خارجية
        if (targetId.startsWith('#')) {
            e.preventDefault(); // منع القفز المفاجئ
            
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // 2. التمرير السلس للسكشن
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                // 3. إغلاق المينيو بعد الضغط (إزالة كلاس active)
                if (navmenu) {
                    navmenu.classList.remove('active');
                }
            }
        }
    });
});