var popup;
document.addEventListener("DOMContentLoaded", async () => {
  popup = document.getElementById("popUp");
  emailjs.init("0__CYpWZ5VcRaQyr4");

  //Эгоистка
  await loadVideos('carousel-track1', 'PL0EWiZIxqKsPg0o38WYlOz98RAtXl10vz');
  //Долина
  await loadVideos('carousel-track2', 'PL0EWiZIxqKsOLB59zXixFXnLXowWT4GC1');
  //Networker
  await loadVideos('carousel-track3', 'PL0EWiZIxqKsOBZF1_dYxblm5xjdWSVIaf');



  var continers = document.getElementsByClassName("video-limiter");
  Array.from(continers).forEach(continer => {
    buttonCheck(continer);
  })
});

function sendMail() {
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var games = [];

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
    emailjs.send("service_4rlwjy9", "template_rvlmjhh", params).then(function (response) {
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

  setTimeout(() => {
    buttonCheck(container);
  }, 600);
};

function buttonCheck(container) {
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


const apiKey = "AIzaSyD6BNAufMQra7YPJH6HdaTnkKLbothsoG8";
const chanelId = "UCK1Z9PQXRZO-n5Fv7LEHPLw";

async function fetchVideos(playlistId) {
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
      iframe.src = `https://www.youtube.com/embed/${videoId}`;
      iframe.frameBorder = "0";
      iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
      iframe.allowFullscreen = true;
      videoDiv.appendChild(iframe);

      videoContainer.appendChild(videoDiv);

      videoDiv.addEventListener('click', () => {
        showOverlay(videoId);
      });
    });
    nextPageToken = data.nextPageToken;
  } while (nextPageToken);
}

function showOverlay(videoId) {
  let overlay = document.querySelector('.overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.classList.add('overlay');
    document.body.appendChild(overlay);

    overlay.addEventListener('click', () => {
      overlay.classList.remove('active');
    });
  }

  overlay.innerHTML = `<iframe src="https://www.youtube.com/embed/${videoId}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
  overlay.classList.add('active');
}

function ScrollToReg() {

  document.querySelector('#reg').scrollIntoView({ behavior: 'smooth' });
}



