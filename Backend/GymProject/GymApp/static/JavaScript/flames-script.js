const flames_number = document.getElementById("flame_num");
const goals_checkboxes= document.querySelectorAll(".goal-checkbox");
let flames_count = 0;
function updateFlames() {
    
}


document.addEventListener("DOMContentLoaded", () => {





});



goals_checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
        if (checkbox.checked) {
            flames_count++;
            flames_number.textContent = flames_count
        }
    
    });

         
}); 







    
