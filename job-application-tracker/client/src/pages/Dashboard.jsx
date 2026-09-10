import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import StatsCard from "../components/StatsCard";
import api from "../api";

export default function Dashboard() {
  const [stats, setStats] = useState({
    total: 0,
    applied: 0,
    onlineAssessment: 0,
    interview: 0,
    offer: 0,
    rejected: 0
  });
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadStats() {
      try {
        const response = await api.get("/applications/stats");
        setStats(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load statistics");
      }
    }

    loadStats();
  }, []);

  const user = JSON.parse(localStorage.getItem("user") || "null");

  return (
    <>
      <Navbar />

      <main className="page">
        <section className="hero">
          <div>
            <p className="eyebrow">YOUR RECRUITMENT PIPELINE</p>
            <h1>Hello, {user?.name || "there"} 👋</h1>
            <p>Keep your job applications organized in one place.</p>
          </div>

          <Link className="primary-btn link-btn" to="/applications">
            Manage Applications
          </Link>
        </section>

        {error && <div className="error">{error}</div>}

        <section className="stats-grid">
          <StatsCard title="Total Applications" value={stats.total} />
          <StatsCard title="Applied" value={stats.applied} />
          <StatsCard title="Online Assessments" value={stats.onlineAssessment} />
          <StatsCard title="Interviews" value={stats.interview} />
          <StatsCard title="Offers" value={stats.offer} />
          <StatsCard title="Rejected" value={stats.rejected} />
        </section>

        <section className="info-panel">
          <h2>Application Pipeline</h2>
          <div className="pipeline">
            <div>
              <span>Applied</span>
              <strong>{stats.applied}</strong>
            </div>
            <div>
              <span>OA</span>
              <strong>{stats.onlineAssessment}</strong>
            </div>
            <div>
              <span>Interview</span>
              <strong>{stats.interview}</strong>
            </div>
            <div>
              <span>Offer</span>
              <strong>{stats.offer}</strong>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
