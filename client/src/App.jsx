
import {useState, useEffect} from 'react';
import axios from "axios"
import './App.css'


export default function App() {

    const[courses, setCourses] = useState()
    const[file, setFile] = useState(null)
    const[notTaken, setNotTaken] = useState(null)

    const handleFileChange = (event) => {
        setFile(event.target.files[0])

    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        if (!file) {
            return ; 
        }
        

        const formData = new FormData();

        formData.append('file', file)


        try{
            const response = await axios.post("http://localhost:8080/upload", formData, {
                "Content-Type" : "multipart/form-data"
            })
            setCourses(response.data.courses)
            setNotTaken(response.data.not_taken)

        } catch (error) {
            console.error('Error uploading')
        }
        console.log(courses)
        console.log(notTaken)
    }

    console.log(courses)

    return( <div>

        <div className = "pdfSumbit" >
            <form onSubmit = {handleSubmit} className = "SubmitButton">
                <label className = "CustomFileUpload">
                <input type = "file" accept =".pdf" onChange = {handleFileChange} className = "ChooseFile"/>
                {!(file) &&
                <div>Choose File</div>
                }
                {file &&
                <div>
                    Received</div>}           
                
                </label>
                <div>
                    <button type = "submit">Upload</button>
                </div>


            </form>
        </div> 
        <div className = "coursesTaken">
        {courses && (
            <div>
            {Object.entries(courses).map(([semester, courseList]) =>
            
                <div key = {semester}> 
                    <h2>{semester}</h2>
                    <ul>
                        {courseList.map((course, index) =>
                        <li key = {index}>
                            {course}</li>)}
                    </ul>
                </div>
                )}
            </div>)}
            </div>

            <div className = "notTaken">
                <h3>Courses Not Taken</h3>
            {notTaken && (
            <div >
                <ul>
            {notTaken.map((course, index) =>(
                <li key = {index}>
                    {course[0]}
                </li>
                    
                ))}
                </ul>
            </div>)}


            </div>
            
                
        </div>
        
        
         )
        }

