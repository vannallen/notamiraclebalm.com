// Cart functionality
let cart = [];
let cartTotal = 0;

// DOM elements
const cartToggle = document.getElementById('cart-toggle');
const cartSidebar = document.getElementById('cart-sidebar');
const cartClose = document.getElementById('cart-close');
const cartContent = document.getElementById('cart-content');
const cartCount = document.getElementById('cart-count');
const cartTotalElement = document.getElementById('cart-total');
const checkoutBtn = document.getElementById('checkout-btn');

// Cart functions
function updateCartDisplay() {
    cartCount.textContent = cart.length;
    cartTotalElement.textContent = cartTotal.toFixed(2);
    
    if (cart.length === 0) {
        cartContent.innerHTML = '<p class="cart-empty">Your cart is empty. Time to fix that!</p>';
        checkoutBtn.disabled = true;
    } else {
        cartContent.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p>${item.variant}</p>
                    <p>$${item.price}</p>
                </div>
                <div class="cart-item-actions">
                    <button class="remove-item" data-id="${item.id}">Remove</button>
                </div>
            </div>
        `).join('');
        
        checkoutBtn.disabled = false;
        
        // Add event listeners to remove buttons
        document.querySelectorAll('.remove-item').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const itemId = e.target.getAttribute('data-id');
                removeFromCart(itemId);
            });
        });
    }
}

function addToCart(name, variant, price) {
    const item = {
        id: Date.now(),
        name: name,
        variant: variant,
        price: price
    };
    
    cart.push(item);
    cartTotal += price;
    updateCartDisplay();
    
    // Show success message
    showNotification(`${name} (${variant}) added to cart!`);
}

function removeFromCart(itemId) {
    const itemIndex = cart.findIndex(item => item.id == itemId);
    if (itemIndex > -1) {
        cartTotal -= cart[itemIndex].price;
        cart.splice(itemIndex, 1);
        updateCartDisplay();
    }
}

function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: #D06442;
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        font-weight: 600;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Cart sidebar toggle
if (cartToggle) {
    cartToggle.addEventListener('click', () => {
        cartSidebar.classList.add('open');
    });
}

if (cartClose) {
    cartClose.addEventListener('click', () => {
        cartSidebar.classList.remove('open');
    });
}

// Close cart when clicking outside
document.addEventListener('click', (e) => {
    if (cartSidebar.classList.contains('open') && 
        !cartSidebar.contains(e.target) && 
        !cartToggle.contains(e.target)) {
        cartSidebar.classList.remove('open');
    }
});

// Accordion functionality
function initAccordions() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            const icon = header.querySelector('.accordion-icon');
            
            // Close all other accordions
            accordionHeaders.forEach(otherHeader => {
                if (otherHeader !== header) {
                    otherHeader.classList.remove('active');
                    const otherContent = otherHeader.nextElementSibling;
                    const otherIcon = otherHeader.querySelector('.accordion-icon');
                    otherContent.classList.remove('active');
                    otherIcon.textContent = '+';
                }
            });
            
            // Toggle current accordion
            header.classList.toggle('active');
            content.classList.toggle('active');
            icon.textContent = content.classList.contains('active') ? '−' : '+';
        });
    });
}

// FAQ functionality
function initFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            const icon = question.querySelector('.faq-icon');
            
            // Close all other FAQs
            faqQuestions.forEach(otherQuestion => {
                if (otherQuestion !== question) {
                    otherQuestion.classList.remove('active');
                    const otherAnswer = otherQuestion.nextElementSibling;
                    const otherIcon = otherQuestion.querySelector('.faq-icon');
                    otherAnswer.classList.remove('active');
                    otherIcon.textContent = '+';
                }
            });
            
            // Toggle current FAQ
            question.classList.toggle('active');
            answer.classList.toggle('active');
            icon.textContent = answer.classList.contains('active') ? '−' : '+';
        });
    });
}

// Product gallery functionality
function initProductGallery() {
    const thumbnails = document.querySelectorAll('.thumbnail');
    const mainImage = document.getElementById('main-product-image');
    
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', () => {
            // Remove active class from all thumbnails
            thumbnails.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked thumbnail
            thumbnail.classList.add('active');
            
            // Update main image
            if (mainImage) {
                const newSrc = thumbnail.getAttribute('data-src');
                mainImage.src = newSrc;
            }
        });
    });
}

// Variant selector functionality
function initVariantSelector() {
    const variantBtns = document.querySelectorAll('.variant-btn');
    
    variantBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            variantBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            btn.classList.add('active');
        });
    });
}

// Add to cart functionality
function initAddToCart() {
    const addToCartBtn = document.getElementById('add-to-cart');
    
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', () => {
            const activeVariant = document.querySelector('.variant-btn.active');
            if (activeVariant) {
                const variant = activeVariant.getAttribute('data-variant');
                const variantName = activeVariant.querySelector('.variant-name').textContent;
                addToCart('not a miracle balm™', variantName, 14.99);
            } else {
                showNotification('Please select a variant first!');
            }
        });
    }
}

// Newsletter form functionality
function initNewsletter() {
    const newsletterForms = document.querySelectorAll('.newsletter-form');
    
    newsletterForms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = form.querySelector('.newsletter-input').value;
            
            if (email) {
                showNotification('Thanks for subscribing! We promise not to be annoying.');
                form.querySelector('.newsletter-input').value = '';
            }
        });
    });
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Mobile menu functionality
function initMobileMenu() {
    // This would be for a mobile hamburger menu if we add one
    // For now, the navigation is simple and responsive
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initAccordions();
    initFAQ();
    initProductGallery();
    initVariantSelector();
    initAddToCart();
    initNewsletter();
    initSmoothScrolling();
    initMobileMenu();
    updateCartDisplay();
});

// Handle page-specific functionality
if (window.location.pathname.includes('products.html')) {
    // Product page specific functionality
    document.addEventListener('DOMContentLoaded', () => {
        // Set default variant as active
        const firstVariant = document.querySelector('.variant-btn');
        if (firstVariant) {
            firstVariant.classList.add('active');
        }
    });
}

// Handle checkout (placeholder)
if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
        if (cart.length > 0) {
            showNotification('Checkout functionality would be implemented here!');
            // In a real implementation, this would redirect to a checkout page
            // or open a checkout modal with payment processing
        }
    });
}

// Add some fun interactions
document.addEventListener('DOMContentLoaded', () => {
    // Add hover effects to product cards
    const productCards = document.querySelectorAll('.product-card, .review-card, .value-card');
    
    productCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
    
    // Add click effects to buttons
    const buttons = document.querySelectorAll('.cta-button, .variant-btn, .faq-question, .accordion-header');
    
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            button.style.transform = 'scale(0.95)';
            setTimeout(() => {
                button.style.transform = 'scale(1)';
            }, 150);
        });
    });
});

// Console message for developers
console.log(`
🎉 Welcome to the not a miracle balm™ website!
Built with love, honesty, and a healthy dose of Utah humor.

If you're a developer and want to contribute or report issues,
we'd love to hear from you at hello@notamiraclebalm.com

Remember: This is just good balm. No miracles, just results.
`);


