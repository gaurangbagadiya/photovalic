

import React, { Fragment, useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardText, CardBody, Button, Col, Row, Input } from 'reactstrap';
import Breadcrumbs from '@components/breadcrumbs';

import '@styles/react/apps/app-users.scss';

import { deleteProject, getAllProjects } from '../../../@core/api/common_api'
import DataTable from 'react-data-table-component';
import moment from 'moment/moment';
import { Download, Edit, Eye, Trash2 } from 'react-feather';
import { useNavigate } from 'react-router-dom';
import { notification } from '../../../@core/constants/notification';


function ProjectHistory() {
  const navigate = useNavigate()
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    getProjects()
  }, []);

  const getProjects = async () => {
    let response = await getAllProjects();
    // console.log("response", response);
    setProjects(response?.data)
  }

  const handleDeleteProject = async (id) => {
    // console.log("id", id);
    let response = await deleteProject(id)
    // console.log("response", response);
    notification({
      type: response?.status == 1 ? "success" : "error",
      message: response.message,
    });

    if (response?.status == 1) {
      await getProjects()
    }
  }

  useEffect(() => {
    // Filter projects based on active/inactive status and search term
    const filtered = projects?.filter((project) => {
      // console.log(" project?.project_name?.toLowerCase()?.includes(searchTerm?.toLowerCase())", project?.project_name, project?.project_name?.toLowerCase()?.includes(searchTerm?.toLowerCase()));
      if (activeFilter === 'all') {
        return project?.project_name?.toLowerCase()?.includes(searchTerm?.toLowerCase());
      } else if (activeFilter === 'active') {
        return project?.active && project?.project_name?.toLowerCase()?.includes(searchTerm.toLowerCase());
      } else if (activeFilter === 'inactive') {
        return !project?.active && project?.project_name?.toLowerCase()?.includes(searchTerm.toLowerCase());
      }
      return true;
    });
    // console.log("filtered", filtered);
    setFilteredProjects(filtered);
  }, [projects, searchTerm, activeFilter]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilter = (filter) => {
    setActiveFilter(filter);
  };



  const column = [
    {
      name: "No.",
      cell: (row, index) => index + 1,
      sortable: true,
      width: "70px",
    },
    {
      name: "Name",
      selector: (row) => row?.project_name,
    },
    {
      name: "Date",
      selector: (row) => moment(row?.entry_date).format("DD-MM-YYYY"),
    },
    // {
    //   name: "Description",
    //   selector: (row) => row?.project_description,
    // },
    {
      name: "status",
      selector: (row) => row?.active,
    },

    {
      name: "Report",

      cell: (row) => {
        return (
          <div>
            <span title="Generate Report">
              <Download
                size={15}
                style={{ marginRight: "5px", cursor: "pointer" }}
                color="#28c76f"
                onClick={() => navigate("/report", { state: { project_id: row?._id } })}
              />
            </span>
          </div>
        );
      },
    },

    {
      name: "View",

      cell: (row) => {
        return (
          <div>
            <span title="View Details">
              <Eye
                size={15}
                style={{ marginRight: "5px", cursor: "pointer" }}
                color="#7367f0"
                onClick={() => navigate("/projectview", { state: { project_id: row?._id } })}
              />
            </span>
          </div>
        );
      },
    },
    // {
    //   name: "Update",

    //   cell: (row) => {
    //     return (
    //       <div>
    //         <span title="Update Project">
    //           <Edit
    //             size={15}
    //             style={{ marginRight: "5px", cursor: "pointer" }}
    //             color="orange"

    //           />
    //         </span>
    //       </div>
    //     );
    //   },
    // },
    {
      name: "Delete",
      selector: (row) => (<div>
        <span title="Delete Project">
          <Trash2
            size={15}
            style={{ marginRight: "5px", cursor: "pointer" }}
            color="#ea5455"
            onClick={() => handleDeleteProject(row?._id)}
          />
        </span>
      </div>),
    },
  ];

  const ExpandableRow = ({ data }) => {
    return (
      <>
        <div className="expandable-content p-2">
          <p>
            <b>Description</b> : {data?.project_description}
          </p>
        </div>
      </>
    )
  }

  return (
    <Fragment>
      <Breadcrumbs title='Projects' data={[{ title: 'Project History' }]} />
      <Row>
        <Col xs={12}>
          <div className='d-flex mb-2 mt-1'>
            <Input className='me-1' type='text' placeholder='Search Project' value={searchTerm} onChange={handleSearch} />
            <Button className={`me-1 ${activeFilter === 'all' ? 'active' : ''}`} color='primary' onClick={() => handleFilter('all')}>
              All
            </Button>
            <Button className={`me-1 ${activeFilter === 'active' ? 'active' : ''}`} color='primary' onClick={() => handleFilter('active')}>
              Active
            </Button>
            <Button className={`me-1 ${activeFilter === 'inactive' ? 'active' : ''}`} color='primary' onClick={() => handleFilter('inactive')}>
              Inactive
            </Button>
          </div>
          <Card>
            <CardHeader className='sticky-top'>
              <CardTitle>Project History</CardTitle>
            </CardHeader>
            <CardBody>

              <DataTable
                pagination
                columns={column}
                data={filteredProjects}
                paginationRowsPerPageOptions={[10, 20, 50, 100, 200, 500, 1000]}
                expandableRows
                expandableRowsComponent={ExpandableRow}
                className="react-dataTable"
              />

              {/* {filteredProjects && filteredProjects?.map((project) => (
                <Card key={project?._id} className='mb-2' outline color='secondary'>
                  <CardBody>
                    <CardText>
                      <strong>{project?.project_name}</strong> - {project?.entry_date}
                      <br />
                      {project?.project_description}
                    </CardText>
                    <div className='d-flex mt-1'>
                      <Button color='success' className='me-1' onClick={() => handleGenerateReport(project._id)}>
                        Generate Report
                      </Button>
                      <Button color='primary' className='me-1' onClick={() => handleViewProject(project._id)}>
                        View Details
                      </Button>
                      <Button color='primary' className='me-1' onClick={() => handleUpdateProject(project._id)}>
                        Update Project
                      </Button>
                      <Button color='danger' type='submit'>
                        Delete
                      </Button>
                    </div>
                  </CardBody>
                </Card>
              ))}
              {filteredProjects.length === 0 && <p>No projects found.</p>} */}
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
}

export default ProjectHistory;
