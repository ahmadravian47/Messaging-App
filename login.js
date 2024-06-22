document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();

    // Get values from form
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Prepare data to send to server
    const data = { email, password };

    // Send login request to server
    fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            console.log(data.status); // This will contain the login status or relevant information
            loginStatus(data.status);
        })
        .catch(error => {
            console.error('Error:', error);
        });
});


const loginStatus = (status) => {
    if (status == 1) {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        let loggedInUser = {
            email: email,
            password: password,
        };

        // Convert the user object to a string using JSON.stringify and store it in local storage
        localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
        //after login success make him to your desired page
        // Redirect to suggestion.html
        window.location.href = 'suggestion.html';

    }

    else if (status == 0) {
        alert("Invalid Password !!!");
    }

    else if (status == -1) {
        alert("User Doesn't Exist !!!");
    }
}