import { redirect, useRouter } from "next/navigation"
import { destroyCookie, parseCookies } from "nookies"
export default function Dashboard() {
  const { 'token': token } = parseCookies()
  if (!token) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return (
    <>
      <h1>Lucas</h1>
      {/* <button onClick={ }>Deslogar</button> */}
    </>
  )
}