const supabaseUrl = "https://gseeviptydjfnuikiboj.supabase.co";
const supabaseKey = "sb_publishable_71MdlF6qcg0pYovceeAxWA_5lOoaBVm";

const supabaseClient = window.supabase.createClient(supabaseUrl, supabaseKey);

// temporary hardcoded user for testing
const currentUserId = 1;

async function bookClass(classId, classDate, startTime, endTime) {
  const { error } = await supabaseClient
    .from("bookings")
    .insert([
      {
        user_id: currentUserId,
        class_id: classId,
        court_id: null,
        booking_date: classDate,
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

  alert("Class booked successfully!");
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
      <p>Date: ${cls.class_date}</p>
      <p>Time: ${cls.start_time} - ${cls.end_time}</p>
      <p>Capacity: ${cls.capacity}</p>
      <button onclick="bookClass(${cls.id}, '${cls.class_date}', '${cls.start_time}', '${cls.end_time}')">
        Book Class
      </button>
    </div>
  `).join("");
}

loadClasses();