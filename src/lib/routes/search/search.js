const homeButton = document.getElementById('home-button');
homeButton.addEventListener('click', function() {
    window.location.href = '/'; // redirect to home page
});

// manage search bar
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
searchButton.addEventListener('click', function(response) {
    window.location.href = '/search?query=' + searchInput.value.split(' ').join('+'); // build url with search query and redirect
});

window.onload = function() {
    searchInput.value = location.href.split('?query=')[1].split('+').join(' '); // parse search query from url

    fetch('/search-get', {
        method: 'GET'
    })
    .then(function(res) {
        if(!res.ok) {
            throw new Error('/search-get request failed.')
        }

        if(res.status == 200) {
            res.text().then((value) => {
                var docs = JSON.parse(value); // docs that are returned from database search call
                Object.entries(docs).forEach(element => {
                    const [key, value] = element;

                    // create and insert and iframe to display the youtube video on the page
                    // do so for each document returned by the search
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

// so you don't have to click go, can just press Enter
searchInput.addEventListener('keyup', function(e) {
    if(e.key == 'Enter') {
        searchButton.click();
    }
});