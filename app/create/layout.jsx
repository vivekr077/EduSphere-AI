import React from 'react'
import DashboardHeader from '../dashboard/_components/DashboardHeader'

const CreateLayout = ({children}) => {
  return (
    <div>
      <DashboardHeader />
      {children}
    </div>
  )
}

export default CreateLayout


