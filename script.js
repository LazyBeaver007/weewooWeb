/*
 * SCRIPT.JS
 * - Handles "Copy Code" buttons
 * - Handles text-reveal on scroll
 *
 * This script is theme-agnostic and works perfectly
 * with the new fantasy theme.
 */

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. COPY CODE BUTTONS ---
    const allCopyButtons = document.querySelectorAll('.copy-btn');
    allCopyButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const buttonEl = e.currentTarget;
            
            // Find the <pre> tag, which is the button's sibling
            const codeBlock = buttonEl.previousElementSibling;
            if (codeBlock) {
                const codeText = codeBlock.textContent;

                // Use navigator.clipboard.writeText
                navigator.clipboard.writeText(codeText).then(() => {
                    // Success!
                    buttonEl.textContent = 'Copied!';
                    buttonEl.classList.add('copied');
                    
                    // Reset button text after 2 seconds
                    setTimeout(() => {
                        buttonEl.textContent = 'Copy';
                        buttonEl.classList.remove('copied');
                    }, 2000);

                }).catch(err => {
                    console.error('Failed to copy text: ', err);
                });
            } else {
                console.error('Could not find code block to copy.');
            }
        });
    });


    // --- 2. TEXT-REVEAL ON SCROLL ---
    // This uses the IntersectionObserver API for better performance
    const allSections = document.querySelectorAll('.content-section');

    const observerOptions = {
        root: null, // observes intersections relative to the viewport
        rootMargin: '0px',
        threshold: 0.1 // Triggers when 10% of the element is visible
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // When the section comes into view, add the 'is-visible' class
                entry.target.classList.add('is-visible');
                // We only want this to happen once, so we unobserve it
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Start observing all the sections
    allSections.forEach(section => {
        sectionObserver.observe(section);
    });

    
    // --- 3. HERO PARALLAX EFFECT (NEW) ---
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    // Only run this effect on non-touch devices (where 'mousemove' is reliable)
    if (hero && heroContent && window.matchMedia('(pointer: fine)').matches) {
        
        hero.addEventListener('mousemove', (e) => {
            const { clientWidth, clientHeight } = hero;
            
            // Calculate mouse position from the center (from -0.5 to 0.5)
            const x = (e.clientX / clientWidth) - 0.5;
            const y = (e.clientY / clientHeight) - 0.5;

            // Define the intensity of the effect
            const contentIntensity = 20; // How much the text moves (pixels)
            const bgIntensity = 40;    // How much the background moves (pixels)

            // Apply transforms
            // Move content *away* from the mouse
            heroContent.style.transform = `translate(${-x * contentIntensity}px, ${-y * contentIntensity}px)`;
            
            // Move background *with* the mouse (but slightly)
            // We must keep 'center' ('50%') as the base position
            hero.style.backgroundPosition = `calc(50% + ${x * bgIntensity}px) calc(50% + ${y * bgIntensity}px)`;
        });
    }

});