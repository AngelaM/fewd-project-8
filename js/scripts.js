const modal = document.querySelector(".modal");
const x = document.querySelector(".modal-x");
const directory = document.querySelector(".directory-container");
const modalBox = document.querySelector(".modal-content");

const API = 'https://randomuser.me/api/?results=12&nat=US&inc=name,location,email,dob,phone,picture&noinfo';
let employees=[];
let cardID = 0;

/********
 * Fetch random employee data and create employee object
 ********/

fetch(API)
    .then(results => results.json())
    .then(results => results.results)
    .then(results => createEmployees(results))
    .then(results => createContent())
    .catch(error => {
        fetch(API)  //try one more time
        .then(results => results.json())
        .then(results => results.results)
        .then(results => createEmployees(results))
        .then(results => createContent())
        .catch(error => console.log("There was a problem", error))
    });

function createContent() {
    createCards();
    createModal();
}

//Create array of formatted employee objects
function createEmployees(employeeData) {
    employeeData.forEach(employee => {
        let {name, email, location, phone, dob, picture} = employee;
        let e = {};
        e.name = `${name.first} ${name.last}`;
        e.email = email;
        e.location = location.city;
        let state = getStateCode(location.state);
        e.address = `${location.street.number} ${location.street.name} ${location.city}, ${state} ${location.postcode}`;
        e.phone = (phone).replace('-', ' ');
        let date = new Date(dob.date);
        e.birthday = `${('0' + (date.getMonth()+1)).slice(-2)}/${('0' + date.getDate()).slice(-2)}/${date.getYear()}`;
        e.picture = picture.medium;
        employees.push(e);
    });
}

//Create employee cards and place in HTML

function createCards() {
    let html = "";
    for (let i=0; i<employees.length; i++) {
        html += 
            `<div class="directory-card" id=${i}>
                <div class="card-image"><img src="${employees[i].picture}" alt="${employees[i].name}"></div>
                <div class="card-info">
                    <div class="name">${employees[i].name}</div>
                    <div class="email">${employees[i].email}g</div>
                    <div class="location">${employees[i].location}</div>
                </div>
            </div>`;
    }
    directory.innerHTML = html;
}

//Create event listeners for modal
function createModal() {
    //Create listener to open modal box
    directory.addEventListener("click", (e) => {
        if (e.target !== directory) {
            cardID = parseInt(e.target.closest(".directory-card").getAttribute('id'));
            createModalContent(cardID);
            modal.style.display = "block";
        }
    })

    //Create listeners for navigation arrows on modal box
    let next = document.querySelector(".next-employee i");
    let last = document.querySelector(".last-employee i");

    next.addEventListener("click", (e) => {
        console.log(cardID);
        if(cardID === 11) {
            cardID = 0;
        } else {
            cardID = cardID+1;
        }
        createModalContent(cardID);
    })

    last.addEventListener("click", (e) => {
        console.log(cardID);
        if(cardID === 0) {
            cardID = 11;
        } else {
            cardID = cardID-1;
        }
        createModalContent(cardID);
    })

    //Createlisteners to close modal box
    //When the x is clicked
    x.onclick = function() {
        modal.style.display = "none";
    }
    // When the user clicks anywhere outside of the modal box
    window.onclick = function(event) {
        if (event.target == modal) {
        modal.style.display = "none";
        }
    }
}

//Create HTML content for a card's employee information
function createModalContent(index) {
    let {picture, name, email, location, phone, address, birthday} = employees[index];
    let html = `<div class="modal-image" id="${index}"><img src="${picture}" alt="${name}"></div>
                <div class="modal-basic-info">
                    <div class="name">${name}</div>
                    <div class="email">${email}</div>
                    <div class="location">${location}</div>
                </div>
                    <div class="modal-contact-info">
                    <div class="phone">${phone}</div>
                    <div class="address">${address}</div>
                    <div class="birthday">Birthday: ${birthday}</div>
                </div>`
    modalBox.innerHTML = html;
}


/********
 * Helper Function to Convert State Name to Code
 ********/

getStateCode = function (stateName) {
    let returnState = this.stateList[stateName]
    if (returnState) return returnState;
    return stateName;
}
    stateList = {
    'Arizona': 'AZ',
    'Alabama': 'AL',
    'Alaska':'AK',
    'Arkansas': 'AR',
    'California': 'CA',
    'Colorado': 'CO',
    'Connecticut': 'CT',
    'Delaware': 'DE',
    'Florida': 'FL',
    'Georgia': 'GA',
    'Hawaii': 'HI',
    'Idaho': 'ID',
    'Illinois': 'IL',
    'Indiana': 'IN',
    'Iowa': 'IA',
    'Kansas': 'KS',
    'Kentucky': 'KY',
    'Louisiana': 'LA',
    'Maine': 'ME',
    'Maryland': 'MD',
    'Massachusetts': 'MA',
    'Michigan': 'MI',
    'Minnesota': 'MN',
    'Mississippi': 'MS',
    'Missouri': 'MO',
    'Montana': 'MT',
    'Nebraska': 'NE',
    'Nevada': 'NV',
    'New Hampshire': 'NH',
    'New Jersey': 'NJ',
    'New Mexico': 'NM',
    'New York': 'NY',
    'North Carolina': 'NC',
    'North Dakota': 'ND',
    'Ohio': 'OH',
    'Oklahoma': 'OK',
    'Oregon': 'OR',
    'Pennsylvania': 'PA',
    'Rhode Island': 'RI',
    'South Carolina': 'SC',
    'South Dakota': 'SD',
    'Tennessee': 'TN',
    'Texas': 'TX',
    'Utah': 'UT',
    'Vermont': 'VT',
    'Virginia': 'VA',
    'Washington': 'WA',
    'West Virginia': 'WV',
    'Wisconsin': 'WI',
    'Wyoming': 'WY'}