import { videoTitlesData } from "./data.js";

document.addEventListener("DOMContentLoaded", function () {
  const videoTitles = videoTitlesData;
  const videoList = document.getElementById("videoList");

  function createCheckbox(title, index) {
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = `video${index + 1}`;
    checkbox.checked =
      localStorage.getItem(`flutterVideo${index + 1}`) === "true";

    checkbox.addEventListener("change", function () {
      localStorage.setItem(`flutterVideo${index + 1}`, checkbox.checked);
    });

    const label = document.createElement("label");
    label.htmlFor = `video${index + 1}`;
    label.textContent = `Video ${index + 1}: ${title}`;

    const listItem = document.createElement("div");
    listItem.appendChild(checkbox);
    listItem.appendChild(label);

    return listItem;
  }

  function checkVideos(start, end) {
    // Uncheck videos from previous range
    for (let i = 1; i <= videoTitles.length; i++) {
      const checkbox = document.getElementById(`video${i}`);
      if (checkbox) {
        checkbox.checked = false;
        localStorage.setItem(`video${i}`, false);
      }
    }

    // Check videos in the new range
    for (let i = start; i <= end; i++) {
      const checkbox = document.getElementById(`video${i}`);
      if (checkbox) {
        checkbox.checked = true;
        localStorage.setItem(`video${i}`, true);
      }
    }
  }

  function clearLocalStorage() {
    localStorage.clear();
    // Uncheck all checkboxes
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => (checkbox.checked = false));
  }

  // Populate video titles
  videoTitles.forEach((title, index) => {
    videoList.appendChild(createCheckbox(title, index));
  });

  // Attach click event to the clearLocalStorageBtn button
  const clearLocalStorageBtn = document.getElementById("clearLocalStorageBtn");
  if (clearLocalStorageBtn) {
    clearLocalStorageBtn.addEventListener("click", clearLocalStorage);
  }

  // Attach click event to the checkVideosBtn button
  const checkVideosBtn = document.getElementById("checkVideosBtn");
  if (checkVideosBtn) {
    checkVideosBtn.addEventListener("click", function () {
      const start = parseInt(document.getElementById("videoRangeStart").value);
      const end = parseInt(document.getElementById("videoRangeEnd").value);
      checkVideos(start, end);
    });
  }
});
