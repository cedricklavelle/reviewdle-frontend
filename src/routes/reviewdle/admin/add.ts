import { createFileRoute } from '@tanstack/react-router'
import AddGamePage from '~/pages/AddGamePage'

export const Route = createFileRoute('/reviewdle/admin/add')({
  component: AddGamePage,
})

