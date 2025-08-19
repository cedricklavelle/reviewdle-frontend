import { createFileRoute } from '@tanstack/react-router'
import AdminCalendar from '~/pages/AdminCalendar'

export const Route = createFileRoute('/reviewdle/admin/')({
  component: AdminCalendar,
})
