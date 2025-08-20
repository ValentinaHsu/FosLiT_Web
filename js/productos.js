// Products page with Supabase integration + original filtering functionality

import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

const SUPABASE_URL = 'https://qzcsvvdozekiyvgaxopu.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF6Y3N2dmRvemVraXl2Z2F4b3B1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU2OTM4OTYsImV4cCI6MjA3MTI2OTg5Nn0.zEEqRW2MVpJXd2jAYtdF0wHJ_JgDuoUt5ylJDAkKDd0';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Fallback data structure (compatible with original system)
const productCategories = {
    encendedores: {
        title: 'Encendedores',
        filters: ['All', 'Encendedores Clásicos', 'Mecheros', 'Encendedores Electrónicos', 'Encendedores de Gas'],
        products: []
    },
    iluminacion: {
        title: 'Iluminación',
        filters: ['All', 'LED', 'Linternas', 'Iluminación Exterior', 'Accesorios'],
        products: []
    },
    baterias: {
        title: 'Baterías',
        filters: ['All', 'Alcalinas', 'Recargables', 'Litio', 'Especiales'],
        products: []
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
let allProductsFromDB = [];

// Fetch products from Supabase
async function fetchProductosFromDB() {
    try {
        const { data, error } = await supabase
            .from('producto')
            .select('id, nombre, descripcion, precio_unidad, imagen, categoria, created_at')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching products from Supabase:', error);
            return [];
        }

        // Transform Supabase data to match original structure
        return (data || []).map(product => ({
            id: product.id,
            name: product.nombre,
            description: product.descripcion,
            price: Number(product.precio_unidad || 0),
            category: product.categoria || '',
            image: product.imagen || '',
            icon: getIconForCategory(product.categoria)
        }));
    } catch (error) {
        console.error('Error connecting to Supabase:', error);
        return [];
    }
}

// Get icon based on category (fallback logic)
function getIconForCategory(categoria) {
    if (!categoria) return 'fas fa-box';
    
    const cat = categoria.toLowerCase();
    if (cat.includes('encendedor') || cat.includes('mechero')) return 'fas fa-fire';
    if (cat.includes('led') || cat.includes('luz') || cat.includes('iluminacion')) return 'fas fa-lightbulb';
    if (cat.includes('bateria') || cat.includes('pila')) return 'fas fa-battery-full';
    if (cat.includes('linterna')) return 'fas fa-flashlight';
    return 'fas fa-box';
}

// Organize products by category (compatible with original filtering)
function organizeProductsByCategory(products) {
    // Reset categories
    Object.keys(productCategories).forEach(key => {
        productCategories[key].products = [];
    });

    products.forEach(product => {
        const categoria = product.category.toLowerCase();
        
        if (categoria.includes('encendedor') || categoria.includes('mechero')) {
            productCategories.encendedores.products.push(product);
        } else if (categoria.includes('luz') || categoria.includes('led') || categoria.includes('iluminacion') || categoria.includes('linterna')) {
            productCategories.iluminacion.products.push(product);
        } else if (categoria.includes('bateria') || categoria.includes('pila')) {
            productCategories.baterias.products.push(product);
        }
        // If doesn't match any category, add to first available
        else if (productCategories.encendedores.products.length <= productCategories.iluminacion.products.length && 
                 productCategories.encendedores.products.length <= productCategories.baterias.products.length) {
            productCategories.encendedores.products.push(product);
        }
    });
}

// Get all products (compatible with original)
function getAllProducts() {
    return allProductsFromDB;
}

// Filter products (enhanced with Supabase data)
function getFilteredProducts() {
    let products = getAllProducts();
    
    // Filter by category
    if (currentCategory !== 'all') {
        products = productCategories[currentCategory].products;
    }
    
    // Filter by subcategory (from original system)
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

// Render products (enhanced version)
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
                ${product.image ? 
                    `<img src="${product.image}" alt="${product.name}" loading="lazy">` : 
                    `<div class="placeholder-image"><i class="${product.icon}"></i></div>`
                }
                <div class="product-overlay">
                    <button class="quick-view-btn" onclick="quickViewProduct('${product.id}')">
                        <i class="fas fa-eye"></i> Vista rápida
                    </button>
                </div>
            </div>
            <div class="product-info">
                <h4>${product.name}</h4>
                <p>${product.description}</p>
                <div class="product-meta">
                    <span class="product-category">${product.category}</span>
                    <div class="product-price">${window.FOSLiT?.utils?.formatCurrency ? window.FOSLiT.utils.formatCurrency(product.price) : '$' + product.price.toFixed(2)}</div>
                </div>
                <div class="product-actions">
                    <button class="add-to-quote-btn" onclick="addToQuote('${product.id}')">
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

// Render pagination (from original)
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

// Update category (from original)
function updateCategory(category) {
    currentCategory = category;
    currentPage = 1;
    
    // Update active category button
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-category="${category}"]`)?.classList.add('active');
    
    // Update subcategory filters
    updateSubcategoryFilters();
    renderProducts();
}

// Update subcategory filters (from original)
function updateSubcategoryFilters() {
    const filterButtons = document.getElementById('filter-buttons');
    if (!filterButtons) return;
    
    filterButtons.innerHTML = '';
    
    let filters = ['All'];
    if (currentCategory !== 'all') {
        // Get unique subcategories from actual products
        const categoryProducts = productCategories[currentCategory].products;
        const uniqueCategories = [...new Set(categoryProducts.map(p => p.category))];
        filters = ['All', ...uniqueCategories];
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

// Update filter (from original)
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

// Quick view product (enhanced)
function quickViewProduct(productId) {
    const product = getAllProducts().find(p => p.id === productId);
    if (!product) return;
    
    // Create modal
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
                ${product.image ? 
                    `<img src="${product.image}" alt="${product.name}">` : 
                    `<div class="placeholder-image"><i class="${product.icon}"></i></div>`
                }
                <div class="product-details">
                    <p>${product.description}</p>
                    <div class="product-category">${product.category}</div>
                    <div class="product-price">${window.FOSLiT?.utils?.formatCurrency ? window.FOSLiT.utils.formatCurrency(product.price) : '$' + product.price.toFixed(2)}</div>
                    <button class="add-to-quote-btn" onclick="addToQuote('${product.id}')">
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

// Add to quote (from original)
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

// Show notification (from original)
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

// Main load function
async function loadProducts() {
    const productsGrid = document.getElementById('products-grid');
    if (productsGrid) {
        productsGrid.innerHTML = '<div class="loading-spinner"><i class="fas fa-spinner fa-spin"></i> Cargando productos...</div>';
    }

    // Fetch products from Supabase
    allProductsFromDB = await fetchProductosFromDB();
    
    // If no products from DB, show appropriate message
    if (allProductsFromDB.length === 0) {
        if (productsGrid) {
            productsGrid.innerHTML = `
                <div class="no-products">
                    <i class="fas fa-database"></i>
                    <h3>No hay productos disponibles</h3>
                    <p>Los productos se están cargando desde la base de datos</p>
                </div>
            `;
        }
        return;
    }

    // Organize products by category for filtering
    organizeProductsByCategory(allProductsFromDB);
    
    // Render products
    renderProducts();
}

// Debounce function
function debounce(func, wait = 300) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Initialize all products page functionality
document.addEventListener('DOMContentLoaded', () => {
    // Only run if we're on the products page
    if (!document.querySelector('.products-section')) return;
    
    console.log('Products page with Supabase integration loaded');
    
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
        searchInput.addEventListener('input', debounce((e) => {
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
    
    // Initial load from Supabase
    loadProducts();
});

// Export functions for global access
window.changePage = changePage;
window.quickViewProduct = quickViewProduct;
window.closeModal = closeModal;
window.addToQuote = addToQuote;