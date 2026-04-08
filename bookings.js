const supabaseUrl = "https://gseeviptydjfnuikiboj.supabase.co";
const supabaseKey = "sb_publishable_71MdlF6qcg0pYovceeAxWA_5lOoaBVm";

const supabaseClient = window.supabase.createClient(supabaseUrl, supabaseKey);

// temporary hardcoded user for testing
const currentUserId = 1;

async function loadBookings() {
  const { data, error } = await supabaseClient
    .from("bookings")
    .select("*")
    .eq("user_id", currentUserId)
    .order("id", { ascending: false });

  const bookingList = document.getElementById("booking-list");

  if (error) {
    bookingList.innerHTML = "<p>Error loading bookings.</p>";
    console.error(error);
    return;
  }

  if (!data || data.length === 0) {
    bookingList.innerHTML = "<p>No bookings found.</p>";
    return;
  }

  bookingList.innerHTML = data.map(booking => `
    <div class="class-card">
      <h3>Booking #${booking.id}</h3>
      <p>Class ID: ${booking.class_id ?? "N/A"}</p>
      <p>Court ID: ${booking.court_id ?? "N/A"}</p>
      <p>Date: ${booking.booking_date}</p>
      <p>Time: ${booking.start_time} - ${booking.end_time}</p>
      <p>Status: ${booking.status}</p>
    </div>
  `).join("");
}

loadBookings(); 