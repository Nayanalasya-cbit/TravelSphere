import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div className="home">
      <div className="hero">
        <h1>🌍 TravelSphere</h1>

        <p>
          Plan, organize and explore your dream trips with
          AI-powered itineraries.
        </p>

        <div className="hero-buttons">
          <Link to="/register">
            <button>Get Started</button>
          </Link>

          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
      </div>

      <div className="features">
        <div className="feature-card">
          <h3>🤖 AI Itineraries</h3>
          <p>
            Generate personalized travel plans instantly.
          </p>
        </div>

        <div className="feature-card">
          <h3>📍 Trip Management</h3>
          <p>
            Create, update and manage all your trips.
          </p>
        </div>

        <div className="feature-card">
          <h3>🖼️ Photo Uploads</h3>
          <p>
            Store and showcase trip memories securely.
          </p>
        </div>

        <div className="feature-card">
          <h3>🗺️ Maps Integration</h3>
          <p>
            View destinations directly on Google Maps.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;