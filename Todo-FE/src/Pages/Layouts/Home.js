import React, { useState, useEffect } from 'react';
import "../../styles/Home.css";
import api from "../../Api/api";
import ProjectList from "../../components/ProjectList";
import ProjectView from "../../components/ProjectView";

const Home = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [newProjectTitle, setNewProjectTitle] = useState('');

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await api.get('/projects');
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const createProject = async () => {
    if (!newProjectTitle) return;
    try {
      const response = await api.post('/projects', { title: newProjectTitle });
      setProjects([...projects, response.data]);
      setNewProjectTitle('');
    } catch (error) {
      console.error('Error creating project:', error);
    }
  };

  const selectProject = (projectId) => {
    const project = projects.find((p) => p.id === projectId);
    setSelectedProject(project);
  };
  const handleBackToList = () => {
    setSelectedProject(null); 
    fetchProjects();
  };

  const handleDeleteProject = async (projectId) => {
    try {
      await api.delete(`/projects/${projectId}`);
      setProjects((prevProjects) =>
        prevProjects.filter((project) => project.id !== projectId)
      );
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };


  return (
    <div className="home-container">
    <h1>Project Management</h1>
    {selectedProject ? (
      <ProjectView 
        project={selectedProject} 
        onBack={handleBackToList}
         />
    ) : (
      <div>
        <div className="project-creation">
          <input
            type="text"
            placeholder="New Project Title"
            value={newProjectTitle}
            onChange={(e) => setNewProjectTitle(e.target.value)}
          />
          <button onClick={createProject}>Create Project</button>
        </div>
        <ProjectList
          projects={projects}
          onViewProject={selectProject}
          onDeleteProject={handleDeleteProject}
        />
      </div>
    )}
      </div>
  );
}

export default Home;