window.addEventListener("load", () => {
    const wrapper = document.querySelector("#loader-wrapper");
    
    // The entire sequence (Point + Text) completes in 2 seconds
    setTimeout(() => {
        wrapper.classList.add("loader-fade-out");
    }, 2000); 
});
