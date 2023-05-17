export function printSearchText(text) {
    const searchEcho = document.getElementById('search-echo');
    searchEcho.innerHTML = 'Search: ' + text;
}

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

        console.log('bruh');
        console.log(response.getHeader('testing'));
        document.getElementById('search-echo').innerHTML = 'Search: ' + response.body.text;
    })
    .catch(function(err) {
        console.log(err);
    });
});

