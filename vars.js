let _teams = [];


function getTotalPeople() {
    let total = 0;
    $.each(_teams, (idx, obj) => {
        total += Number(obj.teamSize)
    });

    return total;
}

function getTeamNames() {
    let names = [];
    $.each(_teams, (idx, obj) => {
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

function setTotalSeats(val) {
    $("#total-seats").val(val);
}

function $getMainTBody() {
    return $("#main-tbody");
}

function $getReadyTeams() {
    return $("#team-table-body").find(".ready");
}

function updateTotalPeople() {
    $("#total-quantity").text(getTotalPeople() + " people");
}

function getOccupation() {
    let val = $("#occupation").val();
    if (val > 100) val = 100;
    if (val < 0) val = 0;
    return val;
}

function setOccupation(val) {
    $("#occupation").val(val);
}

function getWeekDaysClass() {
    return [
        '.seg',
        '.ter',
        '.qua',
        '.qui',
        '.sex'
    ]
}

function getWeekDaysNames() {
    return [
        'seg',
        'ter',
        'qua',
        'qui',
        'sex'
    ]
}