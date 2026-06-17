const attractions = {
  Goa: [
    "Baga Beach",
    "Calangute Beach",
    "Fort Aguada"
  ],

  Hyderabad: [
    "Charminar",
    "Golconda Fort",
    "Ramoji Film City"
  ],

  Delhi: [
    "India Gate",
    "Red Fort",
    "Qutub Minar"
  ]
};
function TripCard({ trip, onDelete, onEdit }) {
  return (
    <div
      style={{
        background: "white",
        borderRadius: "16px",
        boxShadow: "0 4px 14px rgba(0,0,0,0.12)",
        overflow: "hidden",
      }}
    >
      {trip.image && (
        <img
          src={trip.image}
          alt="trip"
          style={{
            width: "100%",
            height: "180px",
            objectFit: "cover",
          }}
        />
      )}

      <div style={{ padding: "18px" }}>
        <h3 style={{ marginTop: 0 }}>
          {trip.title}
        </h3>

        <p><strong>Destination:</strong> {trip.destination}</p>
        <p><strong>Description:</strong> {trip.description}</p>
        <p><strong>Budget:</strong> {trip.budget}</p>
        {attractions[trip.destination] && (
  <>
    <p>
      <strong>Nearby Attractions:</strong>
    </p>

    <ul>
      {attractions[trip.destination].map((place) => (
        <li key={place}>{place}</li>
      ))}
    </ul>
  </>
)}

        <a
          href={`https://www.google.com/maps/search/?api=1&query=${trip.destination}`}
          target="_blank"
          rel="noreferrer"
          style={{
            display: "inline-block",
            marginBottom: "12px",
            color: "#2563eb",
            fontWeight: "bold",
            textDecoration: "none",
          }}
        >
          View on Map
        </a>

        <br />

        <button
          onClick={() => onDelete(trip._id)}
          style={{
            background: "#dc2626",
            color: "white",
            border: "none",
            padding: "10px 14px",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Delete
        </button>

        <button
          onClick={() => onEdit(trip)}
          style={{
            marginLeft: "10px",
            background: "#16a34a",
            color: "white",
            border: "none",
            padding: "10px 14px",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Edit
        </button>
      </div>
    </div>
  );
}

export default TripCard;