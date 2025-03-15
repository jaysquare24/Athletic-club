let index = 0;
const slides = document.querySelector('.slider');
const dots = document.querySelectorAll('.dot');
const totalSlides = document.querySelectorAll('.slider img').length; // Now 4 (includes duplicate)

// Function to move slider
function updateSlider() {
    slides.style.transition = "transform 0.5s ease-in-out";
    slides.style.transform = `translateX(${-index * 100}%)`;

    // Reset active dot (except for the duplicate slide)
    dots.forEach(dot => dot.classList.remove("active"));
    if (index < totalSlides - 1) {
        dots[index].classList.add("active");
    }
}

// Function to go to next slide
function nextSlide() {
    index++;
    updateSlider();

    // If at the last (duplicate) slide, reset to first slide instantly
    if (index === totalSlides - 1) {
        setTimeout(() => {
            slides.style.transition = "none"; // Disable animation
            index = 0; // Reset to first slide
            slides.style.transform = `translateX(0%)`; // Instantly move back
        }, 500); // Wait for animation to finish (500ms)
    }
}

// Function to go to previous slide
function prevSlide() {
    if (index === 0) {
        index = totalSlides - 2; // Jump to the last real slide
        slides.style.transition = "none"; // Remove transition effect
        slides.style.transform = `translateX(${-index * 100}%)`;
    } else {
        index--;
    }
    updateSlider();
}

// Auto-slide function
function autoSlide() {
    nextSlide();
}
let autoSlideInterval = setInterval(autoSlide, 3000);

// Pause auto-slide on hover
document.getElementById('button').addEventListener("mouseover", () => {
    clearInterval(autoSlideInterval);
});
document.getElementById('button').addEventListener("mouseleave", () => {
    autoSlideInterval = setInterval(autoSlide, 3000);
});

// Initialize the slider
updateSlider();
