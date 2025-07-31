import { Box, Button, Typography } from '@mui/material'
import React from 'react'

export const Home = () => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100%',
        backgroundImage: 'url("https://wallpaperaccess.com/full/4839516.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          paddingTop: '10vh',
          color: 'white',
          zIndex: 1,
        }}
      >
        <Box  sx={{ position: 'relative', width: 300  }}>
          <img
            src="https://as1.ftcdn.net/v2/jpg/08/01/95/18/1000_F_801951813_nXwdz5fjWMLMikTyPNV1DMjZiJCZZxVB.jpg"
            alt="Film reel"
            style={{
              width: '100%',
              height: 'auto',
              display: 'block',
              filter: 'drop-shadow(0 0 100px black)',
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '90%',
              textAlign: 'center',
              textShadow: '2px 2px 8px rgba(0,0,0,0.8)',
            }}
          >
            <Typography variant="h2" component="h1" sx={{ fontWeight: 'bold' }}>
              Reviewdle
            </Typography>
            <Typography variant="subtitle1" sx={{ mt: 1 }}>
              The movie review guessing game
            </Typography>
          </Box>
        </Box>

        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 4 }}
        >
          Play now!
        </Button>
      </Box>
    </Box>
  )
}
