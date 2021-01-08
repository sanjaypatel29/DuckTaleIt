import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import { Button, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { deleteStudent, handleState } from '../Redux/actions'
import "../App.css"

//custom style for grid
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: '10px'
    },
    control: {
        padding: theme.spacing(2)
    },
    mainGrid: {
        marginTop: '40px',
        marginBottom: '40px'
    },
    formControl: {
        width: '100%'
    },
    link: {
        textDecoration: 'none'
    },
}));


export default function Home(props) {
    const [data, setdata] = useState([]);
    const [temp, setTemp] = useState([]);
    const [search, setSearch] = useState("")
    const [params, setParams] = useState({ stuClass: '', search: '', subName: '', page: 1, perPage: 5 });
    const classes = useStyles();
    const history = useHistory()
    const dispatch = useDispatch()
    const isDelete = useSelector(state => state.app.isDelete)

    //for intial populating student data
    useEffect(
        () => {
            axios.get('http://localhost:5000/students/all').then((res) => setTemp(res.data.data));
            axios
                .get(
                    `http://localhost:5000/students/all?page=${params.page}&limit=${params.perPage}&stuClass=${params.stuClass}`
                )
                .then((res) => setdata(res.data.data));
        },
        [params.page, params.perPage, params.stuClass, params.subName]
    );

    console.log(data)
    //for search the student data by student first name
    const handleSearch = (search) => {
        axios.get(`http://localhost:5000/student/search?firstName=${search}`)
            .then((res) => setdata(res.data));
    }

    //for pagination pages count
    let totalPages = Math.ceil(temp.length / params.perPage);
    let currentPage = params.page
    let firstPage = 1
    console.log(currentPage)

    //for delete the student data
    const handleDelete = (id) => {
        dispatch(deleteStudent({ id }))
    }

    useEffect(() => {
        if (isDelete) {
            alert("Deleted Successfully")
            dispatch(handleState())
            window.location.reload()
        }
    }, [isDelete, dispatch, history])

    const handleChange = (e) => {
        setParams({ ...params, [e.target.name]: e.target.value });
    };

    return (
        <Grid container className={classes.root} spacing={2} justify="center">
            <Grid item container lg={12} className={classes.mainGrid}>

                {/* search box */}
                <Grid item container lg={3} justify="center">
                    <div className="row p-1 sticky-top bg-white" style={{ height: "60px", width: "80%" }}>
                        <div className="border  px-3 searchBox rounded-pill bg-light">
                            <input type="text" className="col-8 input ml-2 mt-1 bg-light" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by Name" />
                        </div>
                        <div className="col-2">
                            <i className="fa fa-search icon h4 text-muted button" onClick={() => handleSearch(search)} aria-hidden="true"></i>
                        </div>
                    </div>
                </Grid>

                <Grid item container lg={1}></Grid>

                {/* filter data by student class */}
                <Grid item container lg={6}>
                    <Grid container item lg={2} sm={2} xs={2}>
                        <h4>Filter:</h4>
                    </Grid>
                    <Grid container item lg={5} sm={5} xs={10}>
                        <FormControl variant="outlined" className={classes.formControl}>
                            <InputLabel id="demo-simple-select-outlined-label">by class</InputLabel>
                            <Select
                                labelId="demo-simple-select-outlined-label"
                                name="stuClass"
                                onChange={handleChange}
                                label="type"
                                value={params.stuClass}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value="12">12th</MenuItem>
                                <MenuItem value="11">11th</MenuItem>
                                <MenuItem value="10">10th</MenuItem>
                                <MenuItem value="9">9th</MenuItem>
                                <MenuItem value="8">8th</MenuItem>
                                <MenuItem value="8">8th</MenuItem>
                                <MenuItem value="6">6th</MenuItem>
                                <MenuItem value="5">5th</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    {/* filter data by subject */}
                    <Grid container item lg={5} sm={5} xs={10}>
                        <FormControl variant="outlined" className={classes.formControl}>
                            <InputLabel id="demo-simple-select-outlined-label">by Subject</InputLabel>
                            <Select
                                labelId="demo-simple-select-outlined-label"
                                name="subName"
                                onChange={handleChange}
                                label="type"
                                value={params.subName}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value="Math">Math</MenuItem>
                                <MenuItem value="English">English</MenuItem>
                                <MenuItem value="Science">Science</MenuItem>
                                <MenuItem value="Social Science">Social Science</MenuItem>
                                <MenuItem value="Hindi">Hindi</MenuItem>
                                <MenuItem value="Computer">Computer</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>

                {/* for add the data button*/}
                <Grid item container lg={2} justify="center">
                    <Link to={`/student`} className={classes.link}>
                        <Button variant="contained" color="dark">
                            Add More Data
                        </Button>
                    </Link>
                </Grid>
            </Grid>

            {/* for populating the student data */}
            <Grid item xs={12}>
                <div className="row d-flex flex-column">
                    <h1> Students Details</h1>
                    <div className="mx-auto justify-content-center ">
                        {
                            data.length > 0 ? (
                                data.map((item) => (
                                    <div key={item._id} style={{ border: "4px solid grey", marginBottom: "10px" }}>
                                        <div className="row d-flex mx-auto p-3  bg-primary text-white">
                                            <span className="flex-1 font-weight-bold ml-5">Id : {item.id}</span>
                                            <span className="flex-1 font-weight-bold ml-5">First Name : {item.firstName}</span>
                                            <span className="flex-1 font-weight-bold ml-5">Last Name : {item.lastName}</span>
                                            <span className="flex-1 font-weight-bold ml-5">Class : {item.stuClass}th</span>
                                        </div>
                                        <h3>Subject Details</h3>
                                        <table className="table">
                                            <thead className="bg-dark text-white">
                                                <tr>
                                                    <th scope="col">Sub Name</th>
                                                    <th scope="col">Marks</th>
                                                </tr>
                                            </thead>
                                            {item.subject.length > 0 ? (
                                                item.subject.map((a) => (
                                                    <tbody>
                                                        <tr>
                                                            <td>{a.subName}</td>
                                                            <td>{a.marks}</td>
                                                        </tr>
                                                    </tbody>
                                                ))

                                            ) : "No Subject Available"}
                                        </table>

                                        <div className="row mb-3">
                                            <div className="col">
                                                <Link to={`/edit/${item._id}`} data={item} className={classes.link}>
                                                    <Button variant="contained" color="dark">
                                                        Edit</Button>
                                                </Link>
                                            </div>
                                            <div className="col">
                                                <button className="btn btn-danger px-5" onClick={() => handleDelete(item._id)}>Delete</button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : "No Student Available"}
                    </div>
                </div>

                {/* pagination buttons */}
                <Grid item container lg={12} justify="center">
                    <Button
                        className={classes.mainGrid}
                        variant="contained"
                        style={{ marginLeft: '10px', borderRadius: "50%", outline: "none" }}
                        disabled={firstPage == currentPage}
                        color="secondary"
                        onClick={(e) => setParams({ ...params, page: currentPage - 1 })}

                    >
                        <i class="fa fa-caret-left" style={{ fontSize: "25px" }} aria-hidden="true"></i>
                    </Button>
                    <Button
                        className={classes.mainGrid}
                        variant="contained"
                        style={{ marginLeft: '10px', borderRadius: "50%", outline: "none" }}
                        color="primary"
                        onClick={(e) => setParams({ ...params, page: currentPage })}
                    >
                        {currentPage}
                    </Button>
                    <Button
                        className={classes.mainGrid}
                        variant="contained"
                        style={{ marginLeft: '10px', borderRadius: "50%", outline: "none" }}
                        color="primary"
                        onClick={(e) => setParams({ ...params, page: currentPage + 1 })}
                    >
                        {currentPage + 1}
                    </Button>
                    <Button
                        className={classes.mainGrid}
                        variant="contained"
                        style={{ marginLeft: '10px', borderRadius: "50%", outline: "none" }}
                        color="primary"
                        onClick={(e) => setParams({ ...params, page: currentPage + 2 })}
                    >
                        {currentPage + 2}
                    </Button>
                    <Button
                        className={classes.mainGrid}
                        variant="contained"
                        style={{ marginLeft: '10px', borderRadius: "50%", outline: "none" }}
                        color="secondary"
                        disabled={totalPages == currentPage}
                        onClick={(e) => setParams({ ...params, page: currentPage + 1 })}

                    >
                        <i class="fa fa-caret-right" style={{ fontSize: "25px" }} aria-hidden="true"></i>
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    );
}


