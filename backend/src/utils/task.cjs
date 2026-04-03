const calculatePriority = (deadline) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);

    const dayDiff = (deadlineDate - today)/(1000*60*60*24);

    if(dayDiff <= 1) return "High"
    else if(dayDiff <= 3) return "Medium"

    return "Low";
}

module.exports = {
    calculatePriority
}