import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import Nav from '../components/Nav'
import { useDispatch, useSelector } from 'react-redux'
import { postLeads } from '../features/leads/leadsSlice'
import Loader from '../components/Loader'
import Filter from '../components/Filter'
import Pagination from '../components/Pagination'


const Dashboard = () => {
    const dispatch = useDispatch();
    const { leads, isLoading, isError, error, paginateLinks , total,form,to} = useSelector(state => state.lead);
    const [page, setPage] = useState(1);

    useEffect(() => {
        dispatch(postLeads({ page: page }));
    }, [dispatch, page])

    return (
        <>
            {
                (isLoading) ? <Loader /> : null
            }
            <div id="page-top">
                <div id="wrapper">
                    <Sidebar />
                    <div id="content-wrapper" className="d-flex flex-column">
                        <div id="content">
                            <Nav />
                            <div className="container-fluid">
                                <div className="card shadow mb-4">
                                    <div className="card-header py-3">
                                        <h5>Leads</h5>
                                        <h6 className="m-0 ">

                                            Difficulties increase the nearer we get to the goal.</h6>
                                    </div>
                                    <div className="card-body">
                                        <div className='py-3'>
                                            <Filter />
                                        </div>
                                        <div className="table-responsive">
                                            <table className="table table-sm" id="dataTable" width="100%" cellSpacing="0">
                                                <thead>
                                                    <tr>
                                                        <th>Lead Name</th>
                                                        <th>Phone</th>
                                                        <th>Follow up date</th>
                                                        <th>Last Note</th>
                                                        <th>Assigned</th>
                                                        <th>Email</th>
                                                        <th>Preferred Countries</th>
                                                        <th>Status</th>
                                                        <th>Source</th>
                                                        <th>Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        leads.map((singleLead, index) => (
                                                            <tr key={index}>
                                                                <td>{singleLead?.name ?? '-'}</td>
                                                                <td>{singleLead?.phone ?? '-'}</td>
                                                                <td>{singleLead?.followup_date ?? '-'}</td>
                                                                <td>{singleLead?.lead_notes?.length ? singleLead.lead_notes[singleLead.lead_notes.length - 1].note : 'No notes created !'}   <i className="fas fa-edit"></i>    </td>
                                                                <td>
                                                                    {
                                                                        singleLead?.lead_assignees ? singleLead.lead_assignees?.map((assign, index) => {
                                                                            return (
                                                                                <span key={index}><img className='' style={{ height: '40px', width: '40px', borderRadius: '50%' }} src={'http://crm.softvalley.sveducrm.com/' + assign.image} alt="" /></span>
                                                                            )
                                                                        }) : null
                                                                    }
                                                                </td>
                                                                <td>
                                                                    {singleLead?.email ?? '-'}
                                                                </td>
                                                                <td>
                                                                    {
                                                                        singleLead?.lead_preferred_countries?.length === 0 ? '-' : (
                                                                            singleLead?.lead_preferred_countries?.map((country, index) => {
                                                                                return (
                                                                                    <span key={index}>  {country?.name ?? ''}  {singleLead?.lead_preferred_countries.length > 1 && (singleLead?.lead_preferred_countries.length - 1 !== index) ? ',' : ''}</span>
                                                                                );
                                                                            }) ?? '-'
                                                                        )
                                                                    }
                                                                </td>
                                                                <td> {singleLead?.lead_status ? singleLead.lead_status.name : '-'} </td>
                                                                <td>{singleLead?.source?.name ?? '-'}</td>
                                                                <td>
                                                                    <i className="fas fa-edit"></i>
                                                                    <i className="ml-2 fas fa-trash"></i>
                                                                </td>
                                                            </tr>
                                                        ))
                                                    }
                                                </tbody>
                                            </table>
                                            <div>
                                                <p >Showing {form}-{to} of {total}</p>
                                            </div>
                                            <Pagination setPage={setPage} className="mt-6" links={paginateLinks} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Dashboard