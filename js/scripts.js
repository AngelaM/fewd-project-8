const directory = document.querySelector(".directory-container");
const API = 'https://randomuser.me/api/?results=12&nat=US&inc=name,location,email,dob,phone,picture&noinfo';
let employees=[];
let cardID = 0;

/********
 * Fetch Employee Data from API
 ********/

fetch(API)
    .then(results => results.json())
    .then(results => results.results)
    .then(results => createEmployees(results))
    .then(results => createContent(results))
    .catch(error => {
        console.log("There was a problem", error);
        fetch(API)  //try one more time
        .then(results => results.json())
        .then(results => results.results)
        .then(results => createEmployees(results))
        .then(results => createContent(results))
        .catch(error => {
            console.log("There was a problem", error);
            directory.innerHTML = "<h2>Problem loading employee data</h2>"
        })
    });

function createContent(results) {
    createCards();
    createModal();
}

/********
 * Create employee array
 ********/

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

/********
 * Create directory card for each employee and add to HTML
 ********/

function createCards() {
    directory.innerHTML = employees.reduce((html, employee, i) => { 
    html += `<div class="directory-card" id=${i}>
                <div class="card-image"><img class="round" src="${employee.picture}" alt="${employee.name}"></div>
                <div class="card-info">
                    <div class="name">${employee.name}</div>
                    <div class="email">${employee.email}g</div>
                    <div class="location">${employee.location}</div>
                </div>
            </div>`;
    return html;
    }, " ");
}

/********
 * Create modal and add listeners to open, close, and navigate through employees
 ********/

const modal = document.querySelector(".modal");
const modalX = document.querySelector(".modal-x");
const modalBox = document.querySelector(".modal-content");

function createModal() {
    //Create listener to open modal box and call function to create modal
    directory.addEventListener("click", (e) => {
        if (e.target !== directory) {
            cardID = parseInt(e.target.closest(".directory-card").getAttribute('id'));
            createModalContent(cardID);
            modal.style.display = "block";
        }
    })

    //Create listeners for navigation arrows on modal box
    let next = document.querySelector(".next-employee i");
    next.addEventListener("click", (e) => {
        cardID = cardID === 11 ? 0 : cardID+1;
        createModalContent(cardID);
    })

    let last = document.querySelector(".last-employee i");
    last.addEventListener("click", (e) => {
        cardID = cardID === 0 ? 11 : cardID-1;
        createModalContent(cardID);
    })

    //Createlisteners to close modal box
    //When the x is clicked
    modalX.onclick = function() {
        modal.style.display = "none";
    }
    // When the user clicks anywhere outside of the modal box
    window.onclick = function(event) {
        if (event.target == modal) {
        modal.style.display = "none";
        }
    }
}

//Create content for modal's employee information and add to HTML
function createModalContent(index) {
    let {picture, name, email, location, phone, address, birthday} = employees[index];
    let html = `<div class="modal-image" id="${index}"><img class="round" src="${picture}" alt="${name}"></div>
                <div class="modal-info">
                    <div class="name">${name}</div>
                    <div class="email">${email}</div>
                    <div class="location">${location}</div>
                </div>
                <div class="modal-contact">
                    <div class="phone">${phone}</div>
                    <div class="address">${address}</div>
                    <div class="birthday">Birthday: ${birthday}</div>
                </div>`
    modalBox.innerHTML = html;
}