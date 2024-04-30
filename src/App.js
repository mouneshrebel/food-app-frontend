import React, { useEffect } from 'react'
import Headers from './component/Headers'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import {setDataProduct} from './redux/ProductSlice'
import { useDispatch } from 'react-redux';

const App = () => {

  const dispatch = useDispatch();
  // const ProductData = useSelector((state) => state.product)

  useEffect(() => {
    ( async () => {
      const responseData = await fetch(`${process.env.REACT_APP_SERVER}users/product`) 
      const resData = await responseData.json()
      dispatch(setDataProduct(resData))
    })()
  },[dispatch])

  
  
  return (
    <>
    <ToastContainer />
    <div>
     <Headers/>
     <main className='bg-slate-100 min-h-[calc(100vh)]'>
      <Outlet/>
     </main>
    </div>
    </>

  )
}

export default App
