
import {useState, useEffect} from 'react';
import axios from "axios"


export default function App() {

    const[courses, setCourses] = useState([])
    const[file, setFile] = useState(null)



    const handleSubmit = async (event) => {
        setFile(event.target.files[0])

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
        } catch (error) {
            console.error('Error uploading')
        }
        console.log(courses)
    }




    // const fetchAPI = async ()=>  {
    //     const response = await axios.get("http://localhost:8080/courses", )
    //     setCourses(response.data.courses)
        
    // };

    // useEffect(() => {
    //     fetchAPI()
    // }, [])

    console.log(courses)

    return( <div>

        <div>
            <form>
                <input type = "file" accept =".pdf" onChange = {handleSubmit}></input>

            </form>
            </div>    

        {courses.map((course, index) => (

            <div><span key= {index}>{course}</span>
            <br></br> </div>
        ))}


    </div> )

}