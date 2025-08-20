import React, { useEffect } from 'react'

const HomePage = () => {

    const getUser =  ()=>{
        fetch("/api/users")
        .then(res => res.json())
        .then(json => console.log(json))
    }


    useEffect(()=>{
        getUser();
    },[])

  return (
    <div>HomePage</div>
  )
}

export default HomePage