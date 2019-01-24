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

function $getSchedulePill() {
    var $pill = $("#pill").clone();
    $pill.removeAttr("id");
    addHover($pill);
    return $pill;
}

function $getSwitchTablePill() {
    var $pill = $("#pill").clone();
    $pill.removeAttr("id");
    addSwitchTableEvent($pill);
    return $pill;
}

function $getModalReference() {
    return $("#team-settings-modal");
}

function $getTeam() {
    var $team = $("#team").clone();
    $team.removeAttr("id");
    return $team;
}

function $getLoadedTeam() {
    var $team = $("#loaded-team").clone();
    $team.removeAttr("id");
    return $team;
}

function $getEditButton() {
    var $edit = $("#edit-button").clone();
    $edit.removeAttr("id");
    return $edit;
}

function $getTeamSettingsButton() {
    var $settings = $("#team-settings").clone();
    $settings.removeAttr("id");
    return $settings;
}

function $getSaveTeamButton() {
    var $save = $("#save-team-button").clone();
    $save.removeAttr("id");
    return $save;
}

function $getSwitchTableRow() {
    var $str = $("#switch-table-row").clone();
    $str.removeAttr("id");
    return $str;
}

function $getSwitchTable() {
    return $("#switch-table");
}

function $getCustomSwitchInput() {
    var $csb = $("#custom-switch-button").clone();
    $csb.removeAttr("id");
    return $csb;
}