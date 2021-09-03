import { Fragment } from "react";
import { useRouter } from "next/router";

export default function SingleCategory() {
  const router = useRouter();

  const courseCategory = router.query.singleCategory;

  return <div>This is {courseCategory} category</div>;
}
