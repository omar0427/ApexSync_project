const supabaseUrl = "https://gseeviptydjfnuikiboj.supabase.co";
const supabaseKey = "sb_publishable_71MdlF6qcg0pYovceeAxWA_5lOoaBVm"; 

const supabaseClient = window.supabase.createClient(supabaseUrl, supabaseKey);

// temporary hardcoded user for testing
const currentUserId = 1;

async function reserveCourt(courtId) {
  const bookingDate = document.getElementById(`date-${courtId}`).value;
  const startTime = document.getElementById(`start-${courtId}`).value;
  const endTime = document.getElementById(`end-${courtId}`).value;

  if (!bookingDate || !startTime || !endTime) {
    alert("Please fill in date, start time, and end time.");
    return;
  }

  const { data, error } = await supabaseClient
    .from("bookings")
    .insert([
      {
        user_id: currentUserId,
        class_id: null,
        court_id: courtId,
        booking_date: bookingDate,
        start_time: startTime,
        end_time: endTime,
        status: "booked"
      }
    ])
    .select();

  if (error) {
    console.error("Court booking error:", error);
    alert("Failed to reserve court.");
    return;
  }

  console.log("Inserted court booking:", data);
  alert("Court reserved successfully!");
}

async function loadCourts() {
  const { data, error } = await supabaseClient
    .from("courts")
    .select("*");

  const courtList = document.getElementById("court-list");

  if (error) {
    courtList.innerHTML = "<p>Error loading courts.</p>";
    console.error(error);
    return;
  }

  if (!data || data.length === 0) {
    courtList.innerHTML = "<p>No courts found.</p>";
    return;
  }

  courtList.innerHTML = data.map(court => {
    let imagePath = "images/tennis-court.png";

    if (
      court.sport_type &&
      court.sport_type.toLowerCase().includes("basketball")
    ) {
      imagePath = "images/basketball-court.png";
    }

    return `
      <div class="class-card">
        <img src="${imagePath}" alt="${court.sport_type} court" class="court-image" />
        <h3>${court.court_name}</h3>
        <p>Sport: ${court.sport_type}</p>

        <label>Date:</label>
        <input type="date" id="date-${court.id}" />

        <label>Start Time:</label>
        <input type="time" id="start-${court.id}" />

        <label>End Time:</label>
        <input type="time" id="end-${court.id}" />

        <button onclick="reserveCourt(${court.id})">Reserve Court</button>
      </div>
    `;
  }).join("");
} 
loadCourts();