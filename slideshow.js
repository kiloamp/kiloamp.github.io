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

  track.addEventListener(
    "wheel",
    function (event) {
      if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) {
        return;
      }

      track.scrollLeft += event.deltaY;
      event.preventDefault();
    },
    { passive: false }
  );
});
