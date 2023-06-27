import { getAuthSession } from "@/lib/auth"
import { db } from "@/lib/db"
import { UserNameValidator } from "@/lib/validators/username"
import { z } from "zod"

export async function PATCH(req: Request) {
  try {
    const session = await getAuthSession()

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 })
    }

    const body = await req.json()

    const { name } = UserNameValidator.parse(body)

    const username = await db.user.findFirst({
      where: {
        username: name,
      },
    })

    if (username) {
      return new Response("Username already taken", { status: 409 })
    }

    // Update username
    await db.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        username: name,
      },
    })

    return new Response("OK")
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response("Invalid request data passed", { status: 422 })
    }

    return new Response("Cound not update username, please try again later", {
      status: 500,
    })
  }
}