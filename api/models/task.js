
class Task {
    name;
    description;
    dueDay;
    dateAdded;
    startTime;
    endTime;
    completed = false;
    constructor(name, description, dueDay, startTime, endTime, completed = false, dateAdded = null,) {
        const date = new Date();
        let month = Number(date.getMonth())+1
        this.name = name;
        this.description = description;
        this.dueDay = dueDay;
        if (dateAdded == null) {
            this.dateAdded = date.getFullYear() + ":" + month + ":" + date.getDate();
        }
        else {
            this.dateAdded = dateAdded;
        }
        this.startTime = startTime;
        this.endTime = endTime;
        this.completed = completed
    }
    
}
module.exports = Task
