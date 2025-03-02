import { pgTable, text } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm/relations";
import { createdAt, id, updatedAt } from "../schemaHelpers";
import { CourseProductTable } from "./courseProduct";
import { UserCourseAccessTable } from "./userCourseAccess";

export const CourseTable = pgTable("courses", {
  id,
  name: text().notNull(),
  description: text().notNull(),
  createdAt,
  updatedAt,
});

export const CourseRelationships = relations(CourseTable, ({ many}) => ({
    courseProduct: many(CourseProductTable),
    userCourseAccess: many(UserCourseAccessTable)
}));
