import { useState, useEffect } from "react";
import AssignmentForm from "./components/AssignmentForm";
import AssignmentList from "./components/AssignmentList";
import StatsBar from "./components/StatsBar";
import { fetchAssignments } from "./api";
import { BookOpen } from "lucide-react";
import "./App.css";

function App() {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadAssignments = async () => {
    try {
      const data = await fetchAssignments();
      setAssignments(data);
      setError(null);
    } catch (err) {
      setError("Failed to load assignments. Is the backend running?");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAssignments();
  }, []);

  return (
    <div className="app-container">
      <header className="header">
        <div className="header-content">
          <div className="header-icon">
            <BookOpen size={20} />
          </div>
          <div>
            <h1 className="header-title">Assignment Tracker</h1>
            <p className="header-subtitle">Manage your academic assignments</p>
          </div>
        </div>
      </header>

      <main className="main-content">
        <div className="content-wrapper">
          {loading ? (
            <p className="message-state">Loading assignments...</p>
          ) : error ? (
            <p className="message-state error-text">{error}</p>
          ) : (
            <>
              <StatsBar assignments={assignments} />
              <AssignmentForm onAssignmentCreated={loadAssignments} />
              <AssignmentList assignments={assignments} onAssignmentUpdated={loadAssignments} />
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
