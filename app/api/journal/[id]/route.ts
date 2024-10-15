import { getUserByClerkID } from "@/utils/auth"
import { prisma } from "@/utils/db"
import { revalidatePath } from "next/cache"
import { NextResponse } from "next/server"
import { analyz } from "@/utils/ai"

export const PATCH = async (request: Request, { params }) => {
    const { content } = await request.json()

    const user = await getUserByClerkID()
    const updatedEntry = await prisma.journalEntry.update({
        where: {
            userId_id: {
                userId: user.id,
                id: params.id
            }
        },
        data: {
            content: content
        },
        include:{
            analysis: true
        }
    })

    const analyis = await analyz(updatedEntry.content)

    const updated= await prisma.analysis.upsert({
        where: {
            entryId: updatedEntry.id
        },
        create: {
            userId: user.id,
            entryId: updatedEntry.id,
            ...analyis
        },
        update: analyis

    })
    //revalidatePath(`/journal/${updatedEntry.id}`)
    return NextResponse.json({ data: {...updatedEntry, analysis: updated } })
}