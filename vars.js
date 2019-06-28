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

function findTeamByName(teamName) {
    let value = "";
    $.each(_teams,(idx, obj) => {
        if (obj.teamName === teamName) {
            value = obj;
        }
    });

    return value;
}

function findTeamById(teamId) {
    let value = undefined;
    $.each(_teams,(idx, obj) => {
        if (obj.teamId == teamId) {
            value = obj;
        }
    });

    return value;
}

function removeTeamById(teamId) {
    let idxToRemove = undefined;
    $.each(_teams,(idx, obj) => {
        if (obj.teamId === Number(teamId)) {
            idxToRemove = idx;
        }
    });

    if (typeof idxToRemove !== "undefined") _teams.splice(idxToRemove, 1);
}

function getEditingTeamName() {
    return $getModalTitleRef().find("span").text();
}

function setMemberDistribution($checkboxRef) {
    let teamObjRef = findTeamByName(getEditingTeamName());
    teamObjRef["distributeMembers"] = $checkboxRef.is(":checked");
}

function getPinnedNames() {
    const pinnedNames = [];
    let $obj = null;
    
    $.each($getMainTBody().find(".badge-success"), (idx, obj) => {
        $obj = $(obj);

        if (typeof pinnedNames[$obj.parent().attr("class")] === "undefined") {
            pinnedNames[$obj.parent().attr("class")] = [];
        }

        pinnedNames[$obj.parent().attr("class")].push($obj.text());
    });

    return pinnedNames;
}