import { pgTable, primaryKey, uuid } from "drizzle-orm/pg-core";
import { createdAt, updatedAt } from "../schemaHelpers";
import { UserTable } from "./user";
import { CourseTable } from "./course";
import { relations } from "drizzle-orm";

export const UserCourseAccessTable = pgTable(
  "user_course_access",
  {
    createdAt,
    updatedAt,
    userId: uuid()
      .notNull()
      .references(() => UserTable.id, { onDelete: "cascade" }),
    courseId: uuid()
      .notNull()
      .references(() => CourseTable.id, { onDelete: "cascade" }),
  },
  (t) => [primaryKey({ columns: [t.userId, t.courseId] })]
);

export const UserCourseActionRelationships = relations(
  UserCourseAccessTable,
  ({ one }) => ({
    user: one(UserTable, {
      fields: [UserCourseAccessTable.userId],
      references: [UserTable.id],
    }),
    course: one(CourseTable, {
      fields: [UserCourseAccessTable.courseId],
      references: [CourseTable.id],
    }),
  })
);
