const homeButton = document.getElementById('home-button');
homeButton.addEventListener('click', function(res) {
    window.location.href = '/';
});

// all document elements related to upload
const submitButton = document.getElementById('submit-upload-button');
const uploadURL = document.getElementById('upload-url');
const uploadCreator = document.getElementById('upload-creator');
const uploadCaption = document.getElementById('upload-caption');
const uploadTranscript = document.getElementById('upload-transcript');

submitButton.addEventListener('click', function() {
    // get video id from url
    var videoID = uploadURL.value.split('watch?v=')[1];

    // uploadCreator.value = uploadCreator.value.toUpperCase();
    // uploadCaption.value = uploadCaption.value.toUpperCase();
    // uploadTranscript.value = uploadTranscript.value.toUpperCase();
    if(videoID == undefined) // check to make sure video id is valid
    {
        window.alert('Invalid Youtube URL.');
        return;
    }
    fetch('/submit-upload', {
        method: 'POST',
        body: JSON.stringify({ 
            videoID: videoID,
            creator: uploadCreator.value,
            caption: uploadCaption.value,
            transcript: uploadTranscript.value,
            keywords: uploadCreator.value.split(' ').concat(uploadCaption.value.split(' ').concat(uploadTranscript.value.split(' '))) // keywords are creator name, caption, and transcript
         }),
        headers: { "Content-Type": "application/json" }
    })
    .then(function(res) {
        if(res.status == 201) // bad youtube url check 2
        {
            window.alert('Invalid Youtube URL.');
            return
        }
        if(!res.ok) {
            throw new Error('/input request failed.')
        }
    })
    .catch(function(err) {
        console.log(err);
    });

    // redirect back to home page
    window.location.href = '/';
});