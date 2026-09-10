export default function JobCard({ application, onEdit, onDelete }) {
  return (
    <div className="job-card">
      <div>
        <h3>{application.company}</h3>
        <p className="position">{application.position}</p>
        {application.location && <p>{application.location}</p>}
        {application.salary && <p>{application.salary}</p>}
      </div>

      <div className="job-actions">
        <span className={`status status-${application.status.toLowerCase().replaceAll(" ", "-")}`}>
          {application.status}
        </span>

        {application.jobUrl && (
          <a href={application.jobUrl} target="_blank" rel="noreferrer">
            Job Link
          </a>
        )}

        <button onClick={() => onEdit(application)}>Edit</button>
        <button className="danger" onClick={() => onDelete(application._id)}>
          Delete
        </button>
      </div>
    </div>
  );
}
