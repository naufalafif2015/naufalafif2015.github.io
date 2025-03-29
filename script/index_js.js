// Audio play
function toggleAudio() {
    const audio = document.getElementById('music');
    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }
}

// Video toggle functionality
function toggleVideos() {
    const loopVideo = document.getElementById('loopVideo');
    const vibeVideo = document.getElementById('vibeVideo');
    const startPartyBtn = document.getElementById('startPartyBtn');
    
    // Hide loop video and show vibe video
    loopVideo.style.display = 'none';
    vibeVideo.style.display = 'block';
    
    // Hide the button
    startPartyBtn.style.display = 'none';
    
    // Remove loop attribute and play once
    vibeVideo.removeAttribute('loop');
    vibeVideo.play();
    
    // When vibe video ends, show loop video again and show button
    vibeVideo.addEventListener('ended', function() {
        vibeVideo.style.display = 'none';
        loopVideo.style.display = 'block';
        loopVideo.play();
        
        // Show the button again
        startPartyBtn.style.display = 'block';
        
        // Restore loop attribute
        vibeVideo.setAttribute('loop', '');
    });
}

// Initialize Bootstrap components and add hover effects
document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('theme-toggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

    // Initialize videos
    const loopVideo = document.getElementById('loopVideo');
    const vibeVideo = document.getElementById('vibeVideo');
    
    // Ensure loop video is visible and playing
    loopVideo.style.display = 'block';
    vibeVideo.style.display = 'none';
    
    // Start playing the loop video
    loopVideo.play().catch(error => {
        console.log('Auto-play was prevented');
    });

    // Initialize Bootstrap components
    const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
    const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl));
    
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
    
    // Add scrollspy functionality
    const scrollSpy = new bootstrap.ScrollSpy(document.body, {
        target: '#navbar-scroll',
        offset: 200
    });

    // Handle iframe sizing
    const iframe = document.querySelector('iframe[title="YouTube video player"]');
    if (iframe) {
        function adjustIframeSize() {
            const viewportWidth = window.innerWidth;
            let width = viewportWidth * 0.4;
            if (width > 400) width = 400;
            if (width < 320) width = 320;
            const height = width * 9 / 16;
            iframe.style.width = `${width}px`;
            iframe.style.height = `${height}px`;
        }
        
        adjustIframeSize();
        window.addEventListener('resize', adjustIframeSize);
    }

    // Theme toggle
    themeToggle.addEventListener('click', function() {
        // Update body class
        document.body.classList.toggle('dark-mode');
        this.textContent = document.body.classList.contains('dark-mode') 
            ? 'Toggle Light Mode' 
            : 'Toggle Night Mode';
        
        // Update card styles
        const cards = document.querySelectorAll('.card-body');
        cards.forEach(card => {
            card.classList.toggle('light-mode');
            card.classList.toggle('dark-mode');
        });

        // Update accordion styles
        const accordions = document.querySelectorAll('.accordion');
        accordions.forEach(accordion => {
            accordion.classList.toggle('light-mode');
            accordion.classList.toggle('dark-mode');
        });
    });

    // Navigation outline on scroll
    document.addEventListener('activate.bs.scrollspy', function(e) {
        document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
            link.classList.remove('active-outline');
        });
        const activeLink = document.querySelector('.navbar-nav .nav-link.active');
        if (activeLink) {
            activeLink.classList.add('active-outline');
        }
    });

    // Word hover effects
        // const paragraphs = document.querySelectorAll('em, h1, h2, h3, h4, h5, small');
        // paragraphs.forEach(element => {
        //     // Skip mark elements
        //     if (element.tagName === 'mark') return;
            
        //     // Get existing classes and styles
        //     const existingClasses = element.className;
        //     const existingStyles = element.getAttribute('style') || '';
            
        //     const text = element.textContent;
        //     const words = text.split(' ');
            
        //     // Create word spans with preserved classes and styles
        //     const wrappedText = words.map(word => {
        //         const span = document.createElement('span');
        //         span.className = `word ${existingClasses}`;
        //         span.style.cssText = existingStyles;
        //         span.textContent = word;
        //         return span.outerHTML;
        //     }).join(' ');
            
        //     element.innerHTML = wrappedText;
        // });

    // Card hover effects
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        const href = card.getAttribute('href');
        const target = card.getAttribute('target');

        card.addEventListener('click', function(e) {
            if (e.target !== this) return;
            if (href) {
                window.open(href, target || '_self');
            }
        });

        card.addEventListener('mouseover', function(e) {
            if (e.target === this) {
                const rotation = Math.random() * 20 - 10;
                this.style.transform = `scale(1.05) rotate(${rotation}deg)`;
            }
        });

        card.addEventListener('mouseout', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });
});
