$(document).ready(function () {
    $(".current-day").text(moment().format("dddd, MMMM, Do"));

    $(".btn").on("click", function () {
        var textTask = $(this).siblings(".text-value").val();
        if (!textTask) {
            textTask = "";
        }
        var textTime = $(this).siblings(".time-holder").attr("id");
        localStorage.setItem(textTime, textTask);
    });

    var loadTasks = function () {
        $(".row").each(function () {
            var key = $(this).children(".time-holder").attr("id");
            var taskText = $(this).children(".text-value");
            var taskSave = localStorage.getItem(key);
            var timeText = $(this).children(".time-holder").text();
            auditTasks(timeText, taskText);
            if (taskSave) {
                taskText.val(taskSave);
            }
        })
    };

var auditTasks = function (timeText, taskText) {
    //var currentHour = moment().hours();
    var currentHour = 13;
    var timeTextSplit = timeText.split(":");
    var timeHour = parseInt(timeTextSplit[0]);
    var finalTime;
    if (timeHour <= 5) {
        finalTime = timeHour + 12;
    }
    else {
        finalTime = timeHour;
    }
    if (finalTime > currentHour) {
        taskText.addClass("future");
    }
    else if (finalTime < currentHour) {
        taskText.addClass("past");
    }
    else {
        taskText.addClass("present");
    }
}
loadTasks();




}); // end of ready
