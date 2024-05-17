import React from 'react'
import Container from '@mui/material/Container';
import { isAdmin, isLoggedIn } from '../services/AuthService';


export default function Dashboard() {

  console.log("isAdmin-", isAdmin() )

  return (
    <Container>
        <h2> Dashboard </h2>
    </Container>
  )
}
