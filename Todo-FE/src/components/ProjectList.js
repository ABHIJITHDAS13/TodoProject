import React, { useState } from 'react';
import '../styles/ProjectList.css';

function ProjectList({ projects, onViewProject, onDeleteProject}) {

    const getTodoCounts = (todos = []) => {
      const pending = todos.filter((todo) => todo.status === 'pending');
      const completed = todos.filter((todo) => todo.status === 'complete');
      return { pending: pending.length, completed: completed.length, total: todos.length };
    };

  return (
    <div className="project-list">
    <h3>Project List</h3>
    <table className="project-table">
      <thead>
        <tr>
          <th>Project Name</th>
          <th>Pending Todos</th>
          <th>Completed Todos</th>
          <th>Total Todos</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {projects.map((project) => {
          const { pending, completed, total } = getTodoCounts(project.todos);

          return (
            <tr key={project.id}>
              <td>{project.title}</td>
              <td>{pending}</td>
              <td>{completed}</td>
              <td>{total}</td>
              <td>
                <button onClick={() => onViewProject(project.id)}>View</button>
                <button
                    onClick={() =>
                      window.confirm(`Are you sure you want to delete "${project.title}"?`) &&
                      onDeleteProject(project.id)
                    }
                    className="delete-btn"
                  >
                    Delete
                  </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
  );
}

export default ProjectList;
