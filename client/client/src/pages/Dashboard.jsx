import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import TripCard from "../components/TripCard";
import "./Dashboard.css";

const API_URL = "https://travelsphere-lvz4.onrender.com";

function Dashboard() {
  const [trips, setTrips] = useState([]);

  const [title, setTitle] = useState("");
  const [destination, setDestination] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState("");
  const [days, setDays] = useState("");
  const [itinerary, setItinerary] = useState("");
  const [image, setImage] = useState(null);
  const [editingId, setEditingId] = useState(null);

  const token = localStorage.getItem("token");

  const fetchTrips = async () => {
    const res = await axios.get(`${API_URL}/api/trips/my-trips`, {
      headers: {
        Authorization: token,
      },
    });

    setTrips(res.data);
  };

  useEffect(() => {
    fetchTrips();
  }, []);

  const createTrip = async (e) => {
    e.preventDefault();

    let imageUrl = "";

    if (image) {
      const formData = new FormData();
      formData.append("image", image);

      const uploadRes = await axios.post(
        `${API_URL}/api/upload`,
        formData
      );

      imageUrl = uploadRes.data.imageUrl;
    }

    if (editingId) {
      await axios.put(
        `${API_URL}/api/trips/${editingId}`,
        {
          title,
          destination,
          description,
          budget,
          image: imageUrl,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      setEditingId(null);
    } else {
      await axios.post(
        `${API_URL}/api/trips`,
        {
          title,
          destination,
          description,
          budget,
          image: imageUrl,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
    }

    setTitle("");
    setDestination("");
    setDescription("");
    setBudget("");
    setDays("");
    setImage(null);
    setItinerary("");

    fetchTrips();
  };

  const generateItinerary = async () => {
    try {
      const res = await axios.post(
        `${API_URL}/api/ai/itinerary`,
        {
          destination,
          budget,
          days,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      setItinerary(res.data.itinerary);
    } catch (error) {
      console.log(error);
    }
  };

  const editTrip = (trip) => {
    setEditingId(trip._id);
    setTitle(trip.title);
    setDestination(trip.destination);
    setDescription(trip.description);
    setBudget(trip.budget);
  };

  const deleteTrip = async (id) => {
    await axios.delete(`${API_URL}/api/trips/${id}`, {
      headers: {
        Authorization: token,
      },
    });

    fetchTrips();
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div>
      <Navbar />

      <div className="dashboard-container">
        <h1 className="dashboard-title">
          TravelSphere Dashboard
        </h1>

        <button onClick={logout}>Logout</button>

        <h2>
          {editingId ? "Update Trip" : "Create Trip"}
        </h2>

        <form className="trip-form" onSubmit={createTrip}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <br /><br />

          <input
            type="text"
            placeholder="Destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />

          <br /><br />

          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <br /><br />

          <input
            type="text"
            placeholder="Budget"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
          />

          <br /><br />

          <input
            type="number"
            placeholder="Days"
            value={days}
            onChange={(e) => setDays(e.target.value)}
          />

          <br /><br />

          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
          />

          <br /><br />

          <button type="submit">
            {editingId ? "Update Trip" : "Create Trip"}
          </button>

          <br /><br />

          <button
            type="button"
            onClick={generateItinerary}
          >
            Generate AI Itinerary
          </button>
        </form>

        {itinerary && (
          <div className="ai-box">
            <h3>AI Itinerary</h3>
            {itinerary}
          </div>
        )}

        <hr />

        <h2>My Trips</h2>

        <div className="trip-grid">
          {trips.map((trip) => (
            <TripCard
              key={trip._id}
              trip={trip}
              onDelete={deleteTrip}
              onEdit={editTrip}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;