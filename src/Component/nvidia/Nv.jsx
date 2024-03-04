import React, { useEffect, useState } from "react";
import NvList from "./NvList";
import { NvAPI } from "../API_handler/NvAPI";
import Project from "../Project";
import "./nvidia.css";

const NvidiaPages = () => {
  const [Gpunvidia, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(undefined);
  const [currentPage, setCurrentPage] = useState(1);

  const handleMoreClick = () => {
    setCurrentPage((currentPage) => currentPage + 1);
  };

  useEffect(() => {
    const loadProjects = async () => {
      setLoading(true);
      try {
        const data = await NvAPI.get(currentPage);
        if (currentPage === 1) {
          setProjects(data);
        } else {
          setProjects((Gpunvidia) => [...Gpunvidia, ...data]);
        }
      } catch (e) {
        if (e instanceof Error) {
          setError(e.message);
        }
      } finally {
        setLoading(false);
      }
    };
    loadProjects();
  }, [currentPage]);

  const saveProject = (nvidia) => {
    NvAPI.put(nvidia)
      .then((updatedProject) => {
        let updatedProjects = Gpunvidia.map((p) => {
          return p.id === nvidia.id ? new Project(updatedProject) : p;
        });
        setProjects(updatedProjects);
      })
      .catch((e) => {
        if (e instanceof Error) {
          setError(e.message);
        }
      });
  };

  const deleteProject = (id) => {
    NvAPI.delete(id)
      .then(() => {
        setProjects(Gpunvidia.filter((project) => project.id !== id));
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top when component mounts or page is refreshed
  }, []);

  return (
    <>
      <div className="nv" />
      <div className="containernv">
        <h1
          data-aos="fade-right"
          data-aos-offset="100"
          data-aos-easing="ease-in-sine"
        >
          Nvidia Geforce GPU's
        </h1>

        {error && (
          <div className="row">
            <div className="card large error">
              <section>
                <p>
                  <span className="icon-alert inverse"></span>
                  {error}
                </p>
              </section>
            </div>
          </div>
        )}

        <NvList
          className="nv-form" // Add a class to the form or its container
          onSave={saveProject}
          onDelete={deleteProject}
          Gpunvidia={Gpunvidia}
        />

        {!loading && !error && (
          <div className="row">
            <div className="col-sm-12">
              <div className="button-group fluid">
                <button className="button default" onClick={handleMoreClick}>
                  More...
                </button>
              </div>
            </div>
          </div>
        )}

        {loading && (
          <div className="center-page">
            <span className="spinner tertiary"></span>
          </div>
        )}
      </div>
    </>
  );
};

export default NvidiaPages;
