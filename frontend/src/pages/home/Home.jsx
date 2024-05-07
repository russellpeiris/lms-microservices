import React from 'react'
import LearnerTable from '../../components/tables/LearnerTable'
import InstructorTable from '../../components/tables/InstructorTable'
import PaymentTable from '../../components/tables/PaymentTable'
import ApprovalTable from '../../components/tables/ApprovalTable'

const Home = () => {
  return (
    <div>
        <LearnerTable/>
        <InstructorTable/>
        <PaymentTable/>
        <ApprovalTable/>
    </div>
  )
}

export default Home