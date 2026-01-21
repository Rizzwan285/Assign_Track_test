import { updateAssignment, deleteAssignment } from "../api";
import { useState } from "react";
import { Trash2, Calendar, Clock } from "lucide-react";
import { format } from "date-fns";

function AssignmentList({ assignments, onAssignmentUpdated }) {
  const [processingId, setProcessingId] = useState(null);

  const handleStatusChange = async (id, currentStatus) => {
    setProcessingId(id);
    try {
      let newStatus = "Pending";
      if (currentStatus === "Pending") newStatus = "In Progress";
      else if (currentStatus === "In Progress") newStatus = "Completed";
      else if (currentStatus === "Completed") newStatus = "Pending";
      await updateAssignment(id, { status: newStatus });
      onAssignmentUpdated();
    } catch (error) {
      alert("Failed to update status");
    } finally {
      setProcessingId(null);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this assignment?")) return;
    setProcessingId(id);
    try {
      await deleteAssignment(id);
      onAssignmentUpdated();
    } catch (error) {
      alert("Failed to delete assignment");
      setProcessingId(null);
    }
  };

  const getStatusClass = (status) => {
    return status.toLowerCase().replace(" ", "");
  };

  if (assignments.length === 0) {
    return (
      <div className="empty-state">
        <p>No assignments found. Create one to get started!</p>
      </div>
    );
  }

  return (
    <section className="assignments-section">
      <h2 className="section-header">
        Your Assignments
        <span className="section-count">({assignments.length})</span>
      </h2>

      <div className="assignments-list">
        {assignments.map((assignment) => {
          const formattedDate = format(new Date(assignment.created_time), 'MMM d, yyyy');
          const formattedTime = format(new Date(assignment.created_time), 'h:mm a');

          return (
            <div key={assignment.id} className="assignment-card animate-fade-in">
              <div className="card-header">
                <div className="card-header-content">
                  <div className="card-title-area">
                    <h3 className="card-title">{assignment.title}</h3>
                    <span
                      className={`status-badge ${getStatusClass(assignment.status)}`}
                      onClick={() => handleStatusChange(assignment.id, assignment.status)}
                      style={{ cursor: 'pointer' }}
                      title="Click to cycle status"
                    >
                      {assignment.status}
                    </span>
                  </div>
                  <button
                    className="btn-delete"
                    onClick={() => handleDelete(assignment.id)}
                    disabled={processingId === assignment.id}
                    title="Delete assignment"
                  >
                    <Trash2 className="delete-icon" />
                  </button>
                </div>
              </div>
              <div className="card-body">
                {assignment.description && (
                  <p className="card-description line-clamp-2">
                    {assignment.description}
                  </p>
                )}
                <div className="card-meta">
                  <span className="meta-item">
                    <Calendar className="meta-icon" />
                    {formattedDate}
                  </span>
                  <span className="meta-item">
                    <Clock className="meta-icon" />
                    {formattedTime}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default AssignmentList;
