import React from 'react'
import { Link } from "react-router-dom"


const Home = ( {entries}) => {
  return (
    <>
      <h2>Journal Entries</h2>
      {/* remember, MUST BE USE {} as in JSX  */}
      {entries.map((entry, index) => (
        // key means if there are any changes, then only need to change one. More efficient
      <p key={index}>
        <Link to={`entry/${index}`}>{entry.content} </Link>
        {/* why dont use <a> because <a> is a hyper link tag, <link> is not. */}
      </p>
      ))}
    </>
  )
}

export default Home