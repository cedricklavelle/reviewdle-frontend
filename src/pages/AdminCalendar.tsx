import React from 'react'
import Calendar from '~/components/calendar/Calendar'

const AdminCalendar = () => {
  return (
    <Calendar isAdmin={true}></Calendar>
  )
}

export default AdminCalendar