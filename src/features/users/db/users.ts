import { db } from "@/drizzle/db";
import { UserTable } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

export async function insertUser(userData: typeof UserTable.$inferInsert) {
  const [newUser] = await db
    .insert(UserTable)
    .values(userData)
    .returning()
    .onConflictDoUpdate({
      target: [UserTable.clerkUserId],
      set: userData,
    });

    if (newUser == null) {
        throw new Error("Failed to create user!");
    }

    return newUser;
}

export async function updateUser(
  { clerkUserId }: { clerkUserId: string },
  userData: Partial<typeof UserTable.$inferInsert>
) {
  const [updatedUser] = await db
    .update(UserTable)
    .set(userData)
    .where(eq(UserTable.clerkUserId, clerkUserId))
    .returning();

    if (updatedUser == null) {
        throw new Error("Failed to update user!");
    }

    return updatedUser;
}

export async function deleteUser(
  { clerkUserId }: { clerkUserId: string },
) {
  const [deletedUser] = await db
    .update(UserTable)
    .set({ deletedAt: new Date(), name: "Deleted User", imageUrl: null })
    .where(eq(UserTable.clerkUserId, clerkUserId))
    .returning();

    if (deletedUser == null) {
        throw new Error("Failed to delete user!");
    }

    return deletedUser;
}
