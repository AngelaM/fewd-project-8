/********
 * Search: Filter by employee name and display only cards which include user input
 ********/

function nameSearch() {
    let filter = (document.getElementById('search')).value.toUpperCase();
    let employeeCards= document.querySelectorAll(".directory-card");

    employeeCards.forEach(card => {
        let name = card.querySelector(".name").textContent.toUpperCase();
        card.style.display = name.includes(filter) ? "" : "none";
    });
}