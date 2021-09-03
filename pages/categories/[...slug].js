import { Fragment } from "react";
import { useRouter } from "next/router";

export default function ChosenCourse() {
  const router = useRouter();

  const chosenCourse = router.query.slug;

  return <div>This is {chosenCourse} course</div>;
}
