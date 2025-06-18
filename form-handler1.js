// Form validation and handling
document.addEventListener('DOMContentLoaded', function() {
    // Service form validation
    const serviceForm = document.getElementById('service-form');
    if (serviceForm) {
        serviceForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple validation
            const orgName = document.getElementById('org-name').value.trim();
            const contact = document.getElementById('contact').value.trim();
            const serviceTitle = document.getElementById('service-title').value.trim();
            const serviceDesc = document.getElementById('service-desc').value.trim();
            const category = document.getElementById('category').value;
            const location = document.getElementById('location').value.trim();
            
            if (!orgName || !contact || !serviceTitle || !serviceDesc || !category || !location) {
                alert('Please fill in all required fields');
                return;
            }
            
            // If using PHP, the form would submit normally
            // For demo purposes, we'll simulate submission
            if (serviceForm.getAttribute('action') === 'php/submit.php') {
                serviceForm.submit();
            } else {
                // Show success message
                serviceForm.classList.add('hidden');
                document.getElementById('success-message').classList.remove('hidden');
                
                // Store in localStorage for admin page
                const serviceData = {
                    orgName,
                    contact,
                    title: serviceTitle,
                    description: serviceDesc,
                    category,
                    location,
                    status: 'pending',
                    timestamp: new Date().toISOString()
                };
                
                let submittedServices = JSON.parse(localStorage.getItem('submittedServices')) || [];
                submittedServices.push(serviceData);
                localStorage.setItem('submittedServices', JSON.stringify(submittedServices));
            }
        });
    }
    
    // Feedback form validation
    const feedbackForm = document.getElementById('feedback-form');
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple validation
            const serviceUsed = document.getElementById('service-used').value.trim();
            const category = document.getElementById('feedback-category').value;
            const comments = document.getElementById('comments').value.trim();
            
            if (!serviceUsed || !category || !comments) {
                alert('Please fill in all required fields');
                return;
            }
            
            // If using PHP, the form would submit normally
            // For demo purposes, we'll simulate submission
            if (feedbackForm.getAttribute('action') === 'php/feedback.php') {
                feedbackForm.submit();
            } else {
                // Show success message
                feedbackForm.classList.add('hidden');
                document.getElementById('feedback-success').classList.remove('hidden');
            }
        });
    }
});