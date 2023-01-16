import React, { useEffect, useState } from "react"
import Navbar from "./Navbar"
import CategorySelection from "./CategorySelection"
import Home from "./Home"
import NewEntry from "./NewEntry"
import {Routes, Route, useParams, useNavigate } from "react-router-dom"
import ShowEntry from "./ShowEntry"

// npm i -D vitest jsdom @testing-library/react @testing-library/react-hooks @testing-library/user-event @testing-library/jest-dom --legacy--peer-deps// npm i -D vitest jsdom @testing-library/react @testing-library/react-hooks @testing-library/user-event @testing-library/jest-dom --legacy--peer-deps

//npm i -D vitest jsdom @testing-library/react> production dependencies, development dependencies  -- download the vitest and implement the victual DOM
//@testing-library/react-hooks it's not a react package, it is a react package in part of testing-library only, also hooks as well
//@testing-library/user-event   , can simulate the user
//@testing-library/jest-dom   provide the glue between vitest and jsdom


// const seedEntries = [
//   { category: 'Food' , content: 'Pizza is good.'},
//   { category: 'Work' , content: 'Work for more money.'},
//   { category: 'Coding' , content: 'React is cool.'}
// ]

const App = () => {
  const [entries, setEntries] = useState([])
  const nav = useNavigate()
  const [categories, setCategories] = useState([])

  // this is quite different before, if not async function, use async the whole {}, it will break.
  useEffect(() => {
    async function fetchCategories() {
      const res = await fetch('http://journal-api-production-f87e.up.railway.app/categories')
      const data = await res.json()
      setCategories(data)
    }
    fetchCategories()
  }, [])

  //useEffect is good for mounting, otherwise the data you updated may different or can't update async.
  useEffect(() => {
    async function fetchEntries() {
      const res = await fetch('http://journal-api-production-f87e.up.railway.app/entries')
      const data = await res.json()
      setEntries(data)
    }
    fetchEntries()
  }, [])  //[] means anything in this array = if that thing change, useEffect will execute. can put more than one inside,  
          // Empty array means useEffect will no execute, only run for mount
          // it will show in internet console "Warning: useEffect must not return anything besides a function, which is used for clean-up."  It still works

  // HOC - higher-order components - can fix the ShowEntry, don't need to load the whole entires.
      // when we wrap, is a high priority order
  const SHownEntryWrapper = () => {
    const { id } = useParams()
    const entry = entries[id]
    // Means, if entry is truthy, then show entry=entry, otherwise show entry not found.
    return entry ? <ShowEntry entry={entry} /> : <h4> Entry not found!</h4>
    // property on the left, value on the right, entry={entry}
  }

  const addEntry = async (category, content) => {
    const id = entries.length  // use the length to define which id number is.

    // because categories is in another component, so we can't export or fetch again. the only way is lift up to be the parent component.
    // So we copy the useEffect in category selection to here below the app, and change the return category to categories=categories
    // and now we have 'category' on the above, so we can set, if the cat.name = category then can run this the new entry
    // const categoryObject = categories.find((cat => cat.name === category))
    // Add a new entry
    const newEntry = {
      category: category,
      content: content
    }
    
    // API
    // Post new entry to API (otherwise no saved data after refresh the website)
    const returnedEntry = await fetch('http://journal-api-production-f87e.up.railway.app/entries', {
      method: "POST",
      headers: {
          // ACCEPT: = it is for the server will pick up and know this is a json and pass it
          // Content-Type: is saying what type are sending.
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newEntry)
    })
    // need to put the returnEntry to active.
    const data = await returnedEntry.json()
    // new array. below.
    setEntries([...entries, data])
    // it will nav you to the page of the id automatically after posted.  nav URL
    nav(`/entry/${id}`)
  }

  

  return (
    // must use empty <> , because only can have one main <>, other are children 
    <>
      <Navbar />
      {/* in the routes , all Route must be children. */}
      <Routes>
        {/* those are website link.below... */}
        <Route path="/" element={<Home entries={entries} />} />
        <Route path="/category" element={<CategorySelection categories={categories}/>} />

          {/* but this is not a good way to solve the id, as we need to load the whole entires.
           because it's a dependencies and it will limits its reusability.*/}

          {/* <Route path="/entry/:id" element={<ShowEntry entries={entries} />} /> */}
        <Route path="/entry/:id" element={<SHownEntryWrapper />} />

        <Route path="/entry/new/:category" element={<NewEntry addEntry={addEntry} />} />
        <Route path="*" element={<h4>Page not found!</h4>} />
      </Routes>
    </>
  )
}

export default App
