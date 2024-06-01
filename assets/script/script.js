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


  function scrollContainer(containerId, direction) {
    const container = document.getElementById(containerId);
    const scrollAmount = container.clientWidth
  
    if (direction === 'prev') {
      container.scrollBy({
        left: -scrollAmount,
        behavior: 'smooth'
      });
    } else if (direction === 'next') {
      container.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
setTimeout(() => {
  buttonCheck(container);
}, 500);
    
  };

  function buttonCheck(container){
    const prevButton = container.previousElementSibling;
    const nextButton = container.nextElementSibling;

    if (container.scrollLeft <= 0) {
      prevButton.style.display = 'none'; // Скрываем кнопку "назад"
  } else {
      prevButton.style.display = 'block'; // Показываем кнопку "назад"
  }

  if (container.scrollLeft + container.clientWidth >= container.scrollWidth) {
      nextButton.style.display = 'none'; // Скрываем кнопку "вперед"
  } else {
      nextButton.style.display = 'block'; // Показываем кнопку "вперед"
  }
  }