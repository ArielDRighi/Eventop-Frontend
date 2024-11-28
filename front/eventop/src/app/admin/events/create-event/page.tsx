

import CreateEvent from '@/components/CreateEvent'
import SideBar from '@/components/SideBar'
import React from 'react'

 const CreateEventPage  = () => {
  return (
    <section className="flex flex-col gap-2 mt-10">
        <SideBar/>
      <div>
        <CreateEvent/>
      </div>
      </section>
  )
}

export default CreateEventPage 
