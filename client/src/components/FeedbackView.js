import React, { useEffect, useState } from 'react'
import axios from 'axios'

const FeedbackView = () => {
    const [FeedbackData,setFeedbackData] = useState([])
    useEffect(()=>{
        getFeedback()
    },[])

    const DelFeedback = id =>{
        axios.delete(`http://localhost:3001/delfeedback/${id}`)
        .then(Response=>{
            alert("Deleted Succesfully")
            getFeedback()
        })
    }

    const getFeedback= async() => {
        try{
            const result= await axios.get("http://localhost:3001/viewfeedback")
            setFeedbackData(result.data)
        }
        catch(error){
            console.error("Error fetching feedback",error)
        }   
    }
  return (
    <div className="container mt-4 mb-5">
      <div className="row">
        <div className="col-12">
          <h2 className="mb-4">Feedback Details</h2>
          <div className="table-responsive">
            <table className="table table-bordered table-striped table-hover">
              <thead className="table-dark">
                <tr>
                  <th>#</th>
                  <th>User Id</th>
                  <th>About Product</th>
                  <th>About Service</th>
                  <th>Comments</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {FeedbackData.length > 0 ? (
                  FeedbackData.map((data, index) => (
                    <tr key={data.id}>
                      <td>{index + 1}</td>
                      <td>{data.userid}</td>
                      <td>{data.about_product}</td>
                      <td>{data.about_service}</td>
                      <td>{data.comments}</td>
                      <td className="text-center">
                        <button 
                          className="btn btn-danger btn-sm" 
                          onClick={() => DelFeedback(data.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center text-muted">No feedback found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FeedbackView