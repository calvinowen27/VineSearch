const homeButton = document.getElementById('home-button');
homeButton.addEventListener('click', function(res) {
    window.location.href = '/';
});

// window.onload = function() {
//     fetch('/browse-get', {
//         method: 'GET'
//     })
//     .then(function(res) {
//         if(!res.ok) {
//             throw new Error('/browse-get request failed.')
//         }

//         if(res.status == 200) {
//             res.text().then((value) => {
//                 var docs = JSON.parse(value);
//                 setPageNavigation(docs[docs.length-1].numDocs);
//                 Object.entries(docs).forEach(element => {
//                     const [key, value] = element;
//                     var videoHTML = `<div><iframe id="browse-video" src="https://www.youtube.com/embed/${value.videoID}" allowfullscreen></iframe><h4>${value.caption}</h4><p>${value.creator}</p></div>`;
//                     document.getElementById('video-container').innerHTML += videoHTML;
//                 });
//             });
//         }
//     })
//     .catch(function(err) {
//         console.log(err);
//     });
// }

function testing() {
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
                setPageNavigation(docs[docs.length-1].numDocs);
                Object.entries(docs).forEach(element => {
                    const [key, value] = element;
                    var videoHTML = `<div><iframe id="browse-video" src="https://www.youtube.com/embed/${value.videoID}" allowfullscreen></iframe><h4>${value.caption}</h4><p>${value.creator}</p></div>`;
                    document.getElementById('video-container').innerHTML += videoHTML;
                });
            });
        }
    })
    .catch(function(err) {
        console.log(err);
    });
}

window.addEventListener('load', testing());

//window.addEventListener('bruh', donav);

function setPageNavigation(numDocs) {
    console.log('page nav ' + numDocs);
    const pageNav = document.getElementById('page-navigation');
    const pageNavScript = document.getElementById('page-nav-script');
    console.log(numDocs);
    for (let i = 1; i <= numDocs; i++) {
        pageNav.innerHTML += `<button class="button page-button" id="page-button${i}">${i}</button>`;
        //pageNavScript.innerHTML = pageNavScript.innerHTML.slice(0, -1) + `var button${i} = document.getElementById("page-button${i}"); button${i}.onclick = function() {window.location.href = '/browse?page=${i}'; console.log('clicked ${i}');} ` + pageNavScript.innerHTML.slice(-1);
        pageNavScript.innerHTML = pageNavScript.innerHTML.slice(0, -1) + `var button${i} = document.getElementById("page-button${i}"); button${i}.addEventListener('click', function() {window.location.href = '/browse?page=${i}'; console.log('clicked ${i}');}); ` + pageNavScript.innerHTML.slice(-1);
    }

    document.dispatchEvent(new Event('bruh'));
}

function changePage(page) {

}