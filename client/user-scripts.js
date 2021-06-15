/* *************************
*** USER SIGNUP ***
************************** */
function userSignUp() {
//  console.log('userSignUp Function Called')

let userEmail = document.getElementById("emailSignup").nodeValue;
let userPass = document.getElementById("pwdSignup").nodeValue;

let newUserData = {
    user: {
        email: userEmail,
        password: userPass
    }
};
console.log(`newUserData --> ${newUserData.user.email} ${newUserData.user.password}`);

fetch(`http://localhost:3000/user/register`, {  //we are fetching from the user create endpoint that we created in our server
    method: "POST",
    headers: {
        "Content-type": "application/json"
    },
    body: JSON.stringify(newUserData)
})
.then(response => response.json())
.then(data => {
    console.log(data);
    let token = data.sessionToken;
    localStorage.setItem('SessionToken', token);
    tokenChecker();
})
.catch(err => {
    console.log(err)
})

};
    
/* *************************
*** USER LOGIN ***
************************** */
function userLogin() {
 console.log('userLogin Function Called')
}
    
    
/* *************************
*** USER LOGOUT ***
************************** */
function userLogout() {
 console.log('userLogout Function Called')
}
    
    
/* *************************
 *** TOKEN CHECKER FUNCTION ***
************************** */
function tokenChecker() {
 console.log('tokenChecker Function Called')
}
tokenChecker()