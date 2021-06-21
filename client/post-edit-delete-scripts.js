/* *************************
 *** POST JOURNAL ***
************************** */
function postJournal() {
    const accessToken = localStorage.getItem('SessionToken')  //this var is to set up to store the SessionToken in local storage
    let title = document.getElementById('title').value;
    let date = document.getElementById('date').value;
    let entry = document.getElementById('entry').value;

    let newEntry = {  //this var stores the information for the body of the request
        journal: {
            title: title,
            date: date,
            entry: entry
        }
    }


fetch (`http://localhost:3000/journal/create`, {
    method: "POST",
    headers: new Headers ({
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`
    }),
    body: JSON.stringify(newEntry)
})
    .then(response => response.json())
    .then(data => {
        console.log(data);
        displayMine()
    })
    .catch(err => {
        console.error(err) //changes the way how it is displayed to us
    })
}
/* *************************
 *** UPDATE JOURNAL ***
************************** */
function editJournal(postId) {
 console.log('editJournal Function Called')
}
    
    
/* *************************
 *** DELETE JOURNAL ***
************************** */
function deleteJournal(postId) {
 console.log('deleteJournal Function Called')
}

