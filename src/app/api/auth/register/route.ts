export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()
  } catch (error) {
    console.log("[####] [api/auth/register] route.ts")
    console.log(error)
  }
}
