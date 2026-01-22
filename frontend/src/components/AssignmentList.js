import { useState, useRef, useEffect } from "react";
import { Eye, Pencil, Trash2, ChevronDown, Clock, Search, ChevronLeft, ChevronRight } from "lucide-react";
import { Calendar, Clock as ClockIcon } from "lucide-react";
import { format } from "date-fns";

function AssignmentList({ assignments, onView, onEdit, onDelete }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const dropdownRef = useRef(null);

  const getStatusClass = (status) => {
    return status.toLowerCase().replace(" ", "");
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filterStatus, searchQuery, assignments]);

  const getRecentAssignments = () => {
    return [...assignments]
      .sort((a, b) => new Date(b.updated_time) - new Date(a.updated_time))
      .slice(0, 10);
  };

  const handleDropdownItemClick = (assignment) => {
    onView(assignment);
    setIsDropdownOpen(false);
  };

  // 1. Filter assignments
  const filteredAssignments = assignments.filter((assignment) => {
    const matchesStatus = filterStatus === "All" || assignment.status === filterStatus;
    const matchesSearch = assignment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (assignment.description && assignment.description.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesStatus && matchesSearch;
  });

  // 2. Sort by creation time descending (Last created first)
  const sortedAssignments = [...filteredAssignments].sort((a, b) =>
    new Date(b.created_time) - new Date(a.created_time)
  );

  // 3. Paginate
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentAssignments = sortedAssignments.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedAssignments.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (assignments.length === 0) {
    return (
      <div className="empty-state">
        <p>No assignments found. Create one to get started!</p>
      </div>
    );
  }

  return (
    <section className="assignments-section">
      <div className="section-header-container" ref={dropdownRef}>
        <button
          className="section-header-btn"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          title="View recent assignments"
        >
          <h2 className="section-header">
            Assignments
            <span className="section-count">({filteredAssignments.length})</span>
          </h2>
          <ChevronDown size={18} className={`section-chevron ${isDropdownOpen ? 'rotate' : ''}`} />
        </button>

        {isDropdownOpen && (
          <div className="recent-dropdown-menu section-dropdown animate-fade-in">
            <div className="dropdown-header">
              <Clock size={14} />
              <span>Recently Updated</span>
            </div>
            {getRecentAssignments().length === 0 ? (
              <div className="dropdown-empty">No assignments found</div>
            ) : (
              <div className="dropdown-list">
                {getRecentAssignments().map(assignment => (
                  <div
                    key={assignment.id}
                    className="dropdown-item"
                    onClick={() => handleDropdownItemClick(assignment)}
                  >
                    <div className="dropdown-item-title">{assignment.title}</div>
                    <div className="dropdown-item-meta">
                      <span className={`status-dot ${getStatusClass(assignment.status)}`}></span>
                      <span className="dropdown-date">
                        {format(new Date(assignment.updated_time), 'MMM d, h:mm a')}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="filters-toolbar">
        <div className="filter-buttons">
          {["All", "Pending", "In Progress", "Completed"].map((status) => (
            <button
              key={status}
              className={`filter-btn ${filterStatus === status ? "active" : ""}`}
              onClick={() => setFilterStatus(status)}
            >
              {status}
            </button>
          ))}
        </div>
        <div className="search-box">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            placeholder="Search assignments..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      {sortedAssignments.length === 0 ? (
        <div className="empty-state">
          <p>No assignments match your filters.</p>
        </div>
      ) : (
        <>
          <div className="assignments-list">
            {currentAssignments.map((assignment) => {
              const formattedDate = format(new Date(assignment.created_time), 'MMM d, yyyy');
              const formattedTime = format(new Date(assignment.created_time), 'h:mm a');

              return (
                <div key={assignment.id} className="assignment-card animate-fade-in">
                  <div className="card-header">
                    <div className="card-header-content">
                      <div className="card-title-area">
                        <h3 className="card-title">{assignment.title}</h3>
                      </div>
                      <span className={`status-badge ${getStatusClass(assignment.status)}`}>
                        {assignment.status}
                      </span>
                    </div>
                  </div>
                  <div className="card-body">
                    {assignment.description && (
                      <p className="card-description line-clamp-2">
                        {assignment.description}
                      </p>
                    )}
                    <div className="card-footer">
                      <div className="card-meta">
                        <span className="meta-item">
                          <Calendar className="meta-icon" />
                          {formattedDate}
                        </span>
                        <span className="meta-item">
                          <ClockIcon className="meta-icon" />
                          {formattedTime}
                        </span>
                      </div>
                      <div className="card-actions">
                        <button
                          className="btn-icon"
                          onClick={() => onView(assignment)}
                          title="View details"
                        >
                          <Eye size={18} />
                        </button>
                        <button
                          className="btn-icon"
                          onClick={() => onEdit(assignment)}
                          title="Edit assignment"
                        >
                          <Pencil size={18} />
                        </button>
                        <button
                          className="btn-icon danger"
                          onClick={() => onDelete(assignment)}
                          title="Delete assignment"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {totalPages > 1 && (
            <div className="pagination-container">
              <button
                className="pagination-btn"
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <ChevronLeft size={16} />
              </button>

              <div className="pagination-numbers">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i + 1}
                    className={`pagination-number ${currentPage === i + 1 ? 'active' : ''}`}
                    onClick={() => paginate(i + 1)}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

              <button
                className="pagination-btn"
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                <ChevronRight size={16} />
              </button>

              <span className="pagination-info">
                Page {currentPage} of {totalPages}
              </span>
            </div>
          )}
        </>
      )}
    </section>
  );
}

export default AssignmentList;
