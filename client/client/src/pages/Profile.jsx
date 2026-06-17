import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function Profile() {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState(null);

  const token = localStorage.getItem("token");

  const fetchProfile = async () => {
    const res = await axios.get("http://localhost:5000/api/users/profile", {
      headers: {
        Authorization: token,
      },
    });

    setUser(res.data);
    setName(res.data.name);
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const updateProfile = async (e) => {
    e.preventDefault();

    let avatarUrl = user.avatar || "";

    if (avatar) {
      const formData = new FormData();
      formData.append("image", avatar);

      const uploadRes = await axios.post(
        "http://localhost:5000/api/upload",
        formData
      );

      avatarUrl = uploadRes.data.imageUrl;
    }

    const res = await axios.put(
      "http://localhost:5000/api/users/profile",
      {
        name,
        avatar: avatarUrl,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );

    setUser(res.data);
    alert("Profile updated successfully");
  };

  if (!user) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>
      <Navbar />

      <div style={{ padding: "20px" }}>
        <h1>Profile</h1>

        {user.avatar && (
          <img
            src={user.avatar}
            alt="avatar"
            width="150"
            style={{
              borderRadius: "50%",
            }}
          />
        )}

        <form onSubmit={updateProfile}>
          <br />

          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <br /><br />

          <input
            type="file"
            onChange={(e) => setAvatar(e.target.files[0])}
          />

          <br /><br />

          <button type="submit">
            Update Profile
          </button>
        </form>

        <p>{user.email}</p>
      </div>
    </div>
  );
}

export default Profile;