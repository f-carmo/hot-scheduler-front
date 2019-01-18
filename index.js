$(document).ready(function() {
    //updateVariables();

    $('[data-toggle="popover"]').popover();

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

function updateTeams() {
    teams = [];
    $.each($getReadyTeams(), (idx, obj) => {
        teams.push({
            teamName: $(obj).find(".team-name").first().text(),
            teamSize: $(obj).find(".team-size").first().text()
        });
    });

    updateVariables();
}

function generate() {
    if (!validateParameters()) {
        alert("Parameters are invalid");
        return false;
    }

    $getMainTBody().empty();

    for (var x = 0; x < $("#wfh-quantity").val(); x++) {
        $getTableRow().appendTo($getMainTBody());
    }

    var slots = $getMainTBody().find("td");
    var counter = Math.round(Math.random() * (getTotalPeople()-1));
    var pillHolder;

    $.each(slots, (idx, obj) => {
        pillHolder = $getPill().text(getTeamNames()[counter%getTotalPeople()]);
        addHover(pillHolder);
        pillHolder.appendTo($(obj));
        counter++;
    });
}

function addHover($obj) {
    $obj.hover(() => {
        $getMainTBody()
            .find(".badge:contains("+$obj.text()+")")
            .removeClass("badge-light")
            .addClass("badge-primary");
    }, () => {
        $getMainTBody()
            .find(".badge-primary")
            .removeClass("badge-primary")
            .addClass("badge-light");

        $getMainTBody()
            .find(".badge-danger")
            .removeClass("badge-light");

        $getMainTBody()
            .find(".badge-warning")
            .removeClass("badge-light");
    });

    $obj.click(() => {
        if ($obj.hasClass("badge-danger") || $obj.hasClass("badge-warning")) {
            $getMainTBody().find(".badge-danger").removeClass("badge-danger").addClass("badge-light");
            $getMainTBody().find(".badge-warning").removeClass("badge-warning").addClass("badge-light");
        } else {
            var $holding = $getMainTBody().find(".badge-danger");
            if ($holding.length > 0) {
                if(validateSwitch($holding, $obj)) {
                    var $aux = $holding.parent();
                    $holding.appendTo($obj.parent());
                    $holding.removeClass("badge-danger").addClass("badge-light");
                    $getMainTBody().find(".badge-warning").removeClass("badge-warning").addClass("badge-light");
                    $obj.appendTo($aux);
                }
            } else {
                $obj.removeClass("badge-light").addClass("badge-danger");
                $getMainTBody().find(".badge-primary").removeClass("badge-light").addClass("badge-warning");
            }
        }
    })
}
