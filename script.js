// script.js
function showTab(tabName) {
    // Hide all tabs
    var tabs = document.getElementsByClassName('tab-content');
    for (var i = 0; i < tabs.length; i++) {
        tabs[i].classList.remove('active');
    }

    // Show the selected tab
    var selectedTab = document.getElementById(tabName);
    if (selectedTab) {
        selectedTab.classList.add('active');
    }
}

// Search bar from index.html uses this function to evaluate locations
// Filters through job openings data and displays it when pressed
function searchLocation() {
    const locationInput = document.getElementById('locationInput');
    const userInput = locationInput.value.trim().toLowerCase();

    // List of available locations (convert them to lowercase)
    const locations = ['seattle', 'new delhi', 'edmonton', ];

    // Checks if the user input matches one of the predefined locations
    if (locations.includes(userInput)) {
        // Redirects to job-openings.html with the selected location
        window.location.href = 'job-openings.html?location=' + encodeURIComponent(userInput);
    } else {
        // Shows an alert for invalid location
        alert('No jobs available in this location.');
    }
}

function autocomplete() {
    const locationInput = document.getElementById('locationInput');
    const suggestionsContainer = document.getElementById('suggestions-container');

    // List of available locations
    const locations = ['Seattle', 'New Delhi', 'Edmonton'];

    // Clear previous suggestions
    suggestionsContainer.innerHTML = '';

    // Get user input
    const userInput = locationInput.value.toLowerCase();

    // Filter locations based on user input
    const filteredLocations = locations.filter(location =>
        location.toLowerCase().includes(userInput)
    );

    // Display suggestions
    filteredLocations.forEach(location => {
        const suggestionItem = document.createElement('li');
        suggestionItem.innerText = location;
        suggestionItem.addEventListener('click', () => {
            locationInput.value = location;
            suggestionsContainer.innerHTML = '';
        });

        // Add some styling for spacing
        suggestionItem.style.margin = '2px'; // Adjust the value as needed

        suggestionsContainer.appendChild(suggestionItem);
    });

    // Show or hide suggestions container
    if (filteredLocations.length > 0) {
        suggestionsContainer.style.display = 'block';
    } else {
        suggestionsContainer.style.display = 'none';
    }
}

// Attach the autocomplete function to the input's input event
document.getElementById('locationInput').addEventListener('input', autocomplete);