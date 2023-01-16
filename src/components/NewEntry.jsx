import React, { useState } from "react"
import { useParams} from "react-router-dom"

const NewEntry = ({ addEntry }) => {
  const { category } = useParams()
  const [entry, setEntry] = useState('')

  function submit(evt) {
    evt.preventDefault()
    addEntry(category, entry)
  }
    // const id = entries.length  // use the length to define which id number is.
    // // Add a new entry
    // const newEntry = {
    //   category: category,
    //   content: entry
    // }
    // // new array. below.
    // setEntries([...entries, newEntry])
    // // it will nav you to the page of the id automatically after posted.
    // nav(`/entry/${id}`)
  

  return (
    <>
      <h2>New Entry in {category} category</h2>
      <form onSubmit={submit} className="container">
        <div>
          <textarea value={entry} onChange={(evt) => setEntry(evt.target.value)} rows="10" className="form-control"></textarea>
        </div>
        <button className="btn btn-primary mt-2">Create Entry</button>
      </form>
    </>
  )
}

export default NewEntry
