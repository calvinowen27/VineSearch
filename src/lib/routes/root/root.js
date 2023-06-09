const uploadButton = document.getElementById('upload-button');
uploadButton.addEventListener('click', function(res) {
    window.location.href = '/upload'; // triggers app.get('/upload')
});

const browseButton = document.getElementById('browse-button');
browseButton.addEventListener('click', function(res) {
    window.location.href = '/browse'; // triggers app.get('/browse')
});

const homeButton = document.getElementById('home-button');
homeButton.addEventListener('click', function(res) {
    window.location.href = '/'; // triggers app.get('/')    root
});

// handles search bar (text input + button)
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
searchButton.addEventListener('click', function(res) {
    window.location.href = '/search?query=' + searchInput.value.split(' ').join('+'); // build url with search query and redirect
});

searchInput.addEventListener('keyup', function(e) {
    if(e.key == 'Enter') {
        searchButton.click();
    }
});