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


function switchVisibilite(el) {
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
const playlistId = "PLgToFcDSRCvCZL4SSiVtUXapo1TK2cowZ";
const chanelId = "UCg4ahWqLsi7mgYyIIAW7oLQ";

async function fetchVideos(pageToken = '') {
    const url = `https://youtube.googleapis.com/youtube/v3/playlistItems?part=contentDetails&part=snippet&maxResults=50&playlistId=PLgToFcDSRCvCZL4SSiVtUXapo1TK2cowZ&key=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    return data;
}

async function loadVideos() {
    let nextPageToken = '';
    const videoContainer = document.getElementById('video-container');

    do {
        const data = await fetchVideos(nextPageToken);
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

loadVideos();



function scrollContainer(containerId, direction) {
  const container = document.getElementById(containerId);
  const scrollAmount = 300; // Установите количество пикселей для прокрутки

  if (direction === 'prev') {
    container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  } else if (direction === 'next') {
    container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  }
}