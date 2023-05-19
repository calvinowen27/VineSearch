const homeButton = document.getElementById('home-button');
homeButton.addEventListener('click', function(res) {
    window.location.href = '/';
});

window.onload = function() {
    fetch('/browse-get', {
        method: 'GET'
    })
    .then(function(res) {
        if(!res.ok) {
            throw new Error('/browse-get request failed.')
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