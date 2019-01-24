function verifyLocalStorage() {
    localStorage.setItem('isEnabled', 'yes');
    if (localStorage.getItem('isEnabled') === 'yes') {
        localStorage.removeItem('isEnabled');
        // localStorage is enabled
    } else {
        alert("Please enable cookies and local storage so that your settings can be saved");
    }
}

function loadSettings() {
    var index = 0, savedTeams = [];
    while (localStorage.getItem("hot-scheduler-team-"+index) !== null) {
        savedTeams.push(JSON.parse(localStorage.getItem("hot-scheduler-team-"+index)));
        index++;
    }

    if (localStorage.getItem("hot-scheduler-occupation") !== null) {
        setOccupation(localStorage.getItem("hot-scheduler-occupation"));
    }

    if (localStorage.getItem("hot-scheduler-available-seats") !== null) {
        setTotalSeats(localStorage.getItem("hot-scheduler-available-seats"));
    }

    var teamHolder;
    $.each(savedTeams, (idx, obj) => {
        teamHolder = $getLoadedTeam();
        teamHolder.find(".team-name").text(obj.teamName);
        teamHolder.find(".team-size").text(obj.teamSize);
        teamHolder.insertBefore($("#add-team-button").parent());
    });

    _teams = savedTeams;

    updateTotalPeople();
    updateSwitchTable();
}

function saveSettings() {
    localStorage.clear();

    $.each(_teams, (idx, obj) => {
        obj.teamId = idx;
        localStorage.setItem("hot-scheduler-team-"+idx, JSON.stringify(obj));
    });

    localStorage.setItem("hot-scheduler-occupation", getOccupation());
    localStorage.setItem("hot-scheduler-available-seats", getTotalSeats());

    console.log("saved: ", _teams);

    updateSwitchTable();
    updateTotalPeople();
}