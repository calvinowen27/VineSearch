export function printSearchText(text) {
    const searchEcho = document.getElementById('search-echo');
    searchEcho.innerHTML = 'Search: ' + text;
}

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
    console.log(location.href);
    var url = location.protocol + '//' + location.host + location.pathname + '?query=';
    searchInput.value = location.href.slice(url.length).split('+').join(' ');
}