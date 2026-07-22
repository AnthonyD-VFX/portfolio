// Hamburger Menu
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close menu when link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Load portfolio data
async function loadPortfolio() {
    try {
        const response = await fetch('data.json');
        const data = await response.json();
        displayPortfolio(data.portfolio);
        setupFilters(data.portfolio);
    } catch (error) {
        console.error('Error loading portfolio:', error);
        // Display sample content if data.json is not available
        displaySampleContent();
    }
}

function displayPortfolio(portfolio) {
    const grid = document.getElementById('portfolioGrid');
    grid.innerHTML = '';

    portfolio.forEach(item => {
        const element = document.createElement('div');
        element.className = `portfolio-item ${item.category}`;
        element.innerHTML = `
            <img src="${item.image}" alt="${item.title}" class="portfolio-image">
            <div class="portfolio-info">
                <div>
                    <div class="portfolio-title">${item.title}</div>
                    <span class="portfolio-category">${item.category}</span>
                </div>
                <p class="portfolio-description">${item.description}</p>
            </div>
        `;
        
        element.addEventListener('click', () => openModal(item));
        grid.appendChild(element);
    });
}

function setupFilters(portfolio) {
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Filter items
            const filterValue = btn.getAttribute('data-filter');
            const items = document.querySelectorAll('.portfolio-item');
            
            items.forEach(item => {
                if (filterValue === 'all') {
                    item.classList.remove('hidden');
                } else {
                    if (item.classList.contains(filterValue)) {
                        item.classList.remove('hidden');
                    } else {
                        item.classList.add('hidden');
                    }
                }
            });
        });
    });
}

function openModal(item) {
    const modal = document.getElementById('modal');
    const modalContent = document.getElementById('modalContent');
    
    let content = `
        <h2>${item.title}</h2>
        <p><strong>Category:</strong> ${item.category}</p>
        <p><strong>Description:</strong> ${item.description}</p>
    `;
    
    if (item.image) {
        content += `<img src="${item.image}" alt="${item.title}" style="width: 100%; max-width: 600px; margin: 1rem 0; border-radius: 10px;">`;
    }
    
    if (item.video) {
        content += `<div style="margin: 1rem 0;"><video width="100%" max-width="600px" controls style="border-radius: 10px;"><source src="${item.video}" type="video/mp4"></video></div>`;
    }
    
    if (item.link) {
        content += `<p><a href="${item.link}" target="_blank" style="color: #00d4ff; text-decoration: none;">View Full Project →</a></p>`;
    }
    
    modalContent.innerHTML = content;
    modal.style.display = 'block';
}

document.getElementById('modalClose').addEventListener('click', () => {
    document.getElementById('modal').style.display = 'none';
});

window.addEventListener('click', (event) => {
    const modal = document.getElementById('modal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

// Display sample content if data.json is not available
function displaySampleContent() {
    const sampleData = {
        portfolio: [
            {
                title: "Futuristic Robot Asset",
                category: "3d-assets",
                description: "High-poly 3D asset ready for games and visualization",
                image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='200'%3E%3Crect fill='%231a1f3a' width='300' height='200'/%3E%3Ctext x='150' y='100' font-size='18' fill='%2300d4ff' text-anchor='middle' dominant-baseline='middle'%3EAdd Your Images Here%3C/text%3E%3C/svg%3E"
            },
            {
                title: "Character Design",
                category: "characters",
                description: "Original character model with detailed features",
                image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='200'%3E%3Crect fill='%231a1f3a' width='300' height='200'/%3E%3Ctext x='150' y='100' font-size='18' fill='%2300d4ff' text-anchor='middle' dominant-baseline='middle'%3EAdd Your Images Here%3C/text%3E%3C/svg%3E"
            },
            {
                title: "Texture Pack",
                category: "texturing",
                description: "Professional textures for realistic surfaces",
                image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='200'%3E%3Crect fill='%231a1f3a' width='300' height='200'/%3E%3Ctext x='150' y='100' font-size='18' fill='%2300d4ff' text-anchor='middle' dominant-baseline='middle'%3EAdd Your Images Here%3C/text%3E%3C/svg%3E"
            }
        ]
    };
    displayPortfolio(sampleData.portfolio);
    setupFilters(sampleData.portfolio);
}

// Load portfolio on page load
loadPortfolio();
