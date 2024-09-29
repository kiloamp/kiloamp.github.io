let slideIndexes = {
  A: 1,
  B: 1,
  C: 1,
  D: 1,
  E: 1,
  F: 1
};

showSlides(slideIndexes.A, "A");
showSlides(slideIndexes.B, "B");
showSlides(slideIndexes.C, "C");
showSlides(slideIndexes.D, "D");
showSlides(slideIndexes.E, "E");
showSlides(slideIndexes.F, "F");

function plusSlides(n, X) {
  slideIndexes[X] += n;
  showSlides(slideIndexes[X], X);
}

function currentSlide(n, X) {
  slideIndexes[X] = n;
  showSlides(slideIndexes[X], X);
}

function showSlides(n, X) {
  let slides = document.getElementsByClassName("slide_" + X);
  if (n > slides.length) {
    slideIndexes[X] = 1;
  }
  if (n < 1) {
    slideIndexes[X] = slides.length;
  }
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slides[slideIndexes[X] - 1].style.display = "block";
}

setInterval(function() {
  const image_reel = document.getElementById('image_reel');
  const current = image_reel.children[0];  // First image (current)
  image_reel.appendChild(current);         // Move current to the end
  current.style.display = 'none';         // Hide current
  image_reel.children[0].style.display = 'block';  // Show next
}, 1500);