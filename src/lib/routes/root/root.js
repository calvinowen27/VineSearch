//console.log('Client-side code running');

// const searchInput = document.getElementById('search-input');
// searchInput.addEventListener('input', function(response) {
//     //var text = searchInput.value;
//     //console.log(text);
//     fetch('/input', {
//         method: 'POST',
//         body: JSON.stringify({text: searchInput.value}),
//         headers: { "Content-Type": "application/json" }
//     })
//     .then(function(response) {
//         if(!response.ok) {
//             throw new Error('/input request failed.')
//         }
//     })
//     .catch(function(err) {
//         console.log(err);
//     });
// });

const uploadButton = document.getElementById('upload-button');
uploadButton.addEventListener('click', function(response) {
    window.location = '/upload';
});

const homeButton = document.getElementById('home-button');
homeButton.addEventListener('click', function(response) {
    window.location = '/';
});

const searchInput = document.getElementById('search-input');
const searchForm = document.getElementById('search-form');
searchForm.addEventListener('submit', function(response) {
    fetch('/search', {
        method: 'POST',
        body: JSON.stringify({text: searchInput.value}),
        headers: { "Content-Type": "application/json" }
    })
    .then(function(response) {
        if(!response.ok) {
            throw new Error('/input request failed.')
        }
    })
    .catch(function(err) {
        console.log(err);
    });
});