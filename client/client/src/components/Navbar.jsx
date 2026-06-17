import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav
      style={{
        background: "#2563eb",
        padding: "15px",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <h2 style={{ color: "white" }}>
        TravelSphere 🌍
      </h2>

      <div>
        <Link
          to="/dashboard"
          style={{
            color: "white",
            textDecoration: "none",
            marginRight: "20px",
          }}
        >
          Dashboard
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;