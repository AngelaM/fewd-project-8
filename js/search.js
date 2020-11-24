/********
 * Search Function
 ********/

function nameSearch() {
    let userInput = document.getElementById('search');
    let filter = userInput.value.toUpperCase();
    let employeeCards= document.querySelectorAll(".directory-card");
    console.log({userInput, filter, employeeCards});

    for (let i=0; i< employeeCards.length; i++) {
        let name = employeeCards[i].querySelector(".name").textContent;
        if (name.toUpperCase().includes(filter)) {
            employeeCards[i].style.display = "";
        } else {
            employeeCards[i].style.display = "none";
        }
    }
}