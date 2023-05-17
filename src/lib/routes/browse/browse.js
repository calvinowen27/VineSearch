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
                console.log(value);
            });
        }
    })
    .catch(function(err) {
        console.log(err);
    });
}