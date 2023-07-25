// Formats and Displays the current Day and Time
const displayDate = setInterval(() => {
    const date = new Date()
    const day = date.getDay()
    const dayOfWeek = ["Søndag", "Mandag", "Tirsdag", "Onsdag", "Torsdag", "Fredag", "Lørdag"]
    const today = dayOfWeek[day]

    document.getElementsByClassName("date")[0].innerHTML = today
    document.getElementsByClassName("time")[0].innerHTML = date.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false  // Display in 24-hour format
    })
}, 1000)