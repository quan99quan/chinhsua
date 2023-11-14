import React, { useEffect } from 'react'
import User from './components/users/User'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios';
import { userAction } from './store/slices/user.slice';
export default function App() {
  const dispatch = useDispatch();
  const store = useSelector(state => state);

  useEffect(() => {
    axios.get("http://localhost:3000/users")
    .then(res => {
      console.log("res", res)
      if(res.status === 200) {
        dispatch(userAction.setList(res.data))
      }else {
        // xu ly loi => goi duoc nhung bi tu choi
      }
    })
    .catch(err => {
      // xu ly loi => khong goi duoc api
    })
  }, [])
  return (
    <div>
      <h2>App</h2>
      <User dispatch={dispatch}/>
    </div>
  )
}
