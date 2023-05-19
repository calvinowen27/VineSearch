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

window.onload = function() {
    var url = location.protocol + '//' + location.host + location.pathname + '?query=';
    searchInput.value = location.href.split('?query=')[1].split('+').join(' ');

    fetch('/search-get', {
        method: 'GET'
    })
    .then(function(res) {
        if(!res.ok) {
            throw new Error('/search-get request failed.')
        }

        if(res.status == 200) {
            res.text().then((value) => {
                var docs = JSON.parse(value);
                Object.entries(docs).forEach(element => {
                    const [key, value] = element;
                    var videoHTML = `<div><iframe class="video-display" src="https://www.youtube.com/embed/${value.videoID}" allowfullscreen></iframe><h4>${value.caption}</h4><p>${value.creator}</p></div>`;
                    document.getElementById('video-container').innerHTML += videoHTML;
                });
            });
        }
    })
    .catch(function(err) {
        console.log(err);
    });
}

searchInput.addEventListener('keyup', function(e) {
    if(e.key == 'Enter') {
        searchButton.click();
    }
});