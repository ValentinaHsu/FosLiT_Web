// Products page specific JavaScript functionality

// Product categories data
const productCategories = {
    encendedores: {
        title: 'Encendedores',
        filters: ['All', 'Encendedores Clásicos', 'Mecheros', 'Encendedores Electrónicos', 'Encendedores de Gas'],
        products: [
            {
                id: 1,
                name: 'Encendedor Clásico Premium',
                description: 'Encendedor de alta calidad para uso profesional',
                price: 15.99,
                category: 'Encendedores Clásicos',
                icon: 'fas fa-fire',
                image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop'
            },
            {
                id: 2,
                name: 'Mechero Deportivo',
                description: 'Mechero resistente al viento',
                price: 12.50,
                category: 'Mecheros',
                icon: 'fas fa-fire-flame-curved',
                image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop'
            },
            {
                id: 3,
                name: 'Encendedor Electrónico',
                description: 'Tecnología USB recargable',
                price: 25.00,
                category: 'Encendedores Electrónicos',
                icon: 'fas fa-bolt',
                image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop'
            },
            {
                id: 4,
                name: 'Encendedor de Gas Industrial',
                description: 'Para uso industrial y comercial',
                price: 35.00,
                category: 'Encendedores de Gas',
                icon: 'fas fa-industry',
                image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop'
            },
            {
                id: 5,
                name: 'Mechero de Colección',
                description: 'Diseño exclusivo y elegante',
                price: 45.00,
                category: 'Mecheros',
                icon: 'fas fa-gem',
                image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop'
            },
            {
                id: 6,
                name: 'Encendedor Recargable LED',
                description: 'Con indicador LED de carga',
                price: 30.00,
                category: 'Encendedores Electrónicos',
                icon: 'fas fa-charging-station',
                image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop'
            }
        ]
    },
    iluminacion: {
        title: 'Iluminación',
        filters: ['All', 'LED', 'Linternas', 'Iluminación Exterior', 'Accesorios'],
        products: [
            {
                id: 7,
                name: 'Bombilla LED 10W',
                description: 'Iluminación eficiente y duradera',
                price: 8.99,
                category: 'LED',
                icon: 'fas fa-lightbulb',
                image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=300&h=200&fit=crop'
            },
            {
                id: 8,
                name: 'Linterna Táctica',
                description: 'Linterna de alta potencia',
                price: 22.00,
                category: 'Linternas',
                icon: 'fas fa-flashlight',
                image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=300&h=200&fit=crop'
            },
            {
                id: 9,
                name: 'Foco LED Solar',
                description: 'Iluminación solar para exteriores',
                price: 35.00,
                category: 'Iluminación Exterior',
                icon: 'fas fa-solar-panel',
                image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=300&h=200&fit=crop'
            },
            {
                id: 10,
                name: 'Strip LED RGB',
                description: 'Tira LED multicolor programable',
                price: 18.50,
                category: 'LED',
                icon: 'fas fa-palette',
                image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=300&h=200&fit=crop'
            },
            {
                id: 11,
                name: 'Linterna de Cabeza',
                description: 'Manos libres para actividades',
                price: 15.00,
                category: 'Linternas',
                icon: 'fas fa-head-side-virus',
                image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=300&h=200&fit=crop'
            },
            {
                id: 12,
                name: 'Reflector LED 50W',
                description: 'Iluminación potente para exteriores',
                price: 65.00,
                category: 'Iluminación Exterior',
                icon: 'fas fa-sun',
                image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=300&h=200&fit=crop'
            }
        ]
    },
    baterias: {
        title: 'Baterías',
        filters: ['All', 'Alcalinas', 'Recargables', 'Litio', 'Especiales'],
        products: [
            {
                id: 13,
                name: 'Baterías AA Alcalinas Pack x8',
                description: 'Larga duración para dispositivos',
                price: 12.00,
                category: 'Alcalinas',
                icon: 'fas fa-battery-three-quarters',
                image: 'https://images.unsplash.com/photo-1609592062458-9ac1412caa28?w=300&h=200&fit=crop'
            },
            {
                id: 14,
                name: 'Batería Recargable 18650',
                description: 'Batería de litio recargable',
                price: 8.50,
                category: 'Recargables',
                icon: 'fas fa-battery-full',
                image: 'https://images.unsplash.com/photo-1609592062458-9ac1412caa28?w=300&h=200&fit=crop'
            },
            {
                id: 15,
                name: 'Batería de Litio CR2032',
                description: 'Para dispositivos pequeños',
                price: 3.25,
                category: 'Litio',
                icon: 'fas fa-circle',
                image: 'https://images.unsplash.com/photo-1609592062458-9ac1412caa28?w=300&h=200&fit=crop'
            },
            {
                id: 16,
                name: 'Power Bank 10000mAh',
                description: 'Cargador portátil de alta capacidad',
                price: 25.00,
                category: 'Especiales',
                icon: 'fas fa-mobile-alt',
                image: 'https://images.unsplash.com/photo-1609592062458-9ac1412caa28?w=300&h=200&fit=crop'
            },
            {
                id: 17,
                name: 'Baterías AAA Recargables',
                description: 'Pack de 4 baterías recargables',
                price: 16.00,
                category: 'Recargables',
                icon: 'fas fa-redo',
                image: 'https://images.unsplash.com/photo-1609592062458-9ac1412caa28?w=300&h=200&fit=crop'
            },
            {
                id: 18,
                name: 'Batería 9V Alcalina',
                description: 'Para detectores y equipos',
                price: 4.50,
                category: 'Alcalinas',
                icon: 'fas fa-square',
                image: 'https://images.unsplash.com/photo-1609592062458-9ac1412caa28?w=300&h=200&fit=crop'
            }
        ]
    }
};

// Current state
let currentCategory = 'all';
let currentFilter = 'All';
let currentView = 'grid';
let currentPage = 1;
let itemsPerPage = 12;
let searchQuery = '';
let sortBy = 'name';

// Get all products
function getAllProducts() {
    const allProducts = [];
    Object.values(productCategories).forEach(category => {
        allProducts.push(...category.products);
    });
    return allProducts;
}

// Filter products
function getFilteredProducts() {
    let products = getAllProducts();
    
    // Filter by category
    if (currentCategory !== 'all') {
        products = productCategories[currentCategory].products;
    }
    
    // Filter by subcategory
    if (currentFilter !== 'All') {
        products = products.filter(product => product.category === currentFilter);
    }
    
    // Filter by search query
    if (searchQuery) {
        products = products.filter(product => 
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }
    
    // Sort products
    products.sort((a, b) => {
        switch (sortBy) {
            case 'price-low':
                return a.price - b.price;
            case 'price-high':
                return b.price - a.price;
            case 'category':
                return a.category.localeCompare(b.category);
            default:
                return a.name.localeCompare(b.name);
        }
    });
    
    return products;
}

// Render products
function renderProducts() {
    const productsGrid = document.getElementById('products-grid');
    const productsCount = document.getElementById('products-count');
    
    if (!productsGrid) return;
    
    const filteredProducts = getFilteredProducts();
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageProducts = filteredProducts.slice(startIndex, endIndex);
    
    // Update products count
    if (productsCount) {
        productsCount.textContent = `Mostrando ${pageProducts.length} de ${filteredProducts.length} productos`;
    }
    
    // Clear grid
    productsGrid.innerHTML = '';
    
    if (pageProducts.length === 0) {
        productsGrid.innerHTML = `
            <div class="no-products">
                <i class="fas fa-search"></i>
                <h3>No se encontraron productos</h3>
                <p>Intenta ajustar los filtros o la búsqueda</p>
            </div>
        `;
        return;
    }
    
    // Render products
    pageProducts.forEach((product, index) => {
        const productCard = document.createElement('div');
        productCard.className = `product-card ${currentView}`;
        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
                <div class="product-overlay">
                    <button class="quick-view-btn" onclick="quickViewProduct(${product.id})">
                        <i class="fas fa-eye"></i> Vista rápida
                    </button>
                </div>
            </div>
            <div class="product-info">
                <h4>${product.name}</h4>
                <p>${product.description}</p>
                <div class="product-meta">
                    <span class="product-category">${product.category}</span>
                    <div class="product-price">${window.FOSLiT.utils.formatCurrency(product.price)}</div>
                </div>
                <div class="product-actions">
                    <button class="add-to-quote-btn" onclick="addToQuote(${product.id})">
                        <i class="fas fa-plus"></i> Añadir a Cotización
                    </button>
                </div>
            </div>
        `;
        
        // Add animation delay
        productCard.style.animationDelay = `${index * 0.1}s`;
        productsGrid.appendChild(productCard);
    });
    
    // Render pagination
    renderPagination(filteredProducts.length);
    
    // Animate products
    animateProducts();
}

// Animate products
function animateProducts() {
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.4s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 50);
    });
}

// Render pagination
function renderPagination(totalProducts) {
    const pagination = document.getElementById('pagination');
    if (!pagination) return;
    
    const totalPages = Math.ceil(totalProducts / itemsPerPage);
    
    if (totalPages <= 1) {
        pagination.innerHTML = '';
        return;
    }
    
    let paginationHTML = '';
    
    // Previous button
    if (currentPage > 1) {
        paginationHTML += `<button class="page-btn" onclick="changePage(${currentPage - 1})">
            <i class="fas fa-chevron-left"></i>
        </button>`;
    }
    
    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
        if (i === currentPage) {
            paginationHTML += `<button class="page-btn active">${i}</button>`;
        } else if (i === 1 || i === totalPages || (i >= currentPage - 2 && i <= currentPage + 2)) {
            paginationHTML += `<button class="page-btn" onclick="changePage(${i})">${i}</button>`;
        } else if (i === currentPage - 3 || i === currentPage + 3) {
            paginationHTML += `<span class="page-dots">...</span>`;
        }
    }
    
    // Next button
    if (currentPage < totalPages) {
        paginationHTML += `<button class="page-btn" onclick="changePage(${currentPage + 1})">
            <i class="fas fa-chevron-right"></i>
        </button>`;
    }
    
    pagination.innerHTML = paginationHTML;
}

// Change page
function changePage(page) {
    currentPage = page;
    renderProducts();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Update category
function updateCategory(category) {
    currentCategory = category;
    currentPage = 1;
    
    // Update active category button
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-category="${category}"]`).classList.add('active');
    
    // Update subcategory filters
    updateSubcategoryFilters();
    renderProducts();
}

// Update subcategory filters
function updateSubcategoryFilters() {
    const filterButtons = document.getElementById('filter-buttons');
    if (!filterButtons) return;
    
    filterButtons.innerHTML = '';
    
    let filters = ['All'];
    if (currentCategory !== 'all') {
        filters = productCategories[currentCategory].filters;
    }
    
    filters.forEach((filter, index) => {
        const button = document.createElement('button');
        button.className = `filter-btn ${index === 0 ? 'active' : ''}`;
        button.textContent = filter;
        button.onclick = () => updateFilter(filter, button);
        filterButtons.appendChild(button);
    });
    
    currentFilter = 'All';
}

// Update filter
function updateFilter(filter, button) {
    currentFilter = filter;
    currentPage = 1;
    
    // Update active filter button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    button.classList.add('active');
    
    renderProducts();
}

// Quick view product
function quickViewProduct(productId) {
    const product = getAllProducts().find(p => p.id === productId);
    if (!product) return;
    
    // Create modal (simplified version)
    const modal = document.createElement('div');
    modal.className = 'product-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>${product.name}</h3>
                <button class="close-modal" onclick="closeModal()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                <img src="${product.image}" alt="${product.name}">
                <div class="product-details">
                    <p>${product.description}</p>
                    <div class="product-category">${product.category}</div>
                    <div class="product-price">${window.FOSLiT.utils.formatCurrency(product.price)}</div>
                    <button class="add-to-quote-btn" onclick="addToQuote(${product.id})">
                        Añadir a Cotización
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('active'), 10);
}

// Close modal
function closeModal() {
    const modal = document.querySelector('.product-modal');
    if (modal) {
        modal.classList.remove('active');
        setTimeout(() => modal.remove(), 300);
    }
}

// Add to quote
function addToQuote(productId) {
    const product = getAllProducts().find(p => p.id === productId);
    if (!product) return;
    
    // Store in localStorage (simplified quote system)
    let quote = JSON.parse(localStorage.getItem('foslit-quote') || '[]');
    const existingItem = quote.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        quote.push({ ...product, quantity: 1 });
    }
    
    localStorage.setItem('foslit-quote', JSON.stringify(quote));
    
    // Show notification
    showNotification(`${product.name} añadido a la cotización`);
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    setTimeout(() => notification.classList.add('show'), 10);
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Initialize products page
document.addEventListener('DOMContentLoaded', () => {
    if (!document.querySelector('.products-section')) return;
    
    console.log('Products page JavaScript loaded');
    
    // Initialize category buttons
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const category = btn.getAttribute('data-category');
            updateCategory(category);
        });
    });
    
    // Initialize search
    const searchInput = document.getElementById('product-search');
    if (searchInput) {
        searchInput.addEventListener('input', window.FOSLiT.utils.debounce((e) => {
            searchQuery = e.target.value;
            currentPage = 1;
            renderProducts();
        }, 300));
    }
    
    // Initialize sort
    const sortSelect = document.getElementById('sort-select');
    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            sortBy = e.target.value;
            currentPage = 1;
            renderProducts();
        });
    }
    
    // Initialize view toggle
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            currentView = btn.getAttribute('data-view');
            document.querySelectorAll('.view-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderProducts();
        });
    });
    
    // Initial render
    updateSubcategoryFilters();
    renderProducts();
});

// Export functions for global access
window.changePage = changePage;
window.quickViewProduct = quickViewProduct;
window.closeModal = closeModal;
window.addToQuote = addToQuote;