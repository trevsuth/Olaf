// client.js
window.addEventListener('DOMContentLoaded', (event) => {
  const fileList = document.getElementById('file-list');
  const fileContent = document.getElementById('sheet-music');
  const filenames = []; // Array to store filenames

  // Fetch the list of files from the server
  fetch('/files')
    .then((response) => response.json())
    .then((files) => {
      files.forEach((file) => {
        filenames.push(file); // Store the filenames in the array

        // Create the list items as before
        const listItem = document.createElement('li');
        listItem.textContent = file;
        listItem.addEventListener('click', () => {
          fetch(`/files/${file}`)
            .then((response) => response.json())
            .then((data) => {
              ABCJS.renderAbc("sheet-music", data.content);
            });
        });
        fileList.appendChild(listItem);
      });
    });

  // Add event listener for the "Pick Random" button
  const pickRandomButton = document.getElementById('pick-random');
  pickRandomButton.addEventListener('click', () => {
    if (filenames.length > 0) {
      const randomIndex = Math.floor(Math.random() * filenames.length);
      const randomFile = filenames[randomIndex];

      fetch(`/files/${randomFile}`)
        .then((response) => response.json())
        .then((data) => {
          ABCJS.renderAbc("sheet-music", data.content);
        });
    }
  });
});
