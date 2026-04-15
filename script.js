const supabaseUrl = "https://gseeviptydjfnuikiboj.supabase.co";
const supabaseKey = "sb_publishable_71MdlF6qcg0pYovceeAxWA_5lOoaBVm";

const supabaseClient = window.supabase.createClient(supabaseUrl, supabaseKey);

const currentUserId = 1;
let selectedClassId = null;
let selectedClassTitle = "";

function openBookingModal(classId, classTitle) {
  selectedClassId = classId;
  selectedClassTitle = classTitle;
  document.getElementById("modalClassTitle").textContent = `Book ${classTitle}`;
  document.getElementById("bookingModal").style.display = "flex";
}

function closeBookingModal() {
  document.getElementById("bookingModal").style.display = "none";
}

async function confirmClassBooking() {
  const bookingDate = document.getElementById("bookingDay").value;
  const startTime = document.getElementById("bookingTime").value;

  let endTime = "10:00";
  if (startTime === "12:00") endTime = "13:00";
  if (startTime === "16:00") endTime = "17:00";
  if (startTime === "18:00") endTime = "19:00";

  const { error } = await supabaseClient
    .from("bookings")
    .insert([
      {
        user_id: currentUserId,
        class_id: selectedClassId,
        court_id: null,
        booking_date: bookingDate,
        start_time: startTime,
        end_time: endTime,
        status: "booked"
      }
    ]);

  if (error) {
    console.error("Booking error:", error);
    alert("Failed to book class.");
    return;
  }

  alert(`You successfully booked ${selectedClassTitle}.`);
  closeBookingModal();
}

async function loadClasses() {
  const { data, error } = await supabaseClient
    .from("classes")
    .select("*");

  const classList = document.getElementById("class-list");

  if (error) {
    classList.innerHTML = "<p>Error loading classes.</p>";
    console.error(error);
    return;
  }

  if (!data || data.length === 0) {
    classList.innerHTML = "<p>No classes found.</p>";
    return;
  }

  classList.innerHTML = data.map(cls => `
    <div class="class-card">
      <h3>${cls.title}</h3>
      <p>Coach: ${cls.coach_name || "TBA"}</p>
      <p>Available Days: Tue, Thu, Fri</p>
      <p>Available Times: 9:00 AM, 12:00 PM, 4:00 PM, 6:00 PM</p>
      <p>Capacity: ${cls.capacity}</p>
      <button onclick="openBookingModal(${cls.id}, '${cls.title}')">Book Class</button>
    </div>
  `).join("");
}

loadClasses();