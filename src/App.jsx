import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch data when component mounts
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data.slice(0, 20))) // take first 20 posts
      .catch(() => setError("Failed to load posts"))
      .finally(() => setLoading(false));
  }, []);

  // Show loading or error
  if (loading) return <div className="center">Loading...</div>;
  if (error) return <div className="center">{error}</div>;

  // Show posts
  return (
    <div className="container">
      <h1>Posts</h1>
      <div className="grid">
        {posts.map((post) => (
          <div key={post.id} className="card">
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;