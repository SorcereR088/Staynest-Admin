import React, { useState } from 'react'
import PendingProperties from './pendingProperties';
import AllProperties from './AllProperties';


const Properties = () => {

  const [activeTab, setActiveTab] = useState('pending');

  const handlePendingPropertiesCLick = () => {
    setActiveTab('pending');
  }

  const handleallPropertiesClick = () => {
    setActiveTab("all")
  }

  return (
    <div>
       <div className="px-4 py-4">
      <h2 className="text-[30px] font-bold mb-4">Properties</h2>
      <div className='flex gap-4 mb-0'>
        <button className='text-orange-500 font-bold text-sm hover:text-orange-700' onClick={handlePendingPropertiesCLick}>Pending Properties</button>
        <button className='text-green-500 font-bold text-sm hover:text-green-700' onClick={handleallPropertiesClick}>All Properties</button>
      </div>
    </div>

    {activeTab === 'pending' ? (
        <PendingProperties />  // Display All Properties
      ) : (
        <AllProperties/>  // Display Pending Properties
      )}
    </div>
  )
}

export default Properties
