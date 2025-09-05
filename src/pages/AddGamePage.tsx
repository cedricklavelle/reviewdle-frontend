import { useSearch } from '@tanstack/react-router';
import React from 'react'
import GameForm from '~/components/reviewdle/GameForm'


const AddGamePage = () => {
    const { date } = useSearch({ from: '/reviewdle/admin/add' });
  return (
    <GameForm date={date}></GameForm>
  )
}

export default AddGamePage