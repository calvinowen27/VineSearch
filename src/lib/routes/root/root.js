// import { getVideoID } from '../../../app/app.js';

const uploadButton = document.getElementById('upload-button');
uploadButton.addEventListener('click', function(response) {
    window.location.href = '/upload';
});

const homeButton = document.getElementById('home-button');
homeButton.addEventListener('click', function(response) {
    window.location.href = '/';
});

const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
searchButton.addEventListener('click', function(response) {
    window.location.href = '/search?query=' + searchInput.value.split(' ').join('+');
    fetch('/search', {
        method: 'POST',
        body: JSON.stringify({text: searchInput.value}),
        headers: { "Content-Type": "application/json" }
    })
    .then(function(response) {
        if(!response.ok) {
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

window.onload = function() {
    fetch('/get-id', {
        method: 'GET'
    })
    .then(function(response) {
        if(!response.ok) {
            throw new Error('/get-id request failed.')
        }

        response.text().then((value) => {
            var url = 'https://www.youtube.com/embed/' + value;
            console.log(url);
            document.getElementById('root-video').setAttribute('src', url);
        });
    })
    .catch(function(err) {
        console.log(err);
    });
}