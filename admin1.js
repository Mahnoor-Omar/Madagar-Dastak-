document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    const adminContent = document.getElementById('admin-content');
    const loginBtn = document.getElementById('login-btn');
    const logoutBtn = document.getElementById('logout-btn');
    const refreshBtn = document.getElementById('refresh-btn');
    const pendingList = document.getElementById('pending-list');
    const approvedList = document.getElementById('approved-list');
    
    // Check if admin is already logged in
    if (localStorage.getItem('adminLoggedIn') === 'true') {
        loginForm.classList.add('hidden');
        adminContent.classList.remove('hidden');
        loadServices();
    } else {
        loginForm.classList.remove('hidden');
        adminContent.classList.add('hidden');
    }
    
    // Admin login
    if (loginBtn) {
        loginBtn.addEventListener('click', function() {
            const username = document.getElementById('admin-username').value;
            const password = document.getElementById('admin-password').value;
            
            // Simple authentication (in real app, this would be server-side)
            if (username === 'admin' && password === 'admin123') {
                localStorage.setItem('adminLoggedIn', 'true');
                loginForm.classList.add('hidden');
                adminContent.classList.remove('hidden');
                loadServices();
            } else {
                alert('Invalid username or password');
            }
        });
    }
    
    // Logout
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            localStorage.removeItem('adminLoggedIn');
            loginForm.classList.remove('hidden');
            adminContent.classList.add('hidden');
        });
    }
    
    // Refresh services
    if (refreshBtn) {
        refreshBtn.addEventListener('click', function() {
            loadServices();
        });
    }
    
    // Load services from localStorage
    function loadServices() {
        let services = JSON.parse(localStorage.getItem('submittedServices')) || [];
        
        // Filter pending and approved services
        const pendingServices = services.filter(service => service.status === 'pending');
        const approvedServices = services.filter(service => service.status === 'approved');
        
        // Display pending services
        if (pendingServices.length > 0) {
            let html = '';
            pendingServices.forEach((service, index) => {
                html += `
                    <div class="service-item">
                        <div class="service-info">
                            <h4>${service.title}</h4>
                            <p>${service.orgName} • ${service.category}</p>
                            <p>${service.location}</p>
                        </div>
                        <div class="service-actions">
                            <button class="btn approve-btn" data-index="${index}">Approve</button>
                            <button class="btn reject-btn" data-index="${index}">Reject</button>
                        </div>
                    </div>
                `;
            });
            pendingList.innerHTML = html;
        } else {
            pendingList.innerHTML = '<p class="no-services">No pending services at this time.</p>';
        }
        
        // Display approved services
        if (approvedServices.length > 0) {
            let html = '';
            approvedServices.forEach(service => {
                html += `
                    <div class="service-item">
                        <div class="service-info">
                            <h4>${service.title}</h4>
                            <p>${service.orgName} • ${service.category}</p>
                            <p>${service.location}</p>
                        </div>
                    </div>
                `;
            });
            approvedList.innerHTML = html;
        } else {
            approvedList.innerHTML = '<p class="no-services">No approved services yet.</p>';
        }
        
        // Add event listeners to approve/reject buttons
        document.querySelectorAll('.approve-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                updateServiceStatus(parseInt(this.dataset.index), 'approved');
            });
        });
        
        document.querySelectorAll('.reject-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                updateServiceStatus(parseInt(this.dataset.index), 'rejected');
            });
        });
    }
    
    // Update service status
    function updateServiceStatus(index, status) {
        let services = JSON.parse(localStorage.getItem('submittedServices')) || [];
        
        if (index >= 0 && index < services.length) {
            services[index].status = status;
            localStorage.setItem('submittedServices', JSON.stringify(services));
            loadServices();
            
            if (status === 'approved') {
                alert('Service approved successfully!');
            } else {
                alert('Service rejected.');
            }
        }
    }
});