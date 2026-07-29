"use client";

import { Col, Row } from "antd";
import style from "./style/home.module.scss";
import { LoaderS1 } from "@/components/tools/loaders/LoaderS1";
import Link from "next/link";

export const HomeComponent = () => {
  // const { data: courses, isLoading } = useGetCourses();

  // if (isLoading) {
  //   return <LoaderS1 />;
  // }

  return (
    <main className={`${style.dashboard} px-6`}>
      <h1 className="mb-20 text-center text-5xl font-bold text-secondary">
        Home Page
      </h1>
      {/* <Row gutter={[50, 50]} justify="center"> */}
      {/* {courses?.map((item: CourseType) => (
          <Col xs={24} lg={12} xl={8} key={item.id}>
            <Link href={`/admin/courses/${item.id}`}>
              <div className="card relative flex min-h-[215px] w-full flex-col items-center justify-between gap-10 rounded-3xl px-10 py-6">
                <h4 className="text-center text-4xl font-bold leading-[1.5] text-white">
                  {item.name}
                </h4>
                <p className="w-fit rounded-2xl bg-white px-8 py-4 text-4xl font-bold text-primary">
                  {item.number_of_students}
                </p>
              </div>
            </Link>
          </Col>
        ))} */}
      {/* </Row> */}
    </main>
  );
};
