import { canAccessAdminPage } from "@/app/permissions/general";
import { getCurrentUser } from "@/services/clerk";
import Link from "next/link";

export default async function AdminLink() {
  const user = await getCurrentUser();

  if (!canAccessAdminPage(user)) return null;

  return (
    <Link
      className="hover:bg-accent/10 hover:underline flex items-center px-2"
      href="/admin"
    >
      Admin
    </Link>
  );
}
