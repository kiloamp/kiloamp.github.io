let slideIndex = 1;
showSlides(slideIndex, "A");
showSlides(slideIndex, "B");
showSlides(slideIndex, "C");
showSlides(slideIndex, "D");
showSlides(slideIndex, "E");
showSlides(slideIndex, "G");
showSlides(slideIndex, "H");



function plusSlides(n, X) {
  showSlides(slideIndex += n, X);
}

function currentSlide(n, X) {
  showSlides(slideIndex = n, X);
}

function showSlides(n, X) {
  let i;
  let slides = document.getElementsByClassName("slide_" + X);
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slides[slideIndex-1].style.display = "block";
}