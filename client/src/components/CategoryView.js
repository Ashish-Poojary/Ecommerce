import React, { useEffect, useState } from 'react'
import axios from 'axios'

const CategoryView = () => {

    const [CategoryData, setCategoryData] = useState([]) 
    useEffect(()=>{ getCategory() 

    }, [])

    const DelCategory = id =>{
        axios.delete(`http://localhost:3001/delcategory/${id}`)
        .then(Response=>{
            alert("Deleted Successfully")
            getCategory()
        })
    }

    const getCategory= async() => {
        try{
            const result= await axios.get("http://localhost:3001/viewcategory") 
            setCategoryData(result.data) 
        }
    catch(error){
        console.error("Error fetching category",error)
    }
}

  return (
    <div className="container mt-4 mb-5">
      <div className="row">
        <div className="col-12">
          <h2 className="mb-4">Category Details</h2>
          <div className="table-responsive">
            <table className="table table-bordered table-striped table-hover">
              <thead className="table-dark">
                <tr>
                  <th>#</th>
                  <th>Category</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {CategoryData.length > 0 ? (
                  CategoryData.map((data, index) => (
                    <tr key={data.id}>
                      <td>{index + 1}</td>
                      <td>{data.category}</td>
                      <td className="text-center">
                        <button 
                          className="btn btn-danger btn-sm" 
                          onClick={() => DelCategory(data.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="text-center text-muted">No categories found</td>
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


export default CategoryView