import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Admin Page",
};

const Adminpage = () => {
  return (
    <div>
      ADMIN <br />
      <Link href="/admin/students">Students</Link>
    </div>
  );
};

export default Adminpage;
