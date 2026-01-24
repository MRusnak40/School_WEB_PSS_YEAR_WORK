const goalInput = document.getElementById('goalInput');
const typeGoalSelect = document.getElementById('typeGoal');
const frequencyGoalSelect = document.getElementById('frequencyGoal');
const addGoalBtn = document.getElementById('addGoalBtn');

const goalsList_day = document.getElementById('goalsList-day');
const goalsList_week = document.getElementById('goalsList-week');
const goalsList_month = document.getElementById('goalsList-month');
const goalsList_year = document.getElementById('goalsList-year');

let goalsList_day_array = [];
let goalsList_week_array = [];
let goalsList_month_array = [];
let goalsList_year_array = [];
let goalsList_all_array = [];

const totalGoals = document.getElementById('totalGoals');
const completedGoals = document.getElementById('completedGoals');
const progressPercent = document.getElementById('progressPercent');


function addGoal() {
    const inputUser = goalInput.value.trim();
    const type = typeGoalSelect.value;
    const frequency = frequencyGoalSelect.value;

    if (inputUser === "" || type === "" || frequency === "") {
        alert("PLEASE CHOOSE type and frequency and name of goal!");
        return;
    }

    //debugging 
    //delete later
    console.log("Adding goal:", inputUser, type, frequency);


    const goal = {
        id: Date.now(),
        text: inputUser,
        type: type,
        frequency: frequency,
        completed: false
    };





    choose(frequency).push(goal);
    goalInput.value = "";
    goalsList_all_array.push(goal);



    renderGoals();


}




function renderGoals() {
    renderGoalsClearList();

    //day goals
    if (goalsList_day_array.length === 0) {
        document.getElementById('group-day').classList.add('hidden');
    } else {
        document.getElementById('group-day').classList.remove('hidden');
        goalsList_day_array.forEach(goal => {
            const goalUI = createGoalUI(goal);
            goalsList_day.appendChild(goalUI);
        });
    }

    //week goals
    if (goalsList_week_array.length === 0) {
        document.getElementById('group-week').classList.add('hidden');
    } else {
        document.getElementById('group-week').classList.remove('hidden');
        goalsList_week_array.forEach(goal => {
            const goalUI = createGoalUI(goal);
            goalsList_week.appendChild(goalUI);
        });
    }

    //month goals
    if (goalsList_month_array.length === 0) {
        document.getElementById('group-month').classList.add('hidden');
    } else {
        document.getElementById('group-month').classList.remove('hidden');

        goalsList_month_array.forEach(goal => {
            const goalUI = createGoalUI(goal);
            goalsList_month.appendChild(goalUI);
        });
    }

    //year goals
    if (goalsList_year_array.length === 0) {
        document.getElementById('group-year').classList.add('hidden');
    } else {
        document.getElementById('group-year').classList.remove('hidden');
        goalsList_year_array.forEach(goal => {
            const goalUI = createGoalUI(goal);
            goalsList_year.appendChild(goalUI);
        });
    }
    updateStats();
}

//clears the goals div in html
function renderGoalsClearList() {
    goalsList_day.innerHTML = "";
    goalsList_week.innerHTML = "";
    goalsList_month.innerHTML = "";
    goalsList_year.innerHTML = "";
}




//AI generated method
function createGoalUI(goal) {
    //kontejner
    const goalDiv = document.createElement('div');
    goalDiv.className = `goal-item ${goal.completed ? 'completed' : ''}`;

    //flames based on frequency
    const flames = getFlames(goal.frequency);

    // 3. Poskládáme obsah
    //class .goal-text  .goal-delete 
    goalDiv.innerHTML = `
        <input type="checkbox" class="goal-checkbox" ${goal.completed ? 'checked' : ''}>
        <div class="goal-text">
            <strong>${goal.text}</strong> 
            <small style="color: var(--accent-green); margin-left: 10px;">${goal.type}</small>
        </div>
        <div class="goal-flames">${flames}</div>
        <button class="goal-delete">Smazat</button>
    `;

    return goalDiv;
}

//updates the stats section AI generated method
function updateStats() {
    const total = goalsList_all_array.length;
    const completed = goalsList_all_array.filter(g => g.completed).length;
    const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

    totalGoals.textContent = total;
    completedGoals.textContent = completed;
    progressPercent.textContent = percent + "%";
}








function choose(freq) {


    switch (freq) {
        case "day":
            return goalsList_day_array;
        case "week":
            return goalsList_week_array;
        case "month":
            return goalsList_month_array;
        case "year":
            return goalsList_year_array;
    }
}


function getFlames(freq) {
    if (freq === "day") return "🔥";
    if (freq === "week") return "🔥🔥";
    if (freq === "month") return "🔥🔥🔥";
    if (freq === "year") return "🔥🔥🔥🔥🔥";
    return "";
}
addGoalBtn.addEventListener('click', addGoal);



