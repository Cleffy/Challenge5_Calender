# Challenge5_Calender

## Description
A simple planner for the day. It allows the user to input a plan during an hour block and save it to their local storage.

## Usage
https://cleffy.github.io/Challenge5_Calender/
![Calender Site](/Reference/WorkDayScheduler.jpeg)

The day is broken down into hour blocks. The user can input what they want to do during an hour block. If they click the save button, then it saves the info for that block to local storage. They can clear their schedule with the Clear Schedule button. If they reload the page on a different day, then the schedule clears as well.  
If they refresh the page, the current hour block will be in red, the previuous blocks will be in gray, and the future blocks will be in green.  
The date and time at the top of the page refreshes every minute.

## Credits
Base code provided by edX for use during University of Berkely Full-stack Developer Bootcamp - 2023

Day.js Reference Library https://day.js.org/  
JQuery Reference Library https://api.jquery.com/

## Known Issues
The color coding will not change when an hour elapses and the user has not refreshed the page.
