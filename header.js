document.addEventListener('DOMContentLoaded', function () {
    var headerContent = `
        <!-- header.html content goes here -->
        <header class="small-header">
            <div class="header-content">
                <a href="index.html">
                <img src="more_travel_logo.png" alt="Company Logo" id="company-logo">
                </a>
            </div>
            <nav>
                <a href="index.html">Home</a>
                <a href="job-openings.html">Current Job Openings</a>
                <a href="internships.html">Internships</a>
                <div class="dropdown">
                    <button class="dropbtn">Life at More Travel</button>
                    <div class="dropdown-content">
                        <a href="benefits.html">Benefits</a>
                        <a href="culture.html">Culture</a>
                        <a href="diversity.html">Diversity</a>
                        <a href="flexible-work.html">Flexible Work</a>
                    </div>
                </div>
                <a href="hiring-tips.html">Hiring Tips</a>
                <a href="testimonies.html">Testimonials</a>
            </nav>
            <a href="apply.html" class="apply-button">Apply Now</a>
        </header>
    `;

    // Insert the header content into the header-container div
    document.getElementById('header-container').innerHTML = headerContent;
});
