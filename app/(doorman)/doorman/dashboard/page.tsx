import { redirect } from "next/navigation";

export default function Doorman() {
  redirect("/doorman/dashboard/check-ticket");
}
