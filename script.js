// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.


class TimeBlock{
  constructor(hour, event){
    this.hour = hour;
    this.event = event;
  }
}
var currentDate = dayjs();
var schedule = [];
schedule[0] = new TimeBlock(9, "beep");
updateDate();
createTimeBlock(0);
$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
});


function createTimeBlock(index){
  let timeBlockHTML = "<div id=\"hour-"+ schedule[index].hour +"\" class=\"row time-block ";
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
function updateDate(){
  currentDate = dayjs();
  $("#currentDay").text(currentDate.format("dddd, MMMM D, YYYY h:mm A"));
}
function buildPlanner(){

}
function saveEvent(){

}