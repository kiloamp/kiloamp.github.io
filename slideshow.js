window.addEventListener("DOMContentLoaded", function () {
  const track = document.querySelector(".story-strip");

  if (!track) {
    return;
  }

  let isDragging = false;
  let moved = false;
  let startX = 0;
  let startScrollLeft = 0;

  track.addEventListener("pointerdown", function (event) {
    if (event.pointerType !== "mouse") {
      return;
    }

    isDragging = true;
    moved = false;
    startX = event.clientX;
    startScrollLeft = track.scrollLeft;
    track.classList.add("is-dragging");
    track.setPointerCapture(event.pointerId);
  });

  track.addEventListener("pointermove", function (event) {
    if (!isDragging) {
      return;
    }

    const deltaX = event.clientX - startX;

    if (Math.abs(deltaX) > 3) {
      moved = true;
    }

    track.scrollLeft = startScrollLeft - deltaX;

    if (moved) {
      event.preventDefault();
    }
  });

  function stopDragging(event) {
    if (!isDragging) {
      return;
    }

    isDragging = false;
    track.classList.remove("is-dragging");

    if (track.hasPointerCapture(event.pointerId)) {
      track.releasePointerCapture(event.pointerId);
    }
  }

  track.addEventListener("pointerup", stopDragging);
  track.addEventListener("pointercancel", stopDragging);
  track.addEventListener("pointerleave", stopDragging);
  track.addEventListener("dragstart", function (event) {
    event.preventDefault();
  });

  const lazyVideos = Array.from(document.querySelectorAll(".lazy-video"));

  function loadVideo(video) {
    if (video.src || !video.dataset.src) {
      return;
    }

    video.src = video.dataset.src;
    video.load();
  }

  function playVideo(video) {
    loadVideo(video);
    video.play().catch(function () {});
  }

  if ("IntersectionObserver" in window) {
    const videoObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          const video = entry.target;

          if (entry.isIntersecting) {
            playVideo(video);
          } else {
            video.pause();
          }
        });
      },
      {
        root: track,
        rootMargin: "0px 640px",
        threshold: 0.05
      }
    );

    lazyVideos.forEach(function (video) {
      videoObserver.observe(video);
    });
  } else {
    lazyVideos.forEach(playVideo);
  }

  track.addEventListener(
    "click",
    function (event) {
      if (!moved) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();
      moved = false;
    },
    true
  );

});
