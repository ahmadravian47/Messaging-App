
document.addEventListener('DOMContentLoaded', function () {
    let fadeUpElements = document.querySelectorAll('.fade-up');

    fadeUpElements.forEach(function (element) {
        let observer = new IntersectionObserver(function (entries, observer) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    element.style.opacity = 1;
                    element.style.transform = 'translateY(0)';
                    observer.unobserve(element);
                }
            });
        }, { threshold: 1 });

        observer.observe(element);
    });
});




document.addEventListener('DOMContentLoaded', function () {
    let fadeLeftElements = document.querySelectorAll('.fade-left');

    fadeLeftElements.forEach(function (element) {
        let observer = new IntersectionObserver(function (entries, observer) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    element.style.opacity = 1;
                    element.style.transform = 'translateX(0)';
                    observer.unobserve(element);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(element);
    });
});


document.addEventListener('DOMContentLoaded', function () {
    let fadeRightElements = document.querySelectorAll('.fade-right');

    fadeRightElements.forEach(function (element) {
        let observer = new IntersectionObserver(function (entries, observer) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    element.style.opacity = 1;
                    element.style.transform = 'translateX(0)';
                    observer.unobserve(element);
                }
            });
        }, { threshold: 0.2 });

        observer.observe(element);
    });
});

//-------------------------------fetching all users data-----------------------------------//
let all_users = [];
let la = localStorage.getItem('loggedInUser');
const jsonObject = JSON.parse(la);
const data = { email: jsonObject.email }; // Wrap the email in an object
console.log(data)

fetch('http://localhost:3000/getrequest', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
})
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        all_users = data;
        console.log(all_users);
        let total_users = all_users.length;

        let suggestion_section = document.querySelector('.suggestion-section');
        console.log(suggestion_section);

        let suggestions = document.querySelector('.suggestions');
        console.log(suggestions);
        for (let i = 0; i < total_users; i++) {
            let suggestion = document.createElement('div');
            suggestion.className = 'suggestion suggestion' + i;
            suggestion.id = all_users[i].UserID;

            let div_left = document.createElement('div');
            div_left.style.display = 'flex';
            div_left.style.alignItems = 'center';
            //-------------left div---------------------------//
            let user_image = document.createElement('img');
            user_image.src = './user1' + '.png';
            div_left.appendChild(user_image);

            let user_name = document.createElement('h2');
            user_name.innerText = all_users[i].Username;
            div_left.appendChild(user_name);

            suggestion.appendChild(div_left);
            //-------------------------------------------------//

            let div_right = document.createElement('div');
            //----------------right div------------------------//
            let user_button = document.createElement('a');
            user_button.id = all_users[i].SenderID;
            user_button.className = 'send_connect'+i;
            user_button.innerText = 'Accept';
            div_right.appendChild(user_button);
            suggestion.appendChild(div_right)

            suggestions.appendChild(suggestion);


            //-------------------adding event listener n connect
            let connect_button = document.querySelector('.send_connect' + i);
            connect_button.addEventListener('click', function () {
                let receiver_email, sender_id;
                sender_id = connect_button.id;
            
                let la = localStorage.getItem('loggedInUser');
                const jsonObject = JSON.parse(la);
                receiver_email = jsonObject.email; // Corrected assignment
            
                const data = { receiver_email: receiver_email, sender_id: sender_id }; // Corrected object construction
                console.log('sending data',data);
            
                // Sending request details to the server
                fetch('http://localhost:3000/acceptrequest', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log(data.status); // This will contain the login status or relevant information
                        if(data.status==1)
                        {
                            connect_button.innerText='Accepted';
                            connect_button.style.border='1px solid #4CAF50';
                            connect_button.style.background='#101820'
                            connect_button.style.color='#4CAF50';
                        }
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
    
            })
        }


       

    })
    .catch(error => {
        console.error('There was a problem fetching the data:', error);
    });

