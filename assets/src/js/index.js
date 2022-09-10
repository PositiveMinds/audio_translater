//Triger install button===================
let deferredPrompt; // Variable should be out of scope of addEventListener method

window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  $("#install-app-btn").show();
  $("#custom-info-bar").show();
  // e.preventDefault();
  deferredPrompt = e;
});

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("sw.js")
    .then((registration) => {
      console.log("SW Registered");
      console.log(registration);
    })
    .catch((error) => {
      console.log("SW Reistration failed");
      console.log(error);
    });
}

const installApp = document.getElementById("install-app-btn");
const infoBar = document.getElementById("custom-info-bar");

installApp.addEventListener("click", async () => {
  if (deferredPrompt !== null) {
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      installApp.style.display = "none"; // Hide info bar

      infoBar.style.display = "none"; // Hide info bar
      deferredPrompt = null;
    }
  }
});

const speechModal = document.querySelector(".speech-modal");
// const openSpeechModal = document.querySelector(".openSpeechModal");

const closeSpeechModal = document
  .querySelector(".close-speech-modal")
  .addEventListener("click", () => {
    speechModal.classList.remove("activeModal");
  });

const openSpeechModal = document
  .querySelector(".openSpeechModal")
  .addEventListener("click", () => {
    speechModal.classList.add("activeModal");
  });

//SLIDER===============================

const slides = document.querySelectorAll(".slide");
const next = document.querySelector("#next");
const prev = document.querySelector("#prev");
const auto = true;
const intervalTime = 9000;
let slideInterval;

const nextSlide = () => {
  //get current class
  const current = document.querySelector(".current");

  //remove current class
  current.classList.remove("current");

  //check for next slide

  if (current.nextElementSibling) {
    //Add current class to next sibling

    current.nextElementSibling.classList.add("current");
  } else {
    //add current to start
    slides[0].classList.add("current");
  }

  setTimeout(() => current.classList.remove("current"));
};

const prevSlide = () => {
  //get current class
  const current = document.querySelector(".current");

  //remove current class
  current.classList.remove("current");

  //check for previous slide

  if (current.previousElementSibling) {
    //Add current class to previous sibling

    current.previousElementSibling.classList.add("current");
  } else {
    //add current to last slide
    slides[slides.length - 1].classList.add("current");
  }

  setTimeout(() => current.classList.remove("current"));
};

next.addEventListener("click", (e) => {
  nextSlide();
  if (auto) {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, intervalTime);
  }
});
prev.addEventListener("click", (e) => {
  prevSlide();
  if (auto) {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, intervalTime);
  }
});

//Auto slide
if (auto) {
  //Run next slide at interval
  slideInterval = setInterval(nextSlide, intervalTime);
}
