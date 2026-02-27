import getTodayDate from "./getPhTime";

async function getTodayHoliday() {
    const url = 'https://date.nager.at/api/v3/publicholidays/2026/PH';

    return fetch(url)
    .then(response => {
        // Check if the response was successful
        if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json(); // Parse the response as JSON
    })
    .then(data => {
        // Use the resulting data
        return data
    })
    .catch(error => {
        // Handle errors
        console.error('Error fetching data:', error);
        return null;
    });
}

export default getTodayHoliday;

async function isTodayHoliday() {
    // const todayDate = getTodayDate(); // Get today's date in 'YYYY-MM-DD' format
    const todayDate = getTodayDate();
    const holidays = await getTodayHoliday(); // Fetch the list of holidays

    // Check if today's date matches any holiday date
    const todayHoliday = holidays.find(holiday => holiday.date === todayDate);

    if (todayHoliday) {
        return true;
    } else {
        return false;
    }

}

export { isTodayHoliday };
