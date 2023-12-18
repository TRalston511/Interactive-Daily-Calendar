var today = moment().format("dddd, MMMM Do YYYY ");
var now = moment().format("H A");

// planWorkday for each hour of the workday

var workdayCalendar = [
    { time: "9 AM", 
        event: "" },
    { time: "10 AM", 
        event: "" },
    { time: "11 AM", 
        event: "" },
    { time: "12 PM", 
        event: "" },
    { time: "1 PM", 
        event: "" },
    { time: "2 PM", 
        event: "" },
    { time: "3 PM", 
        event: "" },
    { time: "4 PM", 
        event: "" },
    { time: "5 PM", 
        event: "" },
  ];

// Local Storage

var workdayEvents = JSON.parse(localStorage.getItem("workDay"));
if (workdayEvents) {
    workdayCalendar = workdayEvents;
}

//Current Day

$("#currentDay").text(today);

//Create rows

workdayCalendar.forEach(function(timeBlock, index) {
	var timeLabel = timeBlock.time;
	var blockColor = colorRow(timeLabel);
	var row =
		'<div class="time-block" id="' +
		index +
		'"><div class="row no-gutters input-group"><div class="col-sm col-lg-1 input-group-prepend hour justify-content-sm-end pr-3 pt-3">' +
		timeLabel +
		'</div><textarea class="form-control ' +
		blockColor +
		'">' +
		timeBlock.event +
		'</textarea><div class="col-sm col-lg-1 input-group-append"><button class="saveBtn btn-block" type="submit"><i class="fas fa-save"></i></button></div></div></div>';

	// Adding rows to container div

	$(".container").append(row);
});

//Color rows based on current time

function colorRow(time) {
	var calendarNow = moment(now, "H A");
	var calendarEntry = moment(time, "H A");
	if (calendarNow.isBefore(calendarEntry) === true) {
		return "future";
	} else if (calendarNow.isAfter(calendarEntry) === true) {
		return "past";
	} else {
		return "present";
	}
}

// Save Events

$(".saveBtn").on("click", function() {
	var blockID = parseInt(
		$(this)
			.closest(".time-block")
			.attr("id")
	);
	var userEntry = $.trim(
		$(this)
			.parent()
			.siblings("textarea")
			.val()
	);
	workdayCalendar[blockID].event = userEntry;

	// Set local storage

	localStorage.setItem("workDay", JSON.stringify(workdayCalendar));
});