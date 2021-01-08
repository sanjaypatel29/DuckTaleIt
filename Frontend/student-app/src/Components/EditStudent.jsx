import React from 'react'
import { useState } from 'react'
import { useHistory } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { editStudent, handleState } from '../Redux/actions'
import { useEffect } from 'react'
export const EditStudent = (data) => {
    const [id, setId] = useState(data.data.id)
    const [firstName, setFirstName] = useState(data.data.firstName)
    const [lastName, setLastName] = useState(data.data.lastName)
    const [stuClass, setStuClass] = useState(data.data.stuClass)
    let subject = data.data.subject
    const [subjectCount, setSubjectCount] = useState(subject.length)
    const history = useHistory()
    const isEdit = useSelector(state => state.app.isEdit)
    const dispatch = useDispatch()

    const editing = () => {
        let payload = {
            ...data.data,
            firstName,
            lastName,
            id,
            stuClass,
            subject
        }
        console.log(payload)
        dispatch(editStudent({ payload }))
    }

    const handleEditAdd = (obj, index) => {
        subject = subject.map((item, i) => i === index ? obj : item)
    }

    const addStudent = () => {
        let getSubject = []
        for (let i = 0; i < subjectCount; i++) {
            getSubject.push(<div key={i}><Subject onSubmit={handleEditAdd} data={subject[i]} i={i} /></div>)
        }
        return getSubject
    }

    const addMoreSubject = () => {
        setSubjectCount(subjectCount + 1)
        subject.push({ subName: "", marks: "" })
    }

    useEffect(() => {
        if (isEdit) {
            alert("student data edited Successfully!")
            dispatch(handleState())
            history.push("/")
        }
    }, [isEdit, dispatch, history])

    return (
        <div className="px-5 pt-4 container">
            <h3 className="text-center text-info">EditStudent Here</h3>
            <input className="form-control mb-3" type="text" value={id} onChange={e => setId(e.target.value)} placeholder="Enter id" />
            <input className="form-control mb-3" type="text" value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="Enter first Name" />
            <input className="form-control mb-3" type="text" value={lastName} onChange={e => setLastName(e.target.value)} placeholder="Enter last Name" />
            <select value={stuClass} onChange={e => setStuClass(e.target.value)} className="form-control mb-3" placeholder="Select Subject">
                <option value="">Choose Class</option>
                <option value="12">12th</option>
                <option value="11">11th</option>
                <option value="10">10th</option>
                <option value="9">9th</option>
            </select>

            <h5 className="text-info">Sujects</h5>
            {
                addStudent()
            }
            <div className="row text-center">
                <div className="col-4">
                    <button className="btn btn-info px-5" onClick={() => addMoreSubject()}>Add More Residents</button>
                </div>
                <div className="col-4">
                    <button className="btn btn-success px-5" onClick={() => editing()}>Update Change</button>
                </div>
                <div className="col-4">
                    <button className="btn btn-danger px-5" onClick={() => history.push("/")}>Cancel</button>
                </div>
            </div>
        </div>
    )
}

// function for edite the subject and marks 
function Subject({ onSubmit, data, i }) {
    const [subName, setSubName] = useState(data.subName)
    const [marks, setMarks] = useState(data.marks)

    const handleEdit = () => {
        if (subName === "" || marks === "") {
            alert("No field should be empty")
            return
        }
        let obj = { marks, subName }
        onSubmit(obj, i)
    }
    return (
        <div className="px-5">
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
            <button className="btn btn-primary mb-3" onClick={handleEdit}>update Student</button>
        </div>
    )
}
