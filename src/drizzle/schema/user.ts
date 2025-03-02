import { pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt } from "../schemaHelpers";
import { relations } from "drizzle-orm";
import { UserCourseAccessTable } from "./userCourseAccess";
import { UserLessonCompleteTable } from "./userLessonComplete";

export const userRoles = ["admin", "user"] as const;
export type UserRole = typeof userRoles[number];
export const userRolesEnum = pgEnum("user_roles", userRoles)


export const UserTable = pgTable("users", {
    id,
    clerkUserId: text().notNull().unique(),
    name: text().notNull(),
    email: text().notNull().unique(),
    imageUrl: text(),
    role: userRolesEnum().notNull().default("user"),
    createdAt,
    updatedAt,
    deletedAt: timestamp({ withTimezone: true }),
})

export const UserRelationships = relations(UserTable, ({ many }) => ({
    userCourseAccess: many(UserCourseAccessTable),
    userLessonComplete: many(UserLessonCompleteTable)
}));