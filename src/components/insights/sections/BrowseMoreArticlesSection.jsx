"use client";

import { Col, Row } from "antd";
import Image from "next/image";
import Link from "next/link";
import { Pagination } from "antd";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLocalizedLink } from "@/hooks/useLocalizedLink";

gsap.registerPlugin(ScrollTrigger);

export const BrowseMoreArticlesSection = ({ articles, total, currentPage }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const articlesRef = useRef();
  const pathname = usePathname();
  const getLink = useLocalizedLink();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".article-card", {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: articlesRef.current,
          start: "top 80%",
        },
      });
    }, articlesRef);

    return () => ctx.revert();
  }, []);

  if (!articles || articles.length === 0) return null;

  return (
    <section className="browse-more-articles-section" id="latest-article">
      <div className="container">
        <div className="content">
          <h3>Browse more articles</h3>
          <p>
            Discover expert insights, practical advice, and emerging trends in
            entrepreneurship and innovation to help you grow and lead with
            confidence.
          </p>
        </div>

        <div className="articals" ref={articlesRef}>
          <Row gutter={[32, 32]}>
            <Col xs={24} md={12}>
              <div className="article-card main-card">
                <h4>{articles[0]?.title?.en}</h4>
                <p>{articles[0]?.description?.en}</p>

                <Link
                  href={getLink(`/insights/${articles[0]?.id}`)}
                  className="read-more"
                >
                  Learn more
                </Link>
                {articles[0]?.cover_image_url && (
                  <div className="relative h-[288px] w-full overflow-hidden">
                    <Image
                      src={articles[0]?.cover_image_url}
                      fill
                      objectFit="cover"
                      alt={articles[0]?.title?.en}
                    />
                  </div>
                )}
              </div>
            </Col>

            <Col xs={24} md={12}>
              <Row gutter={[32, 32]}>
                {articles?.slice(1, 3)?.map((article) => (
                  <Col xs={24} sm={24} key={article.id}>
                    <div className="article-card">
                      <h4>{article?.title?.en}</h4>
                      <p>{article?.description?.en}</p>

                      <Link
                        href={getLink(`/insights/${article?.id}`)}
                        className="read-more"
                      >
                        Learn more
                      </Link>
                    </div>
                  </Col>
                ))}
              </Row>
            </Col>

            {articles?.slice(3)?.map((article) => (
              <Col xs={24} md={12} key={article.id}>
                <div className="article-card">
                  <h4>{article?.title?.en}</h4>
                  <p>{article?.description?.en}</p>
                  <Link
                    href={getLink(`/insights/${article?.id}`)}
                    className="read-more"
                  >
                    Learn more
                  </Link>
                </div>
              </Col>
            ))}
          </Row>
        </div>

        {total > 15 && (
          <div className="pagination-wrapper">
            <Pagination
              current={currentPage}
              total={total}
              pageSize={15}
              showSizeChanger={false}
              onChange={(page) => {
                const params = new URLSearchParams(searchParams.toString());
                params.set("page", page.toString());
                router.push(`${pathname}?${params.toString()}`, {
                  scroll: false,
                });

                articlesRef.current?.scrollIntoView({ behavior: "smooth" });
              }}
            />
          </div>
        )}
      </div>
    </section>
  );
};
