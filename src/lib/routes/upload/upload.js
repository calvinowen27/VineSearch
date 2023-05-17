const homeButton = document.getElementById('home-button');
homeButton.addEventListener('click', function(response) {
    window.location.href = '/';
});

const submitButton = document.getElementById('submit-upload-button');
const uploadURL = document.getElementById('upload-url');
const uploadCreator = document.getElementById('upload-creator');
const uploadCaption = document.getElementById('upload-caption');
const uploadTranscript = document.getElementById('upload-transcript');
submitButton.addEventListener('click', function(response) {
    fetch('/submit-upload', {
        method: 'POST',
        body: JSON.stringify({ 
            videoID: uploadURL.value.slice(-11),
            creator: uploadCreator.value,
            caption: uploadCaption.value,
            transcript: uploadTranscript.value
         }),
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

    window.location.href = '/';
});