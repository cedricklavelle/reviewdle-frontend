import { createFileRoute } from '@tanstack/react-router'
import AddGame from '~/pages/AddGame'

export const Route = createFileRoute('/reviewdle/admin/add')({
  component: AddGame,
})

