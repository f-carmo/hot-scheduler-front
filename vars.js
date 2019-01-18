let teams = [];

function getTotalPeople() {
    let total = 0;
    $.each(teams, (idx, obj) => {
        total += Number(obj.teamSize)
    });

    return total;
}

function getTeamNames() {
    let names = [];
    $.each(teams, (idx, obj) => {
        names.push(obj.teamName)
    });

    return names;
}

function getMinWfh() {
    if (getTotalPeople() - getTotalSeats() < 0) return 0;
    return getTotalPeople() - getTotalSeats();
}

function getMaxWfh() {
    return getTotalPeople() - Math.ceil(getTotalSeats()/2);
}

function getTotalSeats() {
    return $("#total-seats").val();
}

function $getMainTBody() {
    return $("#main-tbody");
}

function $getReadyTeams() {
    return $("#team-table-body").find(".ready");
}