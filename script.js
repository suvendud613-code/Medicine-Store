// ========== Products Data ==========
const products = [
    { id:1, name:'Aspirin 500mg', category:'pain-relief', price:45.99, originalPrice:59.99, rating:4.8, reviews:256, icon:'💊', manufacturer:'MediCorp', description:'Effective pain relief and fever reducer. FDA approved.' },
    { id:2, name:'Vitamin C 1000mg', category:'vitamins', price:35.50, originalPrice:49.99, rating:4.9, reviews:512, icon:'🥗', manufacturer:'HealthPlus', description:'Boost your immune system with pure Vitamin C supplements.' },
    { id:3, name:'Cough Syrup', category:'cold-flu', price:28.99, originalPrice:39.99, rating:4.5, reviews:189, icon:'🤧', manufacturer:'PharmaCare', description:'Fast-acting cough relief for cold and flu symptoms.' },
    { id:4, name:'Digestive Enzymes', category:'digestion', price:52.00, originalPrice:69.99, rating:4.6, reviews:134, icon:'🫖', manufacturer:'WellnessLabs', description:'Support healthy digestion with natural enzymes.' },
    { id:5, name:'Anti-Fungal Cream', category:'skin-care', price:32.50, originalPrice:45.00, rating:4.7, reviews:98, icon:'🧴', manufacturer:'DermaCare', description:'Effective treatment for fungal skin infections.' },
    { id:6, name:'First Aid Kit', category:'first-aid', price:65.00, originalPrice:89.99, rating:4.8, reviews:267, icon:'🩹', manufacturer:'SafeGuard', description:'Complete first aid kit for home and travel.' },
    { id:7, name:'Ibuprofen 400mg', category:'pain-relief', price:24.50, originalPrice:34.99, rating:4.7, reviews:421, icon:'💊', manufacturer:'MediCorp', description:'Fast pain relief for headaches and body aches.' },
    { id:8, name:'Multivitamin Complex', category:'vitamins', price:42.99, originalPrice:59.99, rating:4.6, reviews:334, icon:'🥗', manufacturer:'VitaHealth', description:'Complete daily nutrition with essential vitamins and minerals.' },
    { id:9, name:'Paracetamol 650mg', category:'pain-relief', price:18.99, originalPrice:25.99, rating:4.9, reviews:620, icon:'💊', manufacturer:'MediCorp', description:'Trusted fever and pain relief medicine.' },
    { id:10, name:'Omega-3 Fish Oil', category:'vitamins', price:58.00, originalPrice:79.99, rating:4.7, reviews:290, icon:'🐟', manufacturer:'HealthPlus', description:'Heart-healthy Omega-3 fatty acids capsules.' },
    { id:11, name:'Allergy Relief', category:'cold-flu', price:39.99, originalPrice:54.99, rating:4.4, reviews:175, icon:'🤧', manufacturer:'PharmaCare', description:'24-hour allergy symptom relief tablets.' },
    { id:12, name:'Antiseptic Solution', category:'first-aid', price:22.00, originalPrice:29.99, rating:4.6, reviews:145, icon:'🧪', manufacturer:'SafeGuard', description:'Medical-grade antiseptic for wound cleaning.' }
];

let cart = JSON.parse(localStorage.getItem('cart')) || [];
let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

// ========== Initialize ==========
document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
    initDarkMode();
    initScrollReveal();
    initBackToTop();
    initAnimatedCounters();
    initTypewriter();

    if (document.getElementById('productsGrid')) displayProducts(products);
    if (document.getElementById('featuredProducts')) displayFeaturedProducts(products.slice(0, 4));
    if (document.getElementById('cartItems')) updateCartDisplay();

    // Create toast container
    if (!document.querySelector('.toast-container')) {
        const tc = document.createElement('div');
        tc.className = 'toast-container';
        document.body.appendChild(tc);
    }
});

// ========== Dark Mode ==========
function initDarkMode() {
    if (localStorage.getItem('darkMode') === 'true') document.body.classList.add('dark-mode');
    document.querySelectorAll('.dark-toggle').forEach(btn => {
        btn.addEventListener('click', toggleDarkMode);
        updateDarkToggleIcon(btn);
    });
}
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDark);
    document.querySelectorAll('.dark-toggle').forEach(updateDarkToggleIcon);
}
function updateDarkToggleIcon(btn) {
    btn.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
}

// ========== Navigation ==========
function toggleMenu() {
    const nav = document.querySelector('.nav-menu');
    const ham = document.querySelector('.hamburger');
    nav.classList.toggle('active');
    ham.classList.toggle('active');
}

// ========== Scroll Reveal ==========
function initScrollReveal() {
    const elements = document.querySelectorAll('.feature-card, .category-card, .product-card, .team-card, .contact-card, .timeline-item, .faq-item, .about-text, .about-image');
    elements.forEach(el => el.classList.add('reveal'));
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => entry.target.classList.add('visible'), i * 80);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    elements.forEach(el => observer.observe(el));
}

// ========== Back to Top ==========
function initBackToTop() {
    const btn = document.querySelector('.back-to-top');
    if (!btn) return;
    window.addEventListener('scroll', () => {
        btn.classList.toggle('visible', window.scrollY > 400);
    });
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// ========== Animated Counters ==========
function initAnimatedCounters() {
    const counters = document.querySelectorAll('.stat-number');
    if (!counters.length) return;
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    counters.forEach(c => observer.observe(c));
}
function animateCounter(el) {
    const target = parseInt(el.dataset.target) || 0;
    const suffix = el.dataset.suffix || '';
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
        current += step;
        if (current >= target) { current = target; clearInterval(timer); }
        el.textContent = Math.floor(current).toLocaleString() + suffix;
    }, 16);
}

// ========== Typewriter ==========
function initTypewriter() {
    const el = document.getElementById('typewriter');
    if (!el) return;
    const phrases = ['Your Health, Our Priority', 'Quality Medicines Delivered', 'Trusted by Thousands', '24/7 Expert Support'];
    let pi = 0, ci = 0, deleting = false;
    function type() {
        const phrase = phrases[pi];
        el.textContent = deleting ? phrase.substring(0, ci--) : phrase.substring(0, ci++);
        if (!deleting && ci > phrase.length) { setTimeout(() => { deleting = true; type(); }, 2000); return; }
        if (deleting && ci < 0) { deleting = false; pi = (pi + 1) % phrases.length; }
        setTimeout(type, deleting ? 40 : 80);
    }
    type();
}

// ========== Product Card HTML ==========
function generateProductCardHTML(product) {
    const discount = Math.round((1 - product.price / product.originalPrice) * 100);
    const isWished = wishlist.includes(product.id);
    return `
        <div class="product-card">
            <div class="product-image">
                ${product.icon}
                ${discount > 0 ? `<div class="product-badge">-${discount}%</div>` : ''}
                <button class="product-wishlist ${isWished ? 'active' : ''}" onclick="toggleWishlist(${product.id}, this)" title="Wishlist">${isWished ? '❤️' : '🤍'}</button>
            </div>
            <div class="product-info">
                <div class="product-category-tag">${product.category.replace('-',' ')}</div>
                <h3 class="product-name">${product.name}</h3>
                <div class="product-rating"><span class="stars">★★★★★</span> ${product.rating}</div>
                <div class="product-price">
                    <span class="original-price">₹${product.originalPrice}</span>
                    <span class="current-price">₹${product.price}</span>
                </div>
                <div class="card-actions">
                    <button class="btn btn-primary" onclick="addToCart(${product.id})">Add to Cart</button>
                    <button class="btn btn-quick" onclick="openQuickView(${product.id})">👁</button>
                </div>
            </div>
        </div>`;
}

function displayProducts(list) {
    const grid = document.getElementById('productsGrid');
    if (grid) grid.innerHTML = list.map(generateProductCardHTML).join('');
}
function displayFeaturedProducts(list) {
    const grid = document.getElementById('featuredProducts');
    if (grid) grid.innerHTML = list.map(generateProductCardHTML).join('');
}

// ========== Category Filter ==========
function filterProducts(category) {
    localStorage.setItem('filterCategory', category);
    window.location.href = 'products.html';
}

// ========== Wishlist ==========
function toggleWishlist(id, btn) {
    const idx = wishlist.indexOf(id);
    if (idx > -1) { wishlist.splice(idx, 1); btn.classList.remove('active'); btn.textContent = '🤍'; showToast('Removed from wishlist', 'info'); }
    else { wishlist.push(id); btn.classList.add('active'); btn.textContent = '❤️'; showToast('Added to wishlist!', 'success'); }
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
}

// ========== Quick View Modal ==========
function openQuickView(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;
    const discount = Math.round((1 - product.price / product.originalPrice) * 100);
    let overlay = document.querySelector('.modal-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'modal-overlay';
        overlay.addEventListener('click', e => { if (e.target === overlay) closeQuickView(); });
        document.body.appendChild(overlay);
    }
    overlay.innerHTML = `
        <div class="modal-content">
            <button class="modal-close" onclick="closeQuickView()">✕</button>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:1.5rem;align-items:start">
                <div class="product-image" style="height:250px;border-radius:12px">${product.icon}</div>
                <div>
                    <div class="product-category-tag">${product.category.replace('-',' ')}</div>
                    <h2 style="font-size:1.4rem;font-weight:800;margin-bottom:0.5rem">${product.name}</h2>
                    <div class="product-rating" style="margin-bottom:0.8rem"><span class="stars">★★★★★</span> ${product.rating} (${product.reviews} reviews)</div>
                    <div class="product-price" style="margin-bottom:1rem">
                        <span class="original-price">₹${product.originalPrice}</span>
                        <span class="current-price">₹${product.price}</span>
                        <span class="discount-badge">-${discount}%</span>
                    </div>
                    <p style="color:var(--text-secondary);font-size:0.92rem;margin-bottom:1rem;line-height:1.7">${product.description}</p>
                    <p style="font-size:0.88rem;color:var(--text-muted);margin-bottom:1.5rem">By ${product.manufacturer}</p>
                    <button class="btn btn-primary" onclick="addToCart(${product.id});closeQuickView()">Add to Cart</button>
                </div>
            </div>
        </div>`;
    requestAnimationFrame(() => overlay.classList.add('active'));
    document.body.style.overflow = 'hidden';
}
function closeQuickView() {
    const overlay = document.querySelector('.modal-overlay');
    if (overlay) { overlay.classList.remove('active'); document.body.style.overflow = ''; }
}
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeQuickView(); });

// ========== Cart ==========
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    const existing = cart.find(item => item.id === productId);
    if (existing) existing.quantity += 1;
    else cart.push({ id: product.id, name: product.name, price: product.price, quantity: 1, icon: product.icon });
    saveCart(); updateCartCount();
    showToast(`${product.name} added to cart!`, 'success');
}
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart(); updateCartDisplay(); updateCartCount();
    showToast('Item removed from cart', 'info');
}
function updateQuantity(productId, newQty) {
    const item = cart.find(i => i.id === productId);
    if (item) { item.quantity = Math.max(1, parseInt(newQty)); saveCart(); updateCartDisplay(); }
}
function saveCart() { localStorage.setItem('cart', JSON.stringify(cart)); }
function updateCartCount() {
    const count = cart.reduce((s, i) => s + i.quantity, 0);
    document.querySelectorAll('.cart-count').forEach(el => el.textContent = count);
}

function updateCartDisplay() {
    const container = document.getElementById('cartItems');
    const empty = document.getElementById('emptyCart');
    if (!container) return;
    if (cart.length === 0) {
        container.style.display = 'none';
        if (empty) empty.style.display = 'block';
        updateCartSummary(); return;
    }
    container.style.display = 'block';
    if (empty) empty.style.display = 'none';
    container.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-image">${item.icon}</div>
            <div class="cart-item-info">
                <h3>${item.name}</h3>
                <p>₹${item.price.toFixed(2)} each</p>
                <div class="cart-item-details"><span>Subtotal: ₹${(item.price * item.quantity).toFixed(2)}</span></div>
            </div>
            <div class="cart-item-actions">
                <div class="quantity-selector">
                    <button onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                    <input type="number" value="${item.quantity}" onchange="updateQuantity(${item.id}, this.value)" min="1">
                    <button onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                </div>
                <button class="remove-btn" onclick="removeFromCart(${item.id})">Remove</button>
            </div>
        </div>`).join('');
    updateCartSummary();
}

function updateCartSummary() {
    if (!document.getElementById('subtotal')) return;
    const subtotal = cart.reduce((s, i) => s + i.price * i.quantity, 0);
    const shipping = subtotal > 0 ? (subtotal > 100 ? 0 : 10) : 0;
    const tax = subtotal * 0.1;
    const total = subtotal + shipping + tax;
    document.getElementById('subtotal').textContent = `₹${subtotal.toFixed(2)}`;
    document.getElementById('shipping').textContent = shipping === 0 ? 'FREE' : `₹${shipping.toFixed(2)}`;
    document.getElementById('tax').textContent = `₹${tax.toFixed(2)}`;
    document.getElementById('total').textContent = `₹${total.toFixed(2)}`;
}

// ========== Toast Notifications ==========
function showToast(message, type = 'info') {
    const container = document.querySelector('.toast-container') || (() => {
        const c = document.createElement('div'); c.className = 'toast-container'; document.body.appendChild(c); return c;
    })();
    const icons = { success: '✅', error: '❌', info: 'ℹ️' };
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `<span>${icons[type] || ''}</span><span>${message}</span>`;
    container.appendChild(toast);
    setTimeout(() => { toast.style.animation = 'slideOutRight 0.4s ease forwards'; setTimeout(() => toast.remove(), 400); }, 3000);
}

// ========== Product Tabs ==========
function switchTab(tabName) {
    document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.tab-button').forEach(b => b.classList.remove('active'));
    const pane = document.getElementById(tabName);
    if (pane) pane.classList.add('active');
    if (event && event.target) event.target.classList.add('active');
}

// ========== Quantity Controls (Detail Page) ==========
function increaseQty() { const q = document.getElementById('quantity'); if (q) q.value = parseInt(q.value) + 1; }
function decreaseQty() { const q = document.getElementById('quantity'); if (q && parseInt(q.value) > 1) q.value = parseInt(q.value) - 1; }

// ========== Search & Sort ==========
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        let timer;
        searchInput.addEventListener('input', function(e) {
            clearTimeout(timer);
            timer = setTimeout(() => {
                const q = e.target.value.toLowerCase();
                const filtered = products.filter(p => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
                displayProducts(filtered);
            }, 300);
        });
    }
    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) {
        sortSelect.addEventListener('change', function(e) {
            let sorted = [...products];
            switch(e.target.value) {
                case 'price-low': sorted.sort((a,b) => a.price - b.price); break;
                case 'price-high': sorted.sort((a,b) => b.price - a.price); break;
                case 'popular': sorted.sort((a,b) => b.reviews - a.reviews); break;
            }
            displayProducts(sorted);
        });
    }
    // Apply saved category filter
    const savedCat = localStorage.getItem('filterCategory');
    if (savedCat && document.getElementById('productsGrid')) {
        const filtered = products.filter(p => p.category === savedCat);
        displayProducts(filtered);
        localStorage.removeItem('filterCategory');
    }
});

// ========== Checkout ==========
document.addEventListener('DOMContentLoaded', function() {
    const checkoutBtn = document.getElementById('checkoutBtn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
            if (cart.length === 0) { showToast('Your cart is empty!', 'error'); return; }
            window.location.href = 'checkout.html';
        });
    }
});

// ========== Checkout Multi-Step ==========
let currentStep = 1;
function goToStep(step) {
    if (step < 1 || step > 4) return;
    currentStep = step;
    document.querySelectorAll('.checkout-step').forEach(s => s.classList.remove('active'));
    const target = document.getElementById('step' + step);
    if (target) target.classList.add('active');
    document.querySelectorAll('.progress-step').forEach((ps, i) => {
        ps.classList.remove('active', 'completed');
        if (i + 1 < step) ps.classList.add('completed');
        if (i + 1 === step) ps.classList.add('active');
    });
    if (step === 4) populateConfirmation();
}
function nextStep() { goToStep(currentStep + 1); }
function prevStep() { goToStep(currentStep - 1); }

function populateConfirmation() {
    const orderItems = document.getElementById('orderItemsList');
    const orderTotal = document.getElementById('orderTotal');
    if (orderItems) {
        orderItems.innerHTML = cart.map(i => `<div style="display:flex;justify-content:space-between;margin-bottom:0.5rem"><span>${i.icon} ${i.name} x${i.quantity}</span><span>₹${(i.price * i.quantity).toFixed(2)}</span></div>`).join('');
    }
    if (orderTotal) {
        const subtotal = cart.reduce((s, i) => s + i.price * i.quantity, 0);
        const shipping = subtotal > 100 ? 0 : 10;
        const tax = subtotal * 0.1;
        orderTotal.textContent = `₹${(subtotal + shipping + tax).toFixed(2)}`;
    }
}

function placeOrder() {
    cart = [];
    saveCart();
    updateCartCount();
    goToStep(4);
    showToast('Order placed successfully!', 'success');
}

// ========== FAQ Accordion ==========
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.faq-question').forEach(q => {
        q.addEventListener('click', () => {
            const item = q.parentElement;
            const wasActive = item.classList.contains('active');
            document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
            if (!wasActive) item.classList.add('active');
        });
    });
});

// ========== Contact Form Validation ==========
function validateContactForm(e) {
    e.preventDefault();
    const form = e.target;
    let valid = true;
    form.querySelectorAll('.form-group').forEach(g => {
        const input = g.querySelector('input, textarea');
        if (!input) return;
        g.classList.remove('error', 'valid');
        if (input.required && !input.value.trim()) { g.classList.add('error'); valid = false; }
        else if (input.type === 'email' && !/^\S+@\S+\.\S+$/.test(input.value)) { g.classList.add('error'); valid = false; }
        else if (input.value.trim()) g.classList.add('valid');
    });
    if (valid) {
        showToast('Message sent successfully!', 'success');
        form.reset();
        form.querySelectorAll('.form-group').forEach(g => g.classList.remove('valid'));
    } else {
        showToast('Please fix the errors above', 'error');
    }
    return false;
}

// ========== Newsletter ==========
function subscribeNewsletter(e) {
    e.preventDefault();
    const input = e.target.querySelector('input[type="email"]');
    if (input && input.value && /^\S+@\S+\.\S+$/.test(input.value)) {
        showToast('Subscribed successfully! 🎉', 'success');
        input.value = '';
    } else {
        showToast('Please enter a valid email', 'error');
    }
}

// ========== Checkout Sidebar Summary ==========
document.addEventListener('DOMContentLoaded', function() {
    const summaryContainer = document.getElementById('checkoutSummaryItems');
    if (summaryContainer) {
        summaryContainer.innerHTML = cart.map(i => `
            <div style="display:flex;justify-content:space-between;align-items:center;padding:0.5rem 0;border-bottom:1px solid var(--border)">
                <div style="display:flex;align-items:center;gap:0.5rem"><span>${i.icon}</span><span style="font-size:0.88rem">${i.name} <span style="color:var(--text-muted)">x${i.quantity}</span></span></div>
                <span style="font-weight:600">₹${(i.price * i.quantity).toFixed(2)}</span>
            </div>`).join('');
        const subtotal = cart.reduce((s, i) => s + i.price * i.quantity, 0);
        const shipping = subtotal > 100 ? 0 : 10;
        const tax = subtotal * 0.1;
        const total = subtotal + shipping + tax;
        const el = document.getElementById('checkoutTotal');
        if (el) el.textContent = `₹${total.toFixed(2)}`;
    }
});
