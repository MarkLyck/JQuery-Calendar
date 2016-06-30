var $year = $('#year');
var $month = $('#month');
var $dates = $('.dates');
var $otherDate = $('.other-date');

var today = new Date();
var year = today.getFullYear();
var month = today.getMonth()+1;
var day = today.getDate();
var daysInMonth = 31;

var $nextMonth = $('#next');
var $prevMonth = $('#prev');

$nextMonth.on('click', function() {
  getNextMonth();
});
$prevMonth.on('click', function() {
  getPrevMonth();
});


function setMonthName() {
  if (month === 1) {
    $month.text('January');
  } else if (month === 2) {
    $month.text('Februrary');
  } else if (month === 3) {
    $month.text('March');
  } else if (month === 4) {
    $month.text('April');
  } else if (month === 5) {
    $month.text('May');
  } else if (month === 6) {
    $month.text('June');
  } else if (month === 7) {
    $month.text('July');
  } else if (month === 8) {
    $month.text('August');
  } else if (month === 9) {
    $month.text('September');
  } else if (month === 10) {
    $month.text('October');
  } else if (month === 11) {
    $month.text('November');
  } else {
    $month.text('December');
  }
}

function getNextMonth() {
  month++;
  if (month > 12) {
    year++;
    month = 1;
  }
  updateCalendar();
}

function getPrevMonth() {
  month--;
  if (month < 1) {
    year--;
    month = 12;
  }
  updateCalendar();
}

$dates.on('click', function(e){
  $dates.children().removeClass('selected');
  $(e.target).toggleClass('selected');
});

updateCalendar();

function updateCalendar() {

  daysInMonth = getDaysInMonth(month);
  var firstDayOfMonth = new Date(year,month-1,1);
  var startDate = firstDayOfMonth.getDay();
  // 0 = sun
  // 1 = mon
  // 2 = tue
  // 3 = wed
  // 4 = thu
  // 5 = fri
  // 6 = sat
  var daysInLastMonth = 0;
  if (month !== 1) {
    daysInLastMonth = getDaysInMonth(month-1);
  } else {
    daysInLastMonth = getDaysInMonth(12);
  }
  $dates.empty();
  for(var i = 0; i < startDate-1; i++) {
    //Create TD elements with classes for last month
    var $prevDate = $('<li>' + daysInLastMonth + '</li>');
    $prevDate.addClass('other-date');
    addPrevMonthEvent($prevDate);
    $dates.prepend($prevDate);
    daysInLastMonth--;
  }

  for(var day = 1; day <= daysInMonth; day++) {
    var $currDate = $('<li>' + day + '</li>');
    $currDate.addClass('date');
    $dates.append($currDate);
  }

  function addNextMonthEvent(element) {
    element.on('click', function(){
      getNextMonth();
    });
  }
  function addPrevMonthEvent(element) {
    element.on('click', function(){
      getPrevMonth();
    });
  }

  if ($dates.children().length%7 !== 0) {
    var extraDate = 1;
    while($dates.children().length%7 !== 0) {
      var $extraDate = $('<li>' + extraDate + '</li>');
      $extraDate.addClass('other-date');
      addNextMonthEvent($extraDate);
      $dates.append($extraDate);
      extraDate++;
    }
  }

  setMonthName();
  $year.text(year);
}

function getDaysInMonth(monthNum)  {
  if (monthNum === 1 || monthNum === 3 || monthNum === 5 || monthNum === 7 || monthNum === 8 || monthNum === 10 || monthNum === 12) {
    return 31;
  } else if (monthNum === 4 || monthNum === 6 || monthNum === 9 || monthNum === 11) {
    return 30;
  } else if (monthNum==2)  {
    if (isLeapYear(year)) {
      return 29;
    } else {
      return 28;
    }
  } else {
    throw new Error('UNKNOWN MONTH');
  }
}

function isLeapYear() {
  return ((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0);
}
