function $getTableRow() {
    var $dayHtml = $("#day").clone();
    $dayHtml.removeAttr("id");
    return $dayHtml;
}

function $getPill() {
    var $pill = $("#pill").clone();
    $pill.removeAttr("id");
    return $pill;
}

function $getTeam() {
    var $team = $("#team").clone();
    $team.removeAttr("id");
    return $team;
}

function $getEditButton() {
    var $edit = $("#edit-button").clone();
    $edit.removeAttr("id");
    return $edit;
}

function $getSaveTeamButton() {
    var $save = $("#save-team-button").clone();
    $save.removeAttr("id");
    return $save;
}