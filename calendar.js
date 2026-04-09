const supabaseUrl = "https://gseeviptydjfnuikiboj.supabase.co";
const supabaseKey = "sb_publishable_71MdlF6qcg0pYovceeAxWA_5lOoaBVm";

const supabaseClient = window.supabase.createClient(supabaseUrl, supabaseKey);

// temporary hardcoded user for testing
const currentUserId = 1;

let currentDate = new Date();
let bookings = [];

async function fetchBookings() {
  const { data, error } = await supabaseClient
    .from("bookings")
    .select(`
      id,
      booking_date,
      start_time,
      end_time,
      status,
      classes ( title ),
      courts ( court_name, sport_type )
    `)
    .eq("user_id", currentUserId);

  if (error) {
    console.error("Error loading calendar bookings:", error);
    return;
  }

  bookings = data || [];
  renderCalendar();
}

function getBookingTitle(booking) {
  if (booking.classes) {
    return booking.classes.title;
  }

  if (booking.courts) {
    return booking.courts.court_name;
  }

  return "Booking";
}

function renderCalendar() {
  const calendarGrid = document.getElementById("calendarGrid");
  const monthYear = document.getElementById("monthYear");

  calendarGrid.innerHTML = "";

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  monthYear.textContent = `${monthNames[month]} ${year}`;

  // blank cells before first day
  for (let i = 0; i < firstDay; i++) {
    const blankCell = document.createElement("div");
    blankCell.classList.add("calendar-day", "empty-day");
    calendarGrid.appendChild(blankCell);
  }

  // actual days
  for (let day = 1; day <= daysInMonth; day++) {
    const dayCell = document.createElement("div");
    dayCell.classList.add("calendar-day");

    const dateString = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

    const dayNumber = document.createElement("div");
    dayNumber.classList.add("day-number");
    dayNumber.textContent = day;
    dayCell.appendChild(dayNumber);

    const dayBookings = bookings.filter(booking => booking.booking_date === dateString);

    dayBookings.forEach(booking => {
      const event = document.createElement("div");
      event.classList.add("calendar-event");

      const title = getBookingTitle(booking);
      event.textContent = `${title} (${booking.start_time.slice(0,5)})`;

      dayCell.appendChild(event);
    });

    calendarGrid.appendChild(dayCell);
  }
}

document.getElementById("prevMonth").addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar();
});

document.getElementById("nextMonth").addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar();
});

fetchBookings(); 