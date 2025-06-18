// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const navMenu = document.querySelector('nav ul');
    
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('show');
        });
    }
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu.classList.contains('show')) {
                navMenu.classList.remove('show');
            }
        });
    });
    
    // Active link highlighting
    const currentPage = window.location.pathname.split('/').pop();
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (currentPage === linkPage) {
            link.parentElement.classList.add('active');
        } else {
            link.parentElement.classList.remove('active');
        }
    });
});

// Form Submission Handling (for forms without PHP)
document.addEventListener('DOMContentLoaded', function() {
    const serviceForm = document.getElementById('service-form');
    const feedbackForm = document.getElementById('feedback-form');
    
    if (serviceForm) {
        serviceForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulate form submission
            setTimeout(function() {
                serviceForm.classList.add('hidden');
                document.getElementById('success-message').classList.remove('hidden');
                
                // Store the submitted service in localStorage (for admin page)
                const formData = new FormData(serviceForm);
                const serviceData = {
                    orgName: formData.get('org-name'),
                    contact: formData.get('contact'),
                    title: formData.get('service-title'),
                    description: formData.get('service-desc'),
                    category: formData.get('category'),
                    location: formData.get('location'),
                    status: 'pending',
                    timestamp: new Date().toISOString()
                };
                
                let submittedServices = JSON.parse(localStorage.getItem('submittedServices')) || [];
                submittedServices.push(serviceData);
                localStorage.setItem('submittedServices', JSON.stringify(submittedServices));
            }, 1000);
        });
    }
    
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulate form submission
            setTimeout(function() {
                feedbackForm.classList.add('hidden');
                document.getElementById('feedback-success').classList.remove('hidden');
            }, 1000);
        });
    }
});

// Search Services Functionality
document.addEventListener('DOMContentLoaded', function() {
    const searchBtn = document.getElementById('search-btn');
    const categorySelect = document.getElementById('category-select');
    const resultsContainer = document.getElementById('results-container');
    
    if (searchBtn && categorySelect && resultsContainer) {
        searchBtn.addEventListener('click', function() {
            const selectedCategory = categorySelect.value;
            
            if (!selectedCategory) {
                alert('Please select a category first');
                return;
            }
            
            // Display loading state
            resultsContainer.innerHTML = '<div class="loading-message"><i class="fas fa-spinner fa-spin"></i><p>Searching for services...</p></div>';
            
            // Simulate API call with timeout
            setTimeout(function() {
                displayServices(selectedCategory);
            }, 800);
        });
    }
    
    function displayServices(category) {
        // Dummy data for services
        const services = {
            food: [
                {
                    title: "Free Community Kitchen",
                    description: "Daily meals provided to those in need from 12pm to 3pm.",
                    location: "Model Town, Lahore",
                    link: "#"
                },
                {
                    title: "Ration Distribution Center",
                    description: "Monthly ration packages for low-income families. Registration required.",
                    location: "Allama Iqbal Town, Lahore",
                    link: "#"
                },
                {
                    title: "Ramadan Food Program",
                    description: "Free iftar and sehri during Ramadan month for the needy.",
                    location: "Various locations in Lahore",
                    link: "#"
                },
                {
                    title: "Street Children Feeding Program",
                    description: "Daily breakfast for street children near major intersections.",
                    location: "Multiple locations",
                    link: "#"
                }
            ],
            housing: [
                {
                    title: "Emergency Shelter for Homeless",
                    description: "Temporary housing with basic amenities for homeless individuals.",
                    location: "Near Lahore Railway Station",
                    link: "#"
                },
                {
                    title: "Women's Shelter Home",
                    description: "Safe accommodation for women in distress with counseling services.",
                    location: "Gulberg, Lahore",
                    link: "#"
                },
                {
                    title: "Winter Shelter Program",
                    description: "Night shelters during winter months for those without housing.",
                    location: "Various locations",
                    link: "#"
                }
            ],
            healthcare: [
                {
                    title: "Free Medical Camp",
                    description: "Weekly medical camp with free consultations and basic medicines.",
                    location: "Shalimar Town, Lahore",
                    link: "#"
                },
                {
                    title: "Mother & Child Health Center",
                    description: "Free prenatal and postnatal care for underprivileged women.",
                    location: "Walled City, Lahore",
                    link: "#"
                },
                {
                    title: "Mobile Health Unit",
                    description: "Mobile clinic visiting different slum areas weekly.",
                    location: "Various locations",
                    link: "#"
                },
                {
                    title: "Free Eye Camp",
                    description: "Free eye checkups and glasses for those in need.",
                    location: "Jail Road, Lahore",
                    link: "#"
                }
            ],
            education: [
                {
                    title: "Free Primary School",
                    description: "Education for children aged 5-12 from low-income families.",
                    location: "Faisal Town, Lahore",
                    link: "#"
                },
                {
                    title: "Adult Literacy Program",
                    description: "Evening classes for adults to learn basic reading and writing.",
                    location: "Samnabad, Lahore",
                    link: "#"
                },
                {
                    title: "Vocational Training Center",
                    description: "Free skill development courses for youth.",
                    location: "Township, Lahore",
                    link: "#"
                },
                {
                    title: "Street Children School",
                    description: "Non-formal education for street children with flexible timings.",
                    location: "Data Darbar, Lahore",
                    link: "#"
                }
            ]
        };
        
        const categoryServices = services[category] || [];
        
        if (categoryServices.length === 0) {
            resultsContainer.innerHTML = '<div class="no-results"><i class="fas fa-info-circle"></i><p>No services found in this category. Please check back later.</p></div>';
            return;
        }
        
        let html = '';
        categoryServices.forEach(service => {
            html += `
                <div class="service-listing">
                    <h3>${service.title}</h3>
                    <span class="category">${getCategoryName(category)}</span>
                    <p class="description">${service.description}</p>
                    <p class="location"><i class="fas fa-map-marker-alt"></i> ${service.location}</p>
                    <a href="${service.link}" class="btn visit-btn">Visit Service</a>
                </div>
            `;
        });
        
        resultsContainer.innerHTML = html;
    }
    
    function getCategoryName(category) {
        const names = {
            food: 'Food Assistance',
            housing: 'Housing Support',
            healthcare: 'Healthcare',
            education: 'Education'
        };
        return names[category] || 'Service';
    }
});