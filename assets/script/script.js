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


  function switchVisibilite(el){
    const element = document.getElementById(el);
    element.classList.toggle("show");
  }


    document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.carousel');
    const track = document.querySelector('.carousel-track');
    const items = Array.from(track.children);

    function updateItems() {
      const middleIndex = Math.floor(items.length / 2);

      items.forEach((item, index) => {
        item.classList.toggle('middle', index === middleIndex);
      });
    }

    updateItems();
    setInterval(updateItems, 10000); // Sync with the animation duration
  });