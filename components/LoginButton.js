import { useSession, signIn, signOut } from "next-auth/react"
import { Button } from "react-bootstrap"

function LoginButton() {
  const { data: session } = useSession()
  if (session) {
    return (
      <>
        <div className="my-3">Signed in as {session.user.email}</div>
        <Button onClick={() => signOut()}>Sign out</Button>
      </>
    )
  }
  return (
    <>
      <div className="my-3">Not signed in</div>
      <Button onClick={() => signIn()}>Sign in</Button>
    </>
  )
}

export default LoginButton