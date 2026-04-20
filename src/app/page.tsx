import { auth } from '@/auth'
import EditRoleMobile from '@/Components/EditRoleMobile'
import Nav from '@/Components/Nav'
import connectDb from '@/lib/db'
import User from '@/models/user.model'
import { redirect } from 'next/dist/server/api-utils'
import React from 'react'

async function Home() {
  await connectDb()
  const session = await auth()

  const user = await User.findById(session?.user?.id)

  if(!user) {
    redirect('/login')
  }

  const inComplete= !user.mobile || !user.role || (!user.mobile && user.role == "user")

  if(inComplete) {
    return <EditRoleMobile />
    }

    const plainUser = JSON.parse(JSON.stringify(user))

  return (
    <>
      <Nav user={plainUser} />
    </>
  )
}

export default Home
