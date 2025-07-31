import { createFileRoute } from '@tanstack/react-router'
import AddGame from '~/pages/AddGame'

export const Route = createFileRoute('/daily/add')({
  component: AddGame,
})

