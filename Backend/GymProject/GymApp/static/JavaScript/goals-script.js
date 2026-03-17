document.addEventListener('DOMContentLoaded', () => {
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

    let flames_count = 0;

    const flames_number = document.getElementById("flame_num");

    const durations = {

        "year": 1,
        "month": 2,
        "day": 3,
        "week": 4,
    }
    const types = {

        "learning": 1,
        "mindfulness": 2,
        "nutrition": 3,
        "fitness": 4,
    }

    //zkopiruju do script blocku v html 
    const types2 = {

        1: "learning",
        2: "mindfulness",
        3: "nutrition",
        4: "fitness",
    }

    const durations2 = {

        1: "year",
        2: "month",
        3: "day",
        4: "week",
    }

    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== "") {
            const cookies = document.cookie.split(";");
            for (let cookie of cookies) {
                cookie = cookie.trim();
                if (cookie.startsWith(name + "=")) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                }
            }
        }
        return cookieValue;
    }

    const csrftoken = getCookie("csrftoken");

    //initial rendering
    document.addEventListener('DOMContentLoaded', () => {

    });

    loadFromDatabase();


    function updateGoalStatusInDatabase(id, isCompleted) {
        fetch("/update_goal_status/", { // Cestu si uprav podle svého URL v Djangu
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": csrftoken
            },
            body: JSON.stringify({
                "id": id,
                "is_finished": isCompleted
            })
        }).then(response => {
            if (!response.ok) {
                console.error("Chyba při ukládání stavu do databáze.");
            }
        });
    }


    function loadFromDatabase() {
        console.log("První prvek z DB:", goals[0]);

        goals.forEach(element => {
            const frequencyText = durations2[element.duration_id];
            const typeText = types2[element.type_id];


            const goal = {

                id: element.id,
                text: element.name,
                type: typeText,
                frequency: frequencyText,
                completed: element.is_finished
            };

            choose(frequencyText).push(goal);
            goalsList_all_array.push(goal);

        });

        renderGoals();


    }













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




        const goal2 = {
            "name": goal.text,
            "duration_id": durations[goal.frequency],
            "type_id": types[goal.type],
            "completed": goal.completed
        }
        console.log(goal2)
        fetch("/add_goal/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": csrftoken
            },
            body: JSON.stringify(goal2)
        });

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


    function deleteGoal(id) {
        console.log(id);
        //problem ze nahravam id az z databaze predtim to ma daten now id ktere nepatri do databaze
        goalsList_all_array = goalsList_all_array.filter(g => g.id !== id);
        goalsList_day_array = goalsList_day_array.filter(g => g.id !== id);
        goalsList_week_array = goalsList_week_array.filter(g => g.id !== id);
        goalsList_month_array = goalsList_month_array.filter(g => g.id !== id);
        goalsList_year_array = goalsList_year_array.filter(g => g.id !== id);


        fetch("/remove_goal/", {
            method: "POST",
            headers:
            {
                "Content-Type": "application/json",
                "X-CSRFToken": csrftoken
            },
            body: JSON.stringify({ "id": id })
        }).then(response => {

            if (!response.ok) {
                console.error("Chyba při mazání na serveru.");
            }

        });

        renderGoals();
    }















    //AI generated method
    function createGoalUI(goal) {
        /*
                const goal2 = {
                    "name": goal.text,
                    "duration_id": durations[goal.frequency],
                    "type_id": types[goal.type],
                    "completed": goal.completed
                }
                console.log(goal2)
                fetch("/add_goal/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "X-CSRFToken": csrftoken
                    },
                    body: JSON.stringify(goal2)
                });
        */

        const goalDiv = document.createElement('div');
        // Přidáme id, abychom mohli snadno mazat konkrétní element z DOMu (volitelné, ale dobré pro animace)
        goalDiv.setAttribute('data-id', goal.id);
        goalDiv.className = `goal-item ${goal.completed ? 'completed' : ''}`;

        const flames = getFlames(goal.frequency);

        // ZMĚNA: Rozdělíme obsah na LEVOU a PRAVOU část
        goalDiv.innerHTML = `
    
        <div class="goal-left">
            <input type="checkbox" class="goal-checkbox" ${goal.completed ? 'checked disabled' : ''}>
            <div class="goal-text">
                <strong>${goal.text}</strong> 
                <small class="goal-type-label">${goal.type}</small>
            </div>
        </div>
        
        <div class="goal-right">
            <div class="goal-flames">
            <p class="p-Info-bonus">Bonus:</p>
            ${flames}</div>

            <button class="goal-delete">Smazat</button>
        </div>
        
    `;

        // PŘIPOJENÍ POSLUCHAČŮ UDÁLOSTÍ
        // 1. Checkbox - změna stavu
        const checkbox = goalDiv.querySelector('.goal-checkbox');
        checkbox.addEventListener('change', () => {
            let countFlame = 0;


            toggleGoal(goal.id);
            if (goal.frequency === "day") {
                flames_count++;
                countFlame++;

            } else if (goal.frequency === "week") {
                flames_count += 2;
                countFlame += 2;
            } else if (goal.frequency === "month") {
                flames_count += 3;
                countFlame += 3;
            } else if (goal.frequency === "year") {
                flames_count += 5;
                countFlame += 5;
            }

            fetch("/add_flame/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRFToken": csrftoken
                },
                body: JSON.stringify({
                    count: countFlame
                })
            });
            updateGoalStatusInDatabase(goal.id,true)

            flames_number.textContent = countFlame + parseInt(flames_number.textContent);

        });

        // 2. Tlačítko smazat
        const deleteBtn = goalDiv.querySelector('.goal-delete');
        deleteBtn.addEventListener('click', () => {
            deleteGoal(goal.id);
        });


        //PRIDANI location.reload(); ZNICI DATABAZI
        return goalDiv;

    }

    function toggleGoal(id) {
        const goal = goalsList_all_array.find(g => g.id === id);
        if (goal) {
            goal.completed = !goal.completed; // Prohodí true/false
            renderGoals(); // Překreslí (kvůli přeškrtnutí a statistikám)
        }
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














});