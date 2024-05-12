var popup;  
document.addEventListener("DOMContentLoaded", () => {
    popup = document.getElementById("popUp");
 });

window.addEventListener("scroll", () => {
    const scrolledUp = window.scrollY < prevScrollY;
    prevScrollY = window.scrollY;
  
    if (scrolledUp && popup) {
      popup.classList.add("show");
    } else if (popup) {
      popup.classList.remove("show");
    }
});

  let prevScrollY = window.scrollY;

