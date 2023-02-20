import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchAssignees } from '../features/assignees/assigneesSlice';
import { fetchSources } from '../features/sources/sourcesSlice';
import { fetchStatuses } from '../features/statuses/statusesSlice';
import Loader from './Loader';
import Select from 'react-select'
import { postLeads } from '../features/leads/leadsSlice';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Filter = () => {
    const dispatch = useDispatch();
    // dispatch(postLeads());
    const { statuses, isLoading: statusIsLoading, isError: statusIsError, error: statusError } = useSelector(state => state.status);
    const { assignees, isLoading: assigneeIsLoading, isError: assigneeIsError, error: assigneeError } = useSelector(state => state.assignee);
    const { sources, isLoading: sourceIsLoading, isError: sourceIsError, error: sourceError } = useSelector(state => state.source);
    const [selectedStatuses, setSelectedStatuses] = useState([]);
    const [selectedSources, setSelectedSources] = useState([]);
    const [selectedAssignees, setSelectedAssignees] = useState([]);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [search, setSearch] = useState("");

    useEffect(() => {
        dispatch(fetchStatuses());
        dispatch(fetchAssignees());
        dispatch(fetchSources());
    }, [dispatch])



    const filterHandler = () => {
        const data = {}
        if (selectedStatuses?.length) {
            data.lead_status_id = selectedStatuses.map(status => status.id);
        }
        if (selectedSources?.length) {
            data.source_id = selectedSources.map(source => source.id);
        }
        if (selectedAssignees?.length) {
            data.user_id = selectedAssignees.map(assignee => assignee.id);
        }
        if (startDate) {
            data.contacted_date_from = startDate;
        }
        if (endDate) {
            data.contacted_date_to = endDate;
            
        }
        dispatch(postLeads(data));
    }
    const resetFilterHandler = () => {
        setSelectedStatuses([]);
        setSelectedSources([]);
        setSelectedAssignees([]);
        setStartDate(null);
        setEndDate(null);
        dispatch(postLeads());
    }
    const onChange = (dates) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    };
    return (
        <>
            {
                (assigneeIsLoading || statusIsLoading || sourceIsLoading) ? <Loader /> : null
            }
            <div
                className="d-none d-sm-inline-block form-inline my-2 my-md-0 mw-100 navbar-search pb-4">
                <div className="input-group">
                    <input value={search} onChange={(e) => setSearch(e.target.value)} type="text" className="form-control bg-light border-0 small" placeholder="Search in leads table"
                        aria-label="Search" aria-describedby="basic-addon2" />
                    <div className="input-group-append">
                        <button onClick={filterHandler} className="btn btn-primary" type="button">
                            <i className="fas fa-search fa-sm"></i>
                        </button>
                    </div>
                </div>
            </div>
            <div className='row'>
                <div className="col-md-3">
                    <div className="form-group">
                        <Select getOptionLabel={(option) => option.name} value={selectedStatuses} isMulti
                            getOptionValue={(option) => option.id} onChange={setSelectedStatuses} options={statuses} placeholder="Status" />
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="form-group">
                        <Select getOptionLabel={(option) => option.name} value={selectedSources} isMulti
                            getOptionValue={(option) => option.id} onChange={setSelectedSources} options={sources} placeholder="Sources" />
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="form-group">
                        <Select getOptionLabel={(option) => option.name} value={selectedAssignees} isMulti
                            getOptionValue={(option) => option.id} onChange={setSelectedAssignees} options={assignees} placeholder="Assignes" />
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="form-group">
                        <DatePicker startDate={startDate}
                            dateFormat="yyyy/MM/dd"
                            endDate={endDate}
                            selectsRange
                            placeholderText="Contacted Date"
                            onChange={onChange} />
                    </div>
                </div>

            </div>

            <div className="row d-flex justify-content-end">
                <div className="col-lg-2 col-md-4 mb-3 mb-md-0">
                    <button className='btn btn-primary btn-block' onClick={filterHandler}>Filter</button>

                </div>
                <div className="col-lg-2 col-md-4">
                    <button className='btn btn-secondary btn-block' onClick={resetFilterHandler}>Reset Filter</button>
                </div>
            </div>


        </>
    )
}

export default Filter