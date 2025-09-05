import { Box, CircularProgress } from '@mui/material';
import React from 'react'
import GameForm from '~/components/reviewdle/GameForm';

import { Route } from '~/routes/reviewdle/admin/edit/$gameId'

const EditGame = async () => {
    const game = Route.useLoaderData();
    console.log(game)
    if (!game) {
        // optional: show a loading state until the loader finishes
        return <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh", // full viewport height
        }}
      >
        <CircularProgress size={60} thickness={4} />
      </Box>
      }
  return (
    
    <GameForm game={game}></GameForm>
  )
}

export default EditGame