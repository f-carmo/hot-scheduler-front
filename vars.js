function getPool() {
    return [
        "Andre Silva",
        "Andre Requejo",
        "Victor",
        "Rafael Ide",
        "Rafael Leal",
        "Romulo",
        "Spencer",
        "Nicholas",
        "Guilherme",
        "John",
        "Doe"
    ];
}

function getTotalPeople() {
    return getPool().length;
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