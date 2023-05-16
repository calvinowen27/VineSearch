//console.log('Client-side code running');

const searchInput = document.getElementById('search-input');
searchInput.addEventListener('input', function(response) {
    fetch('/input', {
        method: 'POST',
        body: JSON.stringify({text: searchInput.value}),
        headers: { "Content-Type": "application/json" }
    })
    .then(function(response) {
        if(response.ok) {
        console.log('/input request success.');
        return;
        }
        throw new Error('/input request failed.')})
    .catch(function(err) {
        console.log(err);
    });
});

const uploadButton = document.getElementById('upload-button');
uploadButton.addEventListener('click', function(response) {
    window.location = '/upload';
    // fetch('/upload',  {
    //     method: 'POST'
    // })
    // .then(function(response) {
    //     if(response.ok) {
    //         console.log('/upload request success.');
    //         return;
    //     }
    //     throw new Error('/upload request failed');
    // })
    // .catch(function(err) {
    //     console.log(err);
    // });
});