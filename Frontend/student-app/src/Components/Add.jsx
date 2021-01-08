import React from 'react'
import { useState } from 'react'
import { useHistory } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { addStudent, handleState } from '../Redux/actions'
import { useEffect } from 'react'

export const Add = () => {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [id, setId] = useState("")
    const [stuClass, setStuClass] = useState("")
    const [subject, setSubject] = useState("0")
    const [subjectsData, setSubjectsData] = useState([])

    const history = useHistory()
    const dispatch = useDispatch()
    const isAdded = useSelector(state => state.app.isAdd)

    const handleCancel = () => {
        history.push("/")
    }

    const handleAdd = (obj) => {
        setSubjectsData([...subjectsData, obj])
        alert("Student Added!")
    }

    useEffect(() => {
        if (isAdded) {
            alert("Student Added Successfully!")
            dispatch(handleState())
            history.push("/")
        }
    }, [isAdded, dispatch, history])

    const handleSubmit = () => {
        let payload = { id, firstName, lastName, stuClass, subject: subjectsData }
        console.log(payload)
        dispatch(addStudent(payload))
    }

    const AddStudentsData = () => {
        let getSubjects = []
        for (let i = 0; i < subject; i++) {
            getSubjects.push(<div key={i}><subject onSubmit={handleAdd} /></div>)
        }
        return getSubjects
    }

    return (
        <div className="p-5" style={{ marginLeft: "300px" }}>
            <h3 className="text-center text-info mb-3">Add Student Here</h3>
            <input className="form-control mb-3" type="text" value={id} onChange={e => setId(e.target.value)} placeholder="Enter id" />
            <input className="form-control mb-3" type="text" value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="Enter first" />
            <input className="form-control mb-3" type="text" value={lastName} onChange={e => setLastName(e.target.value)} placeholder="Enter last name" />
            <select value={stuClass} onChange={e => setStuClass(e.target.value)} className="form-control mb-3">
                <option value="">Choose Class</option>
                <option value="12">12th</option>
                <option value="11">11th</option>
                <option value="10">10th</option>
                <option value="9">9th</option>
            </select>
            <h5 className="text-info">Residents</h5>
            <Residents onSubmit={handleAdd} />
            {
                AddStudentsData()
            }
            <div className="row text-center">
                <div className="col-4">
                    <button className="btn btn-info px-5" onClick={() => setSubject(subject + 1)}>Add More Subjects</button>
                </div>
                <div className="col-4">
                    <button className="btn btn-success px-5" onClick={handleSubmit}>Add Student Data</button>
                </div>
                <div className="col-4">
                    <button className="btn btn-danger px-5" onClick={handleCancel}>Cancel</button>
                </div>
            </div>
        </div>
    )
}

function Residents({ onSubmit, key }) {
    const [subName, setSubName] = useState("")
    const [marks, setMarks] = useState(0)

    const handleAdd = () => {
        let obj = { subName, marks }
        onSubmit(obj)
    }

    return (
        <div className="p-5">
            <select value={subName} onChange={e => setSubName(e.target.value)} className="form-control mb-3">
                <option value="">Choose Subject</option>
                <option value="Math">Math</option>
                <option value="English">English</option>
                <option value="Science">Science</option>
                <option value="Social Science">Social Science</option>
                <option value="Hindi">Hindi</option>
                <option value="Computer">Computer</option>
            </select>
            <input className="form-control mb-3" type="number" value={marks} onChange={e => setMarks(e.target.value)} placeholder="Marks" />
            <button className="btn btn-primary mb-3" onClick={handleAdd}>+</button>
        </div>
    )
}