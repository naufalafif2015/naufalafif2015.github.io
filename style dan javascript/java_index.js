
document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('theme-toggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Check if dark mode is preferred by the system
    // if (prefersDarkScheme.matches) {
    //     document.body.classList.add('dark-mode');
    //     themeToggle.textContent = 'Toggle Light Mode';
    // }

    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        this.textContent = document.body.classList.contains('dark-mode') 
            ? 'Toggle Light Mode' 
            : 'Toggle Night Mode';
    });
});

function toggleAudio() {
    const audio = document.getElementById('music');
    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
    const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl));
});

document.addEventListener('DOMContentLoaded', function() {
    // Initialize popovers
    const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
    const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl));

    // Get the iframe
    const iframe = document.querySelector('iframe[title="YouTube video player"]');
    
    if (iframe) {
        function adjustIframeSize() {
            // Calculate width based on viewport width
            const viewportWidth = window.innerWidth;
            let width = viewportWidth * 0.4; // 80% of viewport width
            if (width > 400) width = 400; // Max width
            if (width < 320) width = 320; // Min width
            
            // Calculate height based on 16:9 aspect ratio
            const height = width * 9 / 16;
            
            // Set the iframe dimensions
            iframe.style.width = `${width}px`;
            iframe.style.height = `${height}px`;
        }
        
        // Initial adjustment
        adjustIframeSize();
        
        // Adjust on window resize
        window.addEventListener('resize', adjustIframeSize);
    }
});