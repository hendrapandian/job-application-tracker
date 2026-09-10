import { useEffect, useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import JobCard from "../components/JobCard";
import api from "../api";

const emptyForm = {
  company: "",
  position: "",
  location: "",
  salary: "",
  status: "Applied",
  applicationDate: new Date().toISOString().slice(0, 10),
  interviewDate: "",
  jobUrl: "",
  notes: ""
};

const statuses = [
  "Applied",
  "Online Assessment",
  "Interview",
  "Offer",
  "Rejected"
];

export default function Applications() {
  const [applications, setApplications] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function loadApplications() {
    try {
      const response = await api.get("/applications");
      setApplications(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load applications");
    }
  }

  useEffect(() => {
    loadApplications();
  }, []);

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (editingId) {
        await api.put(`/applications/${editingId}`, form);
      } else {
        await api.post("/applications", form);
      }

      setForm(emptyForm);
      setEditingId(null);
      await loadApplications();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save application");
    } finally {
      setLoading(false);
    }
  }

  function editApplication(application) {
    setEditingId(application._id);
    setForm({
      company: application.company || "",
      position: application.position || "",
      location: application.location || "",
      salary: application.salary || "",
      status: application.status || "Applied",
      applicationDate: application.applicationDate
        ? new Date(application.applicationDate).toISOString().slice(0, 10)
        : "",
      interviewDate: application.interviewDate
        ? new Date(application.interviewDate).toISOString().slice(0, 10)
        : "",
      jobUrl: application.jobUrl || "",
      notes: application.notes || ""
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function deleteApplication(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this application?"
    );

    if (!confirmed) return;

    try {
      await api.delete(`/applications/${id}`);
      await loadApplications();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete application");
    }
  }

  function cancelEdit() {
    setEditingId(null);
    setForm(emptyForm);
  }

  const filteredApplications = useMemo(() => {
    return applications.filter((application) => {
      const matchesSearch =
        application.company.toLowerCase().includes(search.toLowerCase()) ||
        application.position.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        filterStatus === "All" || application.status === filterStatus;

      return matchesSearch && matchesStatus;
    });
  }, [applications, search, filterStatus]);

  return (
    <>
      <Navbar />

      <main className="page">
        <section className="section-header">
          <div>
            <p className="eyebrow">APPLICATION MANAGEMENT</p>
            <h1>{editingId ? "Edit Application" : "Add Application"}</h1>
          </div>
        </section>

        {error && <div className="error">{error}</div>}

        <form className="application-form" onSubmit={handleSubmit}>
          <div className="form-grid">
            <div>
              <label>Company *</label>
              <input
                name="company"
                value={form.company}
                onChange={handleChange}
                placeholder="NVIDIA"
                required
              />
            </div>

            <div>
              <label>Position *</label>
              <input
                name="position"
                value={form.position}
                onChange={handleChange}
                placeholder="Software Engineer Intern"
                required
              />
            </div>

            <div>
              <label>Location</label>
              <input
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="Bangalore"
              />
            </div>

            <div>
              <label>Salary</label>
              <input
                name="salary"
                value={form.salary}
                onChange={handleChange}
                placeholder="₹80,000/month"
              />
            </div>

            <div>
              <label>Status</label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
              >
                {statuses.map((status) => (
                  <option key={status}>{status}</option>
                ))}
              </select>
            </div>

            <div>
              <label>Application Date</label>
              <input
                name="applicationDate"
                type="date"
                value={form.applicationDate}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Interview Date</label>
              <input
                name="interviewDate"
                type="date"
                value={form.interviewDate}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Job URL</label>
              <input
                name="jobUrl"
                type="url"
                value={form.jobUrl}
                onChange={handleChange}
                placeholder="https://..."
              />
            </div>
          </div>

          <label>Notes</label>
          <textarea
            name="notes"
            value={form.notes}
            onChange={handleChange}
            placeholder="Interview notes, recruiter details, preparation points..."
            rows="4"
          />

          <div className="form-actions">
            <button className="primary-btn" disabled={loading}>
              {loading
                ? "Saving..."
                : editingId
                ? "Update Application"
                : "Add Application"}
            </button>

            {editingId && (
              <button
                type="button"
                className="secondary-btn"
                onClick={cancelEdit}
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        <section className="applications-section">
          <div className="toolbar">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search company or position..."
            />

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option>All</option>
              {statuses.map((status) => (
                <option key={status}>{status}</option>
              ))}
            </select>
          </div>

          <div className="application-list">
            {filteredApplications.length === 0 ? (
              <div className="empty-state">
                <h3>No applications found</h3>
                <p>Add an application or change your search/filter.</p>
              </div>
            ) : (
              filteredApplications.map((application) => (
                <JobCard
                  key={application._id}
                  application={application}
                  onEdit={editApplication}
                  onDelete={deleteApplication}
                />
              ))
            )}
          </div>
        </section>
      </main>
    </>
  );
}
