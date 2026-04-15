const supabaseUrl = "https://gseeviptydjfnuikiboj.supabase.co";
const supabaseKey = "sb_publishable_71MdlF6qcg0pYovceeAxWA_5lOoaBVm";

const supabaseClient = window.supabase.createClient(supabaseUrl, supabaseKey);

// temporary hardcoded user for testing
const currentUserId = 1;

async function cancelBooking(bookingId) {
  const { error } = await supabaseClient
    .from("bookings")
    .delete()
    .eq("id", bookingId);

  if (error) {
    console.error("Cancel booking error:", error);
    alert("Failed to cancel this booking.");
    return;
  }

  alert("You have successfully cancelled this event.");
  loadBookings();
}

async function loadBookings() {
  const { data, error } = await supabaseClient
    .from("bookings")
    .select(`
      id,
      booking_date,
      start_time,
      end_time,
      status,
      class_id,
      court_id,
      classes ( title ),
      courts ( court_name, sport_type )
    `)
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

  bookingList.innerHTML = data.map(booking => {
    let bookingTitle = "Booking";
    let bookingType = "";

    if (booking.classes) {
      bookingTitle = booking.classes.title;
      bookingType = "Class Booking";
    } else if (booking.courts) {
      bookingTitle = booking.courts.court_name;
      bookingType = `${booking.courts.sport_type} Court Reservation`;
    }

    return `
      <div class="class-card">
        <h3>${bookingTitle}</h3>
        <p><strong>Type:</strong> ${bookingType}</p>
        <p><strong>Date:</strong> ${booking.booking_date}</p>
        <p><strong>Time:</strong> ${booking.start_time} - ${booking.end_time}</p>
        <p><strong>Status:</strong> ${booking.status}</p>
        <button class="cancel-btn" onclick="cancelBooking(${booking.id})">
          Cancel Booking
        </button>
      </div>
    `;
  }).join("");
}

loadBookings();