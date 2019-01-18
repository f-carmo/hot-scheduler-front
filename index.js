$(document).ready(function() {
    $(window).bind("beforeunload",function(event) {
        return ".";
    });
});

function updateVariables() {
    $("#total-quantity").text(getTotalPeople() + " people");
}

function addTeam() {
    $getTeam().insertBefore($("#add-team-button").parent());
}

function saveTeam($saveBtn) {
    const $teamName = $saveBtn.parent().parent().find(".team-name").first().find("input");
    const $teamSize = $saveBtn.parent().parent().find(".team-size").first().find("input");

    $teamName.parent().text($teamName.val());
    $teamSize.parent().text($teamSize.val());

    $saveBtn.closest(".not-ready").removeClass("not-ready").addClass("ready");

    $saveBtn.parent().append($getEditButton());
    $saveBtn.remove();

    updateTeams();
}

function editTeam($editBtn) {
    const $teamName = $editBtn.parent().parent().find(".team-name").first();
    const $teamSize = $editBtn.parent().parent().find(".team-size").first();
    const teamName = $teamName.text();
    const teamSize = $teamSize.text();
    $teamName.empty();
    $teamSize.empty();

    $editBtn.closest(".ready").removeClass("ready").addClass("not-ready");

    $("<input type='text' class='form-control'>").val(teamName).appendTo($teamName);
    $("<input type='number' class='form-control' min='1'>").val(teamSize).appendTo($teamSize);

    $editBtn.parent().append($getSaveTeamButton());
    $editBtn.remove();

    updateTeams();
}

function removeTeam($removeBtn) {
    $removeBtn.parent().parent().remove();
    updateTeams();
}

function updateTeams() {
    teams = [];
    $.each($getReadyTeams(), (idx, obj) => {
        teams.push({
            teamName: $(obj).find(".team-name").first().text(),
            teamSize: $(obj).find(".team-size").first().text()
        });
    });

    updateSwitchTable();
    updateVariables();
}

function updateSwitchTable() {
    var $pill, $row;
    $getSwitchTable().find(".switch-table-row").remove();
    $.each(teams, (idx, obj) => {
        $pill = $getSwitchTablePill().text(obj.teamName);
        $row = $getSwitchTableRow();
        $row.find("td").first().append($pill);
        $getSwitchTable().append($row);
    });

    //add "Free" team on the switch table
    $pill = $getSwitchTablePill().text("Free");
    $row = $getSwitchTableRow();
    $row.find("td").first().append($pill);
    $getSwitchTable().append($row);

    //add custom team on the switch table
    $row = $getSwitchTableRow();
    $row.find("td").append($getCustomSwitchInput());
    $getSwitchTable().append($row);
}

function generateTeamSeats() {
    $.each(teams, (idx, obj) => {
        obj.teamSeats = Math.round(obj.teamSize / getTotalPeople() * getTotalSeats() * getOccupation());
        if (obj.teamSeats > obj.teamSize) obj.teamSeats = obj.teamSize;
    });
}

function generate() {
    /*
    if (!validateParameters()) {
        alert("Parameters are invalid");
        return false;
    }*/

    generateSeats();
    generateTeamSeats();
    var weekdaySlots, seatPool =[], $pillHolder;

    $.each($getWeekDaysClass(), (idx, obj) => {
        weekdaySlots = $getMainTBody().find(obj);

        $.each(teams, (teamId, team) => {
            for (var x = 0; x < team.teamSeats; x++) {
                seatPool.push(team.teamName);
            }
        });

        $.each(weekdaySlots, (slotId, seat) => {
            $pillHolder = $getSchedulePill();
            if (seatPool.length > 0) {
                $(seat).append($pillHolder.text(seatPool.shift()))
            } else {
                $(seat).append($pillHolder.text("Free"))
            }
        });
    });
}

function generateSeats() {
    $getMainTBody().empty();
    for (var x = 0; x < getTotalSeats(); x++) {
        $getTableRow().appendTo($getMainTBody());
    }
}


