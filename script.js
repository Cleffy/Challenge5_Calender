//Class that holds the hour block and whatever is scheduled.
class TimeBlock{
  constructor(hour, event){
    this.hour = hour;
    this.event = event;
  }
}
var currentDate = dayjs();          //Current date
var timer = dayjs().second();       //Gets current seconds to update time
var businessStart = 9;              //Starting hour on a 24-hour scale
var businessEnd = 22;               //Ending hour on a 24-hour scale
var schedule = [];                  //An array of TimeBlocks

//Initializes the website
updateDate();
buildSchedule();
buildPlanner();

// Events
/*
  saveBtn
  Saves whatever is in the corresponding text field into local storage when it's clicked
*/
$(".saveBtn").on("click", function () {
  var parentEl = $(this).parent();
  var hour = parentEl.data("hour");
  var event = parentEl.children("textarea").val();
  saveEvent(hour, event);
});
/*
  clearBtn
  Clears whatever is in local storage related to this page when it's clicked
*/
$(".clearBtn").on("click", function() {
  clearSchedule();
});

/*
  Interval updates the time
*/
setInterval(function() {
  timer++;
  if(timer >= 60){
    timer = 0;
    updateDate();
  }
}, 1000);

// Functions that add HTML elements to the page.
/*
  createTimeBlock(index)
  index: The current TimeBlock being worked on.
  Builds the HTML of a single TimeBlock
*/
function createTimeBlock(index){
  var timeBlockHTML = "<div data-hour=\""+ schedule[index].hour +"\" id=\"hour-"+ schedule[index].hour +"\" class=\"row time-block ";
  if(schedule[index].hour < currentDate.hour()){
    timeBlockHTML += "past\">";
  }
  else if(schedule[index].hour == currentDate.hour()){
    timeBlockHTML += "present\">";
  }
  else{
    timeBlockHTML += "future\">";
  }
  timeBlockHTML += "<div class=\"col-2 col-md-1 hour text-center py-3\">" + dayjs().hour(schedule[index].hour).format('h A') + "</div>";
  timeBlockHTML += "<textarea class=\"col-8 col-md-10 description\" rows=\"3\">" + schedule[index].event + "</textarea>";
  timeBlockHTML += "<button class=\"btn saveBtn col-2 col-md-1\" aria-label=\"save\">";
  timeBlockHTML += "<i class=\"fas fa-save\" aria-hidden=\"true\"></i>";
  timeBlockHTML += "</button>";
  timeBlockHTML += "</div>";
  $("#schedule").append(timeBlockHTML);
}
/*
  createClearButton()
  Builds the HTML for a clearButton.
*/
function createClearButton(){
  var clearBtn = "<div class=\"row\">";
  clearBtn += "<div class=\"col-2 col-md-1 py-3\"></div>";
  clearBtn += "<button class=\"btn clearBtn col-8 col-md-10\" rows=\"3\" aria-label=\"clear\">Clear Schedule</button>";
  clearBtn += "<div class=\"col-2 col-md-1\"></div></div>";
  $("#schedule").append(clearBtn);
}


// Functions that update the HTML elements on page load and if something happens.
/*
  updateDate()
  Updates the date field to what the current date and time are.
*/
function updateDate(){
  currentDate = dayjs();
  $("#currentDay").text(currentDate.format("dddd, MMMM D, YYYY h:mm A"));
}
/*
  buildSchedule()
  Creates the TimeBlocks within schedule depending on what is in local storage.
*/
function buildSchedule(){
  for(let index = 0; index <= businessEnd-businessStart; index++){
    schedule[index] = new TimeBlock(index+businessStart,getEvent(index+businessStart));
  }
}
/*
  updateSchedule()
  Updates the TimeBlocks within schedule depending on what is currently in local storage.
*/
function updateSchedule(){
  for(let index = 0; index <= businessEnd-businessStart; index++){
    schedule[index].event = getEvent(index+businessStart);
  }
}
/*
  clearSchedule()
  Clears whatever is stored in local storage.
*/
function clearSchedule(){
  for(let index = 0; index < schedule.length; index++){
    clearEvent(schedule[index].hour);
  }
  updateSchedule();
  updatePlanner();
}
/*
  buildPlanner()
  Creates the HTML elements of the planner.
*/
function buildPlanner(){
  for(let index = 0; index < schedule.length; index++){
    createTimeBlock(index);
  }
  createClearButton();
}
/*
  updatePlanner()
  Updates the textFields within a specific hour.
*/
function updatePlanner(){
  for(let index = 0; index < schedule.length; index++){
    $("#hour-" + schedule[index].hour.toString()).children("textarea").val(schedule[index].event);
  }
}

// Functions that deal with the text area of the scheduler. 
/*
  getEvent(hour)
  hour - an hour on the 24 hour timescale
  fetch whatever is stored in the local storage for a certain hour.
  If there is nothing there, then return an empty string.
  If it's from an earlier day, clear the contents then return an empty string.
  Otherwise return whatever was stored.
*/
function getEvent(hour){
  var event = JSON.parse(localStorage.getItem("timeBlock-" + hour.toString()));
  if(event === null){
    return "";
  }
  if(event[0] != currentDate.format("MM/DD/YYYY")){
    clearEvent(hour);
    return "";
  }
  return event[1];
}
/*
  saveEvent(hour, event)
  hour - an hour on the 24 hour timescale
  event - something saved to the schedule
  An array with the current date, and whatever is to be stored
  Stores the array for the certain hour.
*/
function saveEvent(hour, event){
  var eventData = [currentDate.format("MM/DD/YYYY"), event];
  localStorage.setItem("timeBlock-" + hour.toString(), JSON.stringify(eventData));
}
/*
  clearEvent(hour)
  hour - an hour on the 24 hour timescale
  Clears whatever is stored at a certain hour.
*/
function clearEvent(hour){
  localStorage.removeItem("timeBlock-" + hour.toString());
}