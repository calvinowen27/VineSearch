const uploadButton = document.getElementById('upload-button');
uploadButton.addEventListener('click', function(res) {
    window.location.href = '/upload';
});

const browseButton = document.getElementById('browse-button');
browseButton.addEventListener('click', function(res) {
    window.location.href = '/browse';
});

const homeButton = document.getElementById('home-button');
homeButton.addEventListener('click', function(res) {
    window.location.href = '/';
});

const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
searchButton.addEventListener('click', function(res) {
    window.location.href = '/search?query=' + searchInput.value.split(' ').join('+');
    fetch('/search', {
        method: 'POST',
        body: JSON.stringify({text: searchInput.value}),
        headers: { "Content-Type": "application/json" }
    })
    .then(function(res) {
        if(!res.ok) {
            throw new Error('/search request failed.')
        }
    })
    .catch(function(err) {
        console.log(err);
    });
});

searchInput.addEventListener('keyup', function(e) {
    if(e.key == 'Enter') {
        searchButton.click();
    }
});