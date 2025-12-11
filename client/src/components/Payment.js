import React from 'react'

const Payment = () => {
  return (
    <div>
        <div className='container'>
            <div className='row'>
            <h1><u>Give Payment</u></h1>
            <div className='col-lg-6'>
            <form>
    
            <div className='mt-3 mb-3'>
                <label>Order id</label>
                <input type='text' name='order_id' className='form-control w-50 border border-1 border-success'/>
            </div>

            <div className='mt-3 mb-3'>
                <label>User id</label>
                <input type='text' name='userid' className='form-control w-50 border border-1 border-success'/>
            </div>

            <div className='mt-3 mb-3'>
                <label>Paid Date</label>
                <input type='text' name='paid_date' className='form-control w-50 border border-1 border-success'/>
            </div>

            <div className='mt-3 mb-3'>
                <label>Amount</label>
                <input type='text' name='amount' className='form-control w-50 border border-1 border-success'/>
            </div>

            <div className='mt-3 mb-3'>
                <button className='btn btn-success w-50' type='submit' >SUBMIT</button>
            </div>
            </form>
            </div>
      </div>
    </div>
    </div>
  )
}

export default Payment