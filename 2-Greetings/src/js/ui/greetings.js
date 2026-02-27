import getTodayHoliday from "../service/getTodayHoliday.js";
import { isTodayHoliday } from "../service/getTodayHoliday.js";
import { getTodayTime } from "../service/getPhTime.js";
import getTodayDate from "../service/getPhTime.js";

const select = document.getElementById('greeting-type');
const holidays = await getTodayHoliday();

export async function populateGreetingOption(){  
  // Create Groupings
  const groupLabels = ['Everyday Greetings', 'Holiday Greetings'];

  const optGroups = groupLabels.map(label => {
    const optGroup = document.createElement('optgroup');
    optGroup.label = label;
    select.appendChild(optGroup);
    return optGroup;
  });

  // Static Options
  const staticOptions = [
    { value: 'time-based', text: 'Time-Based Greeting' },
    { value: 'birthday', text: 'Birthday Greeting' },
    { value: 'anniversary', text: 'Anniversary Greeting' }  
  ];

  staticOptions.forEach(optionData => {
    const option = document.createElement('option');
    option.value = optionData.value;
    option.textContent = optionData.text;
    optGroups[0].appendChild(option); // Append to Everyday Greetings group
  });

  //Holiday Options from API

  // const holidays = await getTodayHoliday();

  holidays.forEach(holiday => {
    const option = document.createElement('option');
    option.value = `holiday: ${holiday.date}`;
    option.textContent = holiday.name;
    optGroups[1].appendChild(option);
  }); 

  select.value = 'default'; // Set default value to empty
}

export function generateTimeBasedGreeting() {
 
  const currentHour = parseInt(getTodayTime().split(':')[0]); // Extract the hour from the time string

  let message = '';
  let themeKey = 'default';

  if (currentHour < 12) {
    message = 'Good Morning! Have a great start to your day!';
    themeKey = 'morning';
  } else if (currentHour < 18) {
    message = 'Good Afternoon! Hope you are having a wonderful day!';
    themeKey = 'afternoon';
  } else if (currentHour < 22) {
    message = 'Good Evening! Wishing you a relaxing evening!';
    themeKey = 'evening';
  } else {
    message = 'Good Night! Sleep well and sweet dreams!';
  }
  return { message, themeKey };
}

const isDateInRange = (dateString, startString, endString) => {
    const date = new Date(dateString);
    const start = new Date(startString);
    const end = new Date(endString);
    return date >= start && date <= end;
}

function generateHolidayGreeting(date) {

  let message = '';
  let themeKey = 'default';

  if (!date) return '';
  const selectedHoliday = holidays.find(holiday => holiday.date === date);

  if (!selectedHoliday) return '';
  const isHolyWeek = isDateInRange(date, '2026-04-02', '2026-04-05');
  const isChristmas = isDateInRange(date, '2026-12-24', '2026-12-26');

  if (isHolyWeek) {
    message = `Blessed ${selectedHoliday.name}! May you find peace and joy during this sacred time!`;
    themeKey = 'holyweek';
  } else if (isChristmas) {
    message = `Merry ${selectedHoliday.name}! Wishing you a joyful and festive holiday season!`;
    themeKey = 'christmas';
  } else {
    message = `Happy ${selectedHoliday.name}!`;
    themeKey = 'holiday';
  }
  return { message, themeKey };
}


export async function generateGreeting(passedValue) {
  const value = passedValue !== undefined ? passedValue : (select ? select.value : 'default');// Use the passed value or fallback to the current select value

  let result = {message: '', themeKey: 'default'};
    
  if (!value || value === 'default') {

    const todayIsHoliday = await isTodayHoliday();
    const todayDate = getTodayDate();

    if (todayIsHoliday) {
      result = generateHolidayGreeting(todayDate); 
    } else {
      result = generateTimeBasedGreeting();  
    }
  } else if (value.startsWith('holiday: ')) {
      const selectedDate = value.split(': ')[1];
      result = generateHolidayGreeting(selectedDate);
  } else if (value === 'time-based') {
      result = generateTimeBasedGreeting();
  } else if (value === 'birthday') {
      result = {message: 'Happy Birthday! Wishing you a fantastic year ahead!', themeKey: 'birthday'};
  } else if (value === 'anniversary') {
      result = {message: 'Happy Anniversary! May your love continue to grow stronger!', themeKey: 'anniversary'};
  } 
  
  return result;
  }

  


