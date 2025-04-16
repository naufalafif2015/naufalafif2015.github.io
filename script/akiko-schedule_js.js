const dataBackground = {
    1: "static/images/index/background/4brothers-thumnail.jpg",
    2: "static/images/index/background/lilik.jpg",
    3: "static/images/index/background/lilik-dab.jpg",
    4: "static/images/index/background/naufal-setup.jpg",
    5: "static/images/index/background/nauvalation.jpg",
    6: "static/images/index/background/sony-vegas-xd.jpg",
}

// Helper: Generate the days settings markup
function renderDaySettings() {
    const days = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
    ];
    let html = "";
    days.forEach((day) => {
        html += `
        <div class="card mb-3">
            <div class="card-body">
                <h5>${day}</h5>
                <div class="mb-2">
                    <label>Time</label>
                    <input type="text" class="form-control" placeholder="Enter time" />
                </div>
                <div class="mb-2">
                    <label>Icon</label>
                    <input type="file" class="form-control" />
                </div>
                <div class="mb-2">
                    <label>Custom Background</label>
                    <input type="file" class="form-control" />
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" />
                    <label class="form-check-label">No Schedule</label>
                </div>
            </div>
        </div>
        `;
    });
    const daysSettingsDiv = document.getElementById('days-settings');
    if (daysSettingsDiv) {
        daysSettingsDiv.innerHTML = html;
    }
}

// Function to handle adding social media input rows
function setupAddSocialMediaRow() {
    const addSocialMediaBtn = document.getElementById("add-social-media");
    if (!addSocialMediaBtn) return;
    addSocialMediaBtn.addEventListener("click", function () {
        const socialMediaList = document.getElementById("social-media-list");
        if (!socialMediaList) return;
        const newRow = document.createElement("div");
        newRow.classList.add("mb-3", "border", "p-2");
        newRow.innerHTML = `
            <div class="mb-2">
            <label>Social Media Position</label>
            <select class="form-select">
                <option value="below-right">Below Right</option>
                <option value="below-left">Below Left</option>
                <option value="above-right">Above Right</option>
                <option value="above-left">Above Left</option>
            </select>
            </div>
            <div class="mb-2">
            <label>Text</label>
            <input type="text" class="form-control" placeholder="Enter social media text" />
            </div>
            <div class="mb-2">
            <label>Icon</label>
            <input type="file" class="form-control" />
            </div>
        `;
        socialMediaList.appendChild(newRow);
    });
}

// Function to handle resolution changes for the art area and schedule panel
function setupResolutionChangeHandler() {
    const resolutionSelect = document.getElementById("resolution");
    if (!resolutionSelect) return;
    resolutionSelect.addEventListener("change", function () {
        const resolution = this.value;
        const artAreaInner = document.getElementById("art-area-inner");
        const schedulePanel = document.getElementById("schedule-panel");
        if (!artAreaInner || !schedulePanel) return;

        // Remove previous aspect-ratio classes
        artAreaInner.classList.remove("ratio-1-1", "ratio-16-9", "ratio-9-16");

        // Set aspect ratio via class
        if (resolution === "1:1") {
            artAreaInner.classList.add("ratio-1-1");
            schedulePanel.classList.remove("mt-2");
        } else if (resolution === "16:9") {
            artAreaInner.classList.add("ratio-16-9");
            schedulePanel.classList.add("mt-2");
        } else if (resolution === "9:16") {
            artAreaInner.classList.add("ratio-9-16");
            schedulePanel.classList.add("mt-2");
        }
    });
}

function initTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

    // Start with dark mode
    document.body.classList.add('dark-mode');
    document.body.classList.remove('light-mode');
    themeToggle.textContent = 'Toggle Light Mode';

    // Listen for system theme changes
    prefersDarkScheme.addEventListener('change', (e) => {
        if (e.matches) {
            document.body.classList.add('dark-mode');
            document.body.classList.remove('light-mode');
            themeToggle.textContent = 'Toggle Light Mode';
        } else {
            document.body.classList.add('light-mode');
            document.body.classList.remove('dark-mode');
            themeToggle.textContent = 'Toggle Night Mode';
        }
    });

    // Manual theme toggle on click
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        document.body.classList.toggle('light-mode');
        this.textContent = document.body.classList.contains('dark-mode') 
            ? 'Toggle Light Mode' 
            : 'Toggle Night Mode';

        // Update card and accordion styles if needed
        document.querySelectorAll('.card-body').forEach(card => {
            card.classList.toggle('light-mode');
            card.classList.toggle('dark-mode');
        });
        document.querySelectorAll('.accordion').forEach(accordion => {
            accordion.classList.toggle('light-mode');
            accordion.classList.toggle('dark-mode');
        });
    });
}

// Initialize parallax background container and update functions
function initParallax() {
    const parallax = document.querySelector('.parallax');
    const keys = Object.keys(dataBackground);
    let currentImageIndex = 0;
    const parallaxSpeed = -0.1;

    // Create background container
    const container = document.createElement('div');
    container.classList.add('background-container');
    container.style.backgroundImage = `url(${getRandomImage()})`;
    container.style.backgroundPosition = 'center';
    container.style.backgroundSize = 'cover';
    container.style.transition = 'opacity 3.5s ease';
    container.style.filter = 'blur(10px)';
    container.style.position = 'fixed';
    container.style.width = '125%';
    container.style.height = '100%';
    container.style.top = '0';
    container.style.left = '50%';
    container.style.zIndex = '-1';
    container.style.marginTop = '200px';
    container.style.transform = 'translateX(-50%) rotate(5deg)';
    container.style.transformOrigin = 'center center';
    container.style.opacity = '0'; // Start invisible
    
    parallax.appendChild(container);

    // Helper function for getting next image
    function getRandomImage() {
        currentImageIndex = (currentImageIndex + 1) % keys.length;
        return dataBackground[keys[currentImageIndex]];
    }

    // Update the container position on scroll for parallax effect
    function updateBackgrounds() {
        const scrollY = window.scrollY;
        const parallaxPosition = scrollY * parallaxSpeed;
        container.style.transform = `translateX(-50%) translateY(${parallaxPosition}px) rotate(5deg)`;
    }

    // Initial parallax update and event listener for scroll
    updateBackgrounds();
    window.addEventListener('scroll', updateBackgrounds);

    // Change background image on an interval
    setInterval(() => {
        if (container) {
            container.style.opacity = '0';
            setTimeout(() => {
                container.style.backgroundImage = `url(${getRandomImage()})`;
                container.style.opacity = '0.6';
            }, 3500);
        }
    }, 8000);
    
    // Fade in the background container after a short delay
    setTimeout(() => {
        if (container) {
            container.style.opacity = '0.6';
        }
    }, 100);
}

function getConfigData() {
    // Replace this with your actual config data collecting logic
    // Example: Collecting from global variables or form fields
    const config = {
      title: document.getElementById('title-input')?.value || '',
      description: document.getElementById('title-desc-input')?.value || '',
      // Add more fields as needed
    };
    return config;
  }
  
function downloadConfigFile() {
    const config = getConfigData();
    const dataStr = JSON.stringify(config, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = "akiko-schedule-config.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}
  
function initDownloadSettingsButton() {
    const downloadBtn = document.getElementById('download-settings');
    if (downloadBtn) {
    downloadBtn.addEventListener('click', downloadConfigFile);
    }
}

// Overall Initialization Function
function initApp() {
    initTheme();
    initParallax();
    renderDaySettings();
    setupAddSocialMediaRow();
    setupResolutionChangeHandler();
    initDownloadSettingsButton();
}

// Run the app once the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initApp);