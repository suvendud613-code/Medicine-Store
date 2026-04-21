// ========== Sample Products Data ==========
const products = [
    {
        id: 1,
        name: 'Aspirin 500mg',
        category: 'pain-relief',
        price: 45.99,
        originalPrice: 59.99,
        rating: 4.8,
        reviews: 256,
        icon: '<i class="fas fa-pills" style="font-size: 3rem; color: #fff;"></i>',
        manufacturer: 'MediCorp',
        description: 'Effective pain relief and fever reducer. FDA approved.'
    },
    {
        id: 2,
        name: 'Vitamin C 1000mg',
        category: 'vitamins',
        price: 35.50,
        originalPrice: 49.99,
        rating: 4.9,
        reviews: 512,
        icon: '<i class="fas fa-apple-whole" style="font-size: 3rem; color: #fff;"></i>',
        manufacturer: 'HealthPlus',
        description: 'Boost your immune system with pure Vitamin C supplements.'
    },
    {
        id: 3,
        name: 'Cough Syrup',
        category: 'cold-flu',
        price: 28.99,
        originalPrice: 39.99,
        rating: 4.5,
        reviews: 189,
        icon: '<i class="fas fa-head-side-cough" style="font-size: 3rem; color: #fff;"></i>',
        manufacturer: 'PharmaCare',
        description: 'Fast-acting cough relief for cold and flu symptoms.'
    },
    {
        id: 4,
        name: 'Digestive Enzymes',
        category: 'digestion',
        price: 52.00,
        originalPrice: 69.99,
        rating: 4.6,
        reviews: 134,
        icon: '<i class="fas fa-mug-hot" style="font-size: 3rem; color: #fff;"></i>',
        manufacturer: 'WellnessLabs',
        description: 'Support healthy digestion with natural enzymes.'
    },
    {
        id: 5,
        name: 'Anti-Fungal Cream',
        category: 'skin-care',
        price: 32.50,
        originalPrice: 45.00,
        rating: 4.7,
        reviews: 98,
        icon: '<i class="fas fa-pump-soap" style="font-size: 3rem; color: #fff;"></i>',
        manufacturer: 'DermaCare',
        description: 'Effective treatment for fungal skin infections.'
    },
    {
        id: 6,
        name: 'First Aid Kit',
        category: 'first-aid',
        price: 65.00,
        originalPrice: 89.99,
        rating: 4.8,
        reviews: 267,
        icon: '<i class="fas fa-kit-medical" style="font-size: 3rem; color: #fff;"></i>',
        manufacturer: 'SafeGuard',
        description: 'Complete first aid kit for home and travel.'
    },
    {
        id: 7,
        name: 'Ibuprofen 400mg',
        category: 'pain-relief',
        price: 24.50,
        originalPrice: 34.99,
        rating: 4.7,
        reviews: 421,
        icon: '<i class="fas fa-pills" style="font-size: 3rem; color: #fff;"></i>',
        manufacturer: 'MediCorp',
        description: 'Fast pain relief for headaches and body aches.'
    },
    {
        id: 8,
        name: 'Multivitamin Complex',
        category: 'vitamins',
        price: 42.99,
        originalPrice: 59.99,
        rating: 4.6,
        reviews: 334,
        icon: '<i class="fas fa-apple-whole" style="font-size: 3rem; color: #fff;"></i>',
        manufacturer: 'VitaHealth',
        description: 'Complete daily nutrition with essential vitamins and minerals.'
    }
];

let cart = JSON.parse(localStorage.getItem('cart')) || [];

// ========== Initialize ==========
document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
    
    // Load products on products page
    if (document.getElementById('productsGrid')) {
        displayProducts(products);
    }
    
    // Load featured products on homepage
    if (document.getElementById('featuredProducts')) {
        displayFeaturedProducts(products.slice(0, 4));
    }
});

// ========== Navigation & Menu ==========
function toggleMenu() {
    const navMenu = document.querySelector('.nav-menu');
    if (navMenu.classList.contains('mobile-open')) {
        $(navMenu).slideUp(300, function() {
            navMenu.classList.remove('mobile-open');
            navMenu.style.display = ''; // reset inline style so CSS takes over
        });
    } else {
        navMenu.classList.add('mobile-open');
        $(navMenu).slideDown(300);
    }
}

// ========== Product Card HTML Generator ==========
function generateProductCardHTML(product) {
    const discount = Math.round((1 - (product.price / product.originalPrice)) * 100);
    return `
        <div class="product-card">
            <a href="product-detail.html?id=${product.id}" style="text-decoration: none; color: inherit; display: block;">
                <div class="product-image">
                    ${product.icon}
                    ${discount > 0 ? `<div class="product-badge">-${discount}%</div>` : ''}
                </div>
            </a>
            <div class="product-info">
                <div class="product-category-tag">${product.category}</div>
                <a href="product-detail.html?id=${product.id}" style="text-decoration: none; color: inherit;">
                    <h3 class="product-name">${product.name}</h3>
                </a>
                <div class="product-rating">
                    <span class="stars">★★★★★</span> ${product.rating}
                </div>
                <div class="product-price">
                    <span class="original-price">₹${product.originalPrice}</span>
                    <span class="current-price">₹${product.price}</span>
                </div>
                <button class="btn btn-primary" onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        </div>
    `;
}

// ========== Display Products ==========
function displayProducts(productsToDisplay) {
    const grid = document.getElementById('productsGrid');
    if (grid) {
        grid.innerHTML = productsToDisplay.map(product => generateProductCardHTML(product)).join('');
    }
}

function displayFeaturedProducts(productsToDisplay) {
    const grid = document.getElementById('featuredProducts');
    if (grid) {
        grid.innerHTML = productsToDisplay.map(product => generateProductCardHTML(product)).join('');
    }
}

// ========== Category Filter ==========
function filterProducts(category) {
    localStorage.setItem('selectedCategory', category);
    window.location.href = 'products.html';
}

// ========== Cart Management ==========
function addToCart(productId, qty = 1) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += qty;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: qty,
            icon: product.icon
        });
    }
    
    saveCart();
    updateCartCount();
    showNotification(`${product.name} added to cart!`);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartDisplay();
    updateCartCount();
}

function updateQuantity(productId, newQuantity) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = Math.max(1, newQuantity);
        saveCart();
        updateCartDisplay();
    }
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCountElements = document.querySelectorAll('.cart-count');
    cartCountElements.forEach(el => el.textContent = count);
    $('.cart-count').stop(true, true).fadeOut(100).fadeIn(100);
}

// ========== Display Cart ==========
function updateCartDisplay() {
    const cartItemsContainer = document.getElementById('cartItems');
    const emptyCart = document.getElementById('emptyCart');
    
    if (!cartItemsContainer) return;

    if (cart.length === 0) {
        cartItemsContainer.style.display = 'none';
        if (emptyCart) emptyCart.style.display = 'block';
        updateCartSummary();
        return;
    }

    cartItemsContainer.style.display = 'block';
    if (emptyCart) emptyCart.style.display = 'none';

    cartItemsContainer.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-image">${item.icon}</div>
            <div class="cart-item-info">
                <h3>${item.name}</h3>
                <p>₹${item.price.toFixed(2)} each</p>
                <div class="cart-item-details">
                    <span>Subtotal: ₹${(item.price * item.quantity).toFixed(2)}</span>
                </div>
            </div>
            <div class="cart-item-actions">
                <div class="quantity-selector">
                    <button onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                    <input type="number" value="${item.quantity}" onchange="updateQuantity(${item.id}, this.value)" min="1">
                    <button onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                </div>
                <button class="remove-btn" onclick="removeFromCart(${item.id})">Remove</button>
            </div>
        </div>
    `).join('');

    updateCartSummary();
}

function updateCartSummary() {
    if (!document.getElementById('subtotal')) return;

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 0 ? (subtotal > 100 ? 0 : 10) : 0;
    const tax = subtotal * 0.1;
    const total = subtotal + shipping + tax;

    document.getElementById('subtotal').textContent = `₹${subtotal.toFixed(2)}`;
    document.getElementById('shipping').textContent = shipping === 0 ? 'FREE' : `₹${shipping.toFixed(2)}`;
    document.getElementById('tax').textContent = `₹${tax.toFixed(2)}`;
    document.getElementById('total').textContent = `₹${total.toFixed(2)}`;
}

// ========== Notifications ==========
function showNotification(message) {
    console.log(message);

    const notification = $('<div class="toast-notification"></div>').text(message).css({
        position: 'fixed',
        top: '20px',
        right: '20px',
        background: '#0f7d9d',
        color: '#fff',
        padding: '1rem 2rem',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        zIndex: 9999,
        display: 'none'
    });

    $('body').append(notification);
    notification.fadeIn(250).delay(2500).fadeOut(250, function() {
        $(this).remove();
    });
}

// ========== Checkout ==========
document.addEventListener('DOMContentLoaded', function() {
    const checkoutBtn = document.getElementById('checkoutBtn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
            if (cart.length === 0) {
                alert('Your cart is empty');
                return;
            }
            // For demo purposes, show checkout confirmation
            alert('Thank you for your order! Checkout feature coming soon.');
        });
    }
});

// ========== Product Tabs ==========
function switchTab(tabName, clickedButton) {
    // Hide all tabs
    const tabPanes = document.querySelectorAll('.tab-pane');
    tabPanes.forEach(pane => pane.classList.remove('active'));
    
    // Remove active class from all buttons
    const tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach(btn => btn.classList.remove('active'));
    
    // Show selected tab
    const selectedPane = document.getElementById(tabName);
    if (selectedPane) {
        selectedPane.classList.add('active');
        const activeButton = clickedButton || event?.target;
        if (activeButton) {
            activeButton.classList.add('active');
        }
    }
}

// ========== Quantity Controls ==========
function increaseQty() {
    const qtyInput = document.getElementById('quantity');
    if (qtyInput) qtyInput.value = parseInt(qtyInput.value) + 1;
}

function decreaseQty() {
    const qtyInput = document.getElementById('quantity');
    if (qtyInput && parseInt(qtyInput.value) > 1) {
        qtyInput.value = parseInt(qtyInput.value) - 1;
    }
}

// ========== Search & Sort ==========

$(function() {
    // Smooth scrolling for anchor links
    $('a[href^="#"]').on('click', function(e) {
        const target = $(this).attr('href');
        if (target.length > 1 && $(target).length) {
            e.preventDefault();
            $('html, body').animate({ scrollTop: $(target).offset().top - 80 }, 500);
        }
    });

    // Apply selected category filter stored from the homepage
    const selectedCategory = localStorage.getItem('selectedCategory');
    if (selectedCategory && $('#productsGrid').length) {
        const filtered = products.filter(p => p.category === selectedCategory);
        displayProducts(filtered);
        localStorage.removeItem('selectedCategory');
        $('.filters-sidebar input[type="checkbox"][value="' + selectedCategory + '"]').prop('checked', true);
    }

    // Filter inputs
    $('#searchInput').on('input', applyProductsFilters);
    $('#sortSelect').on('change', applyProductsFilters);
    $('.filters-sidebar input[type="checkbox"]').on('change', applyProductsFilters);

    $('.filters-sidebar .btn.btn-secondary').filter(function() {
        return $(this).text().trim() === 'Clear Filters';
    }).on('click', function(e) {
        e.preventDefault();
        $('.filters-sidebar input[type="checkbox"]').prop('checked', false);
        $('#searchInput').val('');
        $('#sortSelect').val('newest');
        displayProducts(products);
    });

    // Tab clicks on product-detail page
    $('.tab-button').on('click', function() {
        const onclickAttr = $(this).attr('onclick');
        const match = onclickAttr ? onclickAttr.match(/switchTab\('(.+)'\)/) : null;
        const tabName = match ? match[1] : $(this).data('target');
        if (tabName) {
            switchTab(tabName, this);
        }
    });

    // Button highlight feedback when adding products
    $(document).on('click', '.product-card .btn-primary', function() {
        const card = $(this).closest('.product-card');
        card.addClass('highlight');
        setTimeout(() => card.removeClass('highlight'), 300);
    });

    // ========== Theme Toggle ==========
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
        if (currentTheme === 'dark') {
            $('#themeToggle').html('<i class="fas fa-sun"></i>');
        } else {
            $('#themeToggle').html('<i class="fas fa-moon"></i>');
        }
    }

    $('#themeToggle').on('click', function() {
        let theme = document.documentElement.getAttribute('data-theme');
        if (theme === 'dark') {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
            $(this).html('<i class="fas fa-moon"></i>');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            $(this).html('<i class="fas fa-sun"></i>');
        }
    });

    // ========== Back to Top ==========
    $(window).on('scroll', function() {
        if ($(window).scrollTop() > 300) {
            $('#backToTop').fadeIn(250).css('display', 'flex');
        } else {
            $('#backToTop').fadeOut(250);
        }
    });

    $('#backToTop').on('click', function() {
        $('html, body').animate({ scrollTop: 0 }, 500);
    });

    // ========== Newsletter Form Validation ==========
    $('.newsletter-form').on('submit', function(e) {
        e.preventDefault();
        const email = $(this).find('input[type="email"]').val();
        if (email) {
            showNotification('Successfully subscribed with ' + email + '!');
            $(this).find('input[type="email"]').val('');
        }
    });

    // ========== Product Detail Dynamic Load ==========
    if ($('#productName').length && window.location.search.includes('id=')) {
        const urlParams = new URLSearchParams(window.location.search);
        const productId = parseInt(urlParams.get('id'));
        const product = products.find(p => p.id === productId);

        if (product) {
            $('#productName').text(product.name);
            $('#productCategory').text(product.category);
            $('#productCategoryMeta').text(product.category);
            $('#productBreadcrumb').text(product.name);
            $('#mainImage, .thumbnail').html(product.icon);
            $('#originalPrice').text('₹' + product.originalPrice);
            $('#currentPrice').text('₹' + product.price);
            
            const discount = Math.round((1 - (product.price / product.originalPrice)) * 100);
            if (discount > 0) {
                $('#discountBadge').text('-' + discount + '%').show();
            } else {
                $('#discountBadge').hide();
            }

            $('#productRating').text('★★★★★');
            $('.review-count').text('(' + product.reviews + ' reviews)');
            $('#productDescription').text(product.description);
            $('#productManufacturer').text(product.manufacturer);
            
            // Update Add to Cart button
            $('#addToCartBtn').off('click').on('click', function() {
                const qty = parseInt($('#quantity').val()) || 1;
                addToCart(product.id, qty);
            });
            
            // Load related products (same category)
            const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
            const relatedGrid = document.getElementById('relatedProducts');
            if (relatedGrid) {
                relatedGrid.innerHTML = related.map(p => generateProductCardHTML(p)).join('');
            }
        }
    }
});

function applyProductsFilters() {
    if (!$('#productsGrid').length) return;

    const query = $('#searchInput').val().toLowerCase();
    const checkedCategories = $('.filters-sidebar input[type="checkbox"]:checked').map(function() {
        return this.value;
    }).get();

    const sortValue = $('#sortSelect').val();
    let filtered = products.filter(p => {
        const matchesText = p.name.toLowerCase().includes(query) || p.category.toLowerCase().includes(query);
        const matchesCategory = checkedCategories.length === 0 || checkedCategories.includes(p.category);
        return matchesText && matchesCategory;
    });

    switch (sortValue) {
        case 'price-low':
            filtered.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filtered.sort((a, b) => b.price - a.price);
            break;
        case 'popular':
            filtered.sort((a, b) => b.reviews - a.reviews);
            break;
        case 'newest':
        default:
            break;
    }

    displayProducts(filtered);
}

// ========== Load Cart on Cart Page ==========
if (document.getElementById('cartItems')) {
    updateCartDisplay();
}

// ========== Animations ==========
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
