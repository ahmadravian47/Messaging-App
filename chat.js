function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    return results ? decodeURIComponent(results[2].replace(/\+/g, ' ')) : null;
}

// Get the data from the URL
let receiver_id = getParameterByName('receiver_id');

let sender_email;

let la = localStorage.getItem('loggedInUser');
const jsonObject = JSON.parse(la);
sender_email = jsonObject.email; // Corrected assignment

const data = { email: jsonObject.email, id: receiver_id }; // Corrected object construction
console.log(data);

/*------------------fetching messages after 0.5 s----------------------------*/
let old_messages = [];
let i = 0;

setInterval(() => {


    fetch('http://localhost:3000/getmessage', {
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
            old_messages = data;
            console.log(old_messages)
            /*----------------now display these old messages--------------*/
            let old_message_div = document.querySelector('.upper');
            let size = old_messages.length;
            // Inside the loop where you create and append message elements
            for (i; i < size; i++) {
                let message_div = document.createElement('div');

                let sender_name_h4 = document.createElement('h4');
                sender_name_h4.innerText = old_messages[i].sender;
                message_div.appendChild(sender_name_h4);

                let message_p = document.createElement('p');
                message_p.innerText = old_messages[i].content;
                message_div.appendChild(message_p);

                // Append the message at the beginning of the .upper div
                old_message_div.appendChild(message_div);
            }

        })
}, 500);

let message_sending_button = document.querySelector('.send_message');

message_sending_button.addEventListener('click', function () {
    // Move the message variable inside the event listener
    let message = document.querySelector('.message').value;
    document.querySelector('.message').value = '';

    // Assuming jsonObject and receiver_id are defined somewhere in your code
    const data2 = { email: jsonObject.email, id: receiver_id, message: message };
    console.log(data2);
    fetch('http://localhost:3000/sendmessage', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data2)
    }).then(response => {
        return response.json();
    })
        .then(data2 => {
            console.log(data2);
        })
});


