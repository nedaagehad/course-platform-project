import { integer, jsonb, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt } from "../schemaHelpers";
import { UserTable } from "./user";
import { ProductTable } from "./product";
import { relations } from "drizzle-orm";

export const PurchaseTable = pgTable("purchases", {
  id,
  userId: uuid()
    .notNull()
    .references(() => UserTable.id, { onDelete: "restrict" }),
  productId: uuid()
    .notNull()
    .references(() => ProductTable.id, { onDelete: "restrict" }),
  productDetails: jsonb()
    .notNull()
    .$type<{ name: string; description: string; imageUrl: string }>(),
    pricePaidInCents: integer().notNull(),
    stripeSessionId: text().notNull().unique(),
    createdAt,
    updatedAt,
    refundedAt: timestamp({ withTimezone: true }),
});

export const PurchaseRelationships = relations(PurchaseTable, ({ one }) => ({
    user: one(UserTable, {
        fields: [PurchaseTable.userId],
        references: [UserTable.id],
    }),
    product: one(ProductTable, {
        fields: [PurchaseTable.productId],
        references: [ProductTable.id],
    })
}))
