function getTodayDate (){

    const date = new Date();
    const options = {
        timeZone: 'Asia/Manila',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    };

    const todayDate = new Intl.DateTimeFormat('en-CA', options).format(date);
    return todayDate;

}

function getTodayTime(){

    const date = new Date();
    const options = {
        timeZone: 'Asia/Manila',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    };

    const todayTime = new Intl.DateTimeFormat('en-US', options).format(date);
    return todayTime;
}

export default getTodayDate;
export { getTodayTime };