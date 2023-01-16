import React from 'react'


// const ShowEntry = ( { entry }) => {
// didn't use entry, use entries instead, because allow SHownEntry can access all the entries and show in to the url
const ShowEntry = ( { entry }) => {


//   const { id } = useParams()
//   const entry = entries[id]

  return (
    <>
        <h5>{entry.content}</h5>
        <p>Posted in {entry.category.name} </p>
    </>
  )
}

export default ShowEntry