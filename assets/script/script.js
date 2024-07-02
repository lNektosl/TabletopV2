var popup;
document.addEventListener("DOMContentLoaded", async () => {

  await fetchEnvVariables();
  
  popup = document.getElementById("popUp");
  emailjs.init(window.env.JSEMAIL_APIKEY);

  //Эгоистка
  await loadVideos('carousel-track1', 'PL0EWiZIxqKsPg0o38WYlOz98RAtXl10vz');
  //Долина
  await loadVideos('carousel-track2', 'PL0EWiZIxqKsOLB59zXixFXnLXowWT4GC1');
  //Networker
  await loadVideos('carousel-track3', 'PL0EWiZIxqKsOBZF1_dYxblm5xjdWSVIaf');



  var continers = document.getElementsByClassName("carousel-track");
  Array.from(continers).forEach(continer => {
    buttonCheck(continer);
  })
});

async function fetchEnvVariables() {
  const response = await fetch('/.netlify/functions/getEnvVariables');
  const env = await response.json();
  window.env = env;
}

function sendMail() {
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var games = [];
  const apiKey = window.env.JSEMAIL_SERVICE_KEY;

  if (document.getElementById("g1").checked) {
    games.push("Эгоист/Эгоистка");
  }
  if (document.getElementById("g2").checked) {
    games.push("Долина хранительниц женской души");
  }
  if (document.getElementById("g3").checked) {
    games.push("NetWorker");
  }
  if (name != "" && email != "" && games != "") {
    var params = {
      from_name: name,
      email: email,
      games: games.join(", ")
    };
    emailjs.send(apiKey, "template_rvlmjhh", params).then(function (response) {
      console.log("Письмо успешно отправлено!", response);
      alert("Ваше сообщение успешно отправлено!");
    }, function (error) {
      console.error("Ошибка отправки письма:", error);
      alert("Произошла ошибка при отправке сообщения. Пожалуйста, попробуйте еще раз.");
    });
  }
  else {
    alert("Пожалуйста заполните поля");
  }
}



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


function switchVisibilite(el) {
  const element = document.getElementById(el);
  element.classList.toggle("show");
}


function scrollContainer(containerId, direction) {
  const container = document.getElementById(containerId);
  const scrollAmount = container.clientWidth;
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
};

var containers = document.getElementsByClassName("carousel-track");
Array.from(containers).forEach(container => {
  container.addEventListener("scroll", () => {
    buttonCheck(container);
    updateScrollThumbPosition(container);
  });
});

//handle scrollbar drug
var thumbs = document.getElementsByClassName("scrollbar-thumb");
Array.from(thumbs).forEach(thumb =>{
  thumb.addEventListener("mousedown", (e) =>{
    const startX = e.clientX;
    const thumbPosition = thumb.offsetLeft;

    //update scrollbarThumb position
    const handleMouseMove = (e) =>{
      e.preventDefault();

      const deltaX = e.clientX - startX;
      const newThumbPosition = thumbPosition + deltaX;
      const sliderScrollbar = thumb.parentElement.parentElement;
      const maxThumbPosition = sliderScrollbar.getBoundingClientRect().width - thumb.offsetWidth;

      const carouselTrack = thumb.closest('.video-container').querySelector('.carousel-track');
      const maxScrollLeft = carouselTrack.scrollWidth - carouselTrack.clientWidth;
      const boundedPosition = Math.max(0,Math.min(maxThumbPosition,newThumbPosition));
      const scrollPosition =(boundedPosition/maxThumbPosition)*maxScrollLeft;

      thumb.style.left = `${boundedPosition}px`;

      carouselTrack.scrollLeft = scrollPosition;
    }

    const handleMouseUp = () =>{
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);  
    }

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  });
});

function updateScrollThumbPosition(container) {
  const scrollPosition = container.scrollLeft;
  const maxScrollLeft = container.scrollWidth - container.clientWidth;
  const limiter = container.parentElement;
  const scrollbarThumb = limiter.querySelector(".scrollbar-thumb");
  const sliderScrollbar = limiter.querySelector(".slider-scrollbar");
  const thumbPosition = (scrollPosition / maxScrollLeft) * (sliderScrollbar.clientWidth - scrollbarThumb.offsetWidth);
  scrollbarThumb.style.left = `${thumbPosition}px`;
}

function buttonCheck(container) {
  const limiter = container.parentElement;
  const prevButton = limiter.previousElementSibling;
  const nextButton = limiter.nextElementSibling;
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




async function fetchVideos(playlistId) {
  const apiKey = window.env.YOUTUBE_APIKEY;

  const url = `https://youtube.googleapis.com/youtube/v3/playlistItems?part=contentDetails&part=snippet&maxResults=50&playlistId=${playlistId}&key=${apiKey}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

async function loadVideos(containerId, playlistId) {

  let nextPageToken = '';
  const videoContainer = document.getElementById(containerId);

  do {
    const data = await fetchVideos(playlistId);
    data.items.forEach(item => {
      const videoId = item.contentDetails.videoId;

      const videoDiv = document.createElement('div');
      videoDiv.classList.add('video');

      const iframe = document.createElement('iframe');
      iframe.width = "325";
      iframe.height = "215";
      iframe.src = `https://www.youtube.com/embed/${videoId}?showinfo=0`;
      iframe.frameBorder = "0";
      iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
      iframe.allowFullscreen = true;
      videoDiv.appendChild(iframe);
      videoContainer.appendChild(videoDiv);

    });
    nextPageToken = data.nextPageToken;
  } while (nextPageToken);
}


function ScrollToReg() {

  document.querySelector('#reg').scrollIntoView({ behavior: 'smooth' });
}



