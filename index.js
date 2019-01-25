$(document).ready(function() {
    $(window).bind("beforeunload",function(event) {
        return ".";
    });
    verifyLocalStorage();
    loadSettings();

    $.each($(".js-switch"), (idx, elem) => {
        new Switchery(elem)
    });

    //validateNumberInput($("body").find("input[type='number']"));
});

function editTeamSettings($teamRef) {
    const modal = $getModalReference();
    const teamName = $teamRef.parent().parent().find(".team-name").text();
    const teamObjRef = findTeamByName(teamName);
    $getModalReference().find(".tm-not-ready").remove();
    modal.modal('show');

    if (typeof teamObjRef.variableOccupation !== "undefined") {
        $.each(modal.find("input"), (idx, input) => {
           $(input).val(teamObjRef.variableOccupation[idx]);
        });
    } else {
        modal.find("input").val(getOccupation());
    }

    $getModalTitleRef().text(teamName + " settings");
    $("<span style='display: none'></span>").text(teamName).appendTo($getModalTitleRef());

    let memberHold;
    $.each(teamObjRef.teamMembers, (idx, obj) => {
        memberHold = $getTeamMember();
        memberHold.find(".team-member-name").text(obj);
        memberHold.find(".fa-check-square").remove();
        memberHold.insertBefore($("#add-team-member-button").parent());
    });

    if (!!teamObjRef.distributeMembers) {
        if (!modal.find(".js-switch").is(":checked")) {
            modal.find(".js-switch").trigger('click');
        }
    } else {
        if (modal.find(".js-switch").is(":checked")) {
            modal.find(".js-switch").trigger('click');
        }
    }

    $("#btn-save-team-changes").off().on('click', () => {
        teamObjRef.variableOccupation = [
            $("#vo-seg").val(),
            $("#vo-ter").val(),
            $("#vo-qua").val(),
            $("#vo-qui").val(),
            $("#vo-sex").val()
        ];

        saveSettings();
        $getModalReference().modal('hide');
    });
}

function addTeam() {
    $getTeam().insertBefore($("#add-team-button").parent());
}

function addTeamMember($addBtnRef) {
    const team = findTeamByName(getEditingTeamName());
    const members = $addBtnRef.parent().parent().find("tr").length;

    if (members > team.teamSize) {
        alert("Team size reached. Remove members to continue");
    } else {
        $getTeamMember().insertBefore($("#add-team-member-button").parent());
    }

}

function removeTeamMember($btnRef) {
    const teamMemberName = $btnRef.parent().parent().find("td").first().text();
    removeTeamMemberByName(teamMemberName, findTeamByName(getEditingTeamName()));
    $btnRef.parent().parent().remove();
}

function removeTeamMemberByName(teamMemberName, team) {
    team.teamMembers.splice(team.teamMembers.indexOf(teamMemberName), 1)
    saveSettings();
}

function saveTeamMember($btnRef) {
    const team = findTeamByName(getEditingTeamName());
    const $teamMemberName = $btnRef.parent().parent().find(".team-member-name").first().find("input");
    const teamMemberName = $teamMemberName.val();
    $teamMemberName.parent().text(teamMemberName);

    if (typeof team.teamMembers === "undefined") {
        team.teamMembers = [];
    }

    team.teamMembers.push(teamMemberName);

    $btnRef.remove();

    saveSettings();
}

function saveTeam($saveBtn) {
    const $teamName = $saveBtn.parent().parent().find(".team-name").first().find("input");
    const $teamSize = $saveBtn.parent().parent().find(".team-size").first().find("input");
    const teamId = $saveBtn.parent().parent().find("span").text();
    const newTeam = {
        teamName: $teamName.val(),
        teamSize: $teamSize.val()
    };

    $teamName.parent().text($teamName.val());
    $teamSize.parent().text($teamSize.val());

    $saveBtn.closest(".not-ready").removeClass("not-ready").addClass("ready");

    $saveBtn.parent().append($getEditButton());
    $saveBtn.parent().append($getTeamSettingsButton());
    $saveBtn.remove();

    if (teamId !== "") {
        let oldTeam = findTeamById(teamId);
        newTeam.variableOccupation = oldTeam.variableOccupation;
        newTeam.teamMembers = oldTeam.teamMembers;
        newTeam.distributeMembers = oldTeam.distributeMembers;
        removeTeamById(teamId);
    }

    _teams.push(newTeam);
    saveSettings();
}

function editTeam($editBtn) {
    const $teamName = $editBtn.parent().parent().find(".team-name").first();
    const $teamSize = $editBtn.parent().parent().find(".team-size").first();
    const teamName = $teamName.text();
    const teamSize = $teamSize.text();
    const teamObjRef = findTeamByName(teamName);
    $teamName.empty();
    $teamSize.empty();

    $editBtn.closest(".ready").removeClass("ready").addClass("not-ready");
    $editBtn.parent().find(".fa-cog").remove();
    $editBtn.parent().parent().find(".js-switch").parent().empty();

    $("<input type='text' class='form-control'>").val(teamName).appendTo($teamName);
    $("<input type='number' class='form-control' min='1'>").val(teamSize).appendTo($teamSize);
    $("<span style='display: none;'></span>").text(teamObjRef.teamId).appendTo($teamSize.parent());

    $editBtn.parent().append($getSaveTeamButton());
    $editBtn.remove();
}

function removeTeam($removeBtn) {
    const teamId = findTeamByName($removeBtn.parent().parent().find(".team-name").text()).teamId;
    removeTeamById(teamId);
    $removeBtn.parent().parent().remove();
    saveSettings();
}

function updateSwitchTable() {
    let $pill, $row;
    $getSwitchTable().find(".switch-table-row").remove();
    $.each(_teams, (idx, obj) => {
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

    if ($("#ignore-team-settings").is(":checked")) {
        $.each(_teams, (idx, team) => {
            team.teamSeats = Math.round(team.teamSize / getTotalPeople() * getTotalSeats() * (getOccupation()/100));
            if (team.teamSeats > team.teamSize) team.teamSeats = team.teamSize;
        });
    } else {
        $.each(_teams, (idx, team) => {
            if (typeof team.variableOccupation !== "undefined") {
                team.teamSeats = [];
                for (let x = 0; x < 5; x++) {
                    team.teamSeats.push(Math.round(team.teamSize * (Number(team.variableOccupation[x])/100)));
                }
            } else {
                team.teamSeats = Math.round(team.teamSize / getTotalPeople() * getTotalSeats() * (getOccupation()/100));
                if (team.teamSeats > team.teamSize) team.teamSeats = team.teamSize;
            }
        });
    }

}

function generate() {
    /*
    if (!validateParameters()) {
        alert("Parameters are invalid");
        return false;
    }*/

    generateSeats();
    generateTeamSeats();
    saveSettings();

    $("#alert-box").empty();

    let weekdaySlots, seatPool = [], $pillHolder;

    $.each(getWeekDaysClass(), (idx, weekDayClass) => {
        weekdaySlots = $getMainTBody().find(weekDayClass);

        $.each(_teams, (teamId, team) => {
            let seatLimitation = team.teamSeats[idx] || team.teamSeats;
            for (let x = 0; x < seatLimitation; x++) {
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

        if (seatPool.length > 0) {
            addExcessAllocationMessage(weekDayClass)
        }

        seatPool = [];
    });

    let teamSeats;
    $.each(_teams, (teamId, team) => {
        if (typeof team.teamMembers === "undefined" || !team.distributeMembers) return;
        teamSeats = $("#main-tbody span:contains('"+team.teamName+"')");
        let counter = 0;
        $.each(teamSeats, (idx, seat) => {
            if (isDuplicateSeat($(seat), team.teamMembers[counter%team.teamMembers.length])) {
                counter++;
            } else {
                $(seat).text(team.teamMembers[counter++%team.teamMembers.length])
            }
        });
    });
}

function generateSeats() {
    $getMainTBody().empty();
    for (let x = 0; x < getTotalSeats(); x++) {
        $getTableRow().appendTo($getMainTBody());
    }
}

