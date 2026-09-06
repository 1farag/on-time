"use client";

import { Button, Col, Row } from "antd";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Typewriter from "typewriter-effect";
import { easeOutExpo, fadeUp, stagger } from "../motion";

export const HeroSection = () => {
  const router = useRouter();

  return (
    <section
      className="relative min-h-screen mb-10 md:mb-0 flex items-center overflow-hidden mt-[135px] md:mt-0"
      id="hero"
    >
      <motion.div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/hero-bg.png')" }}
        initial={{ scale: 1.12, opacity: 0.7 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2.2, ease: easeOutExpo }}
      />

      <div className="container relative z-10">
        <Row gutter={[32, 32]} align="bottom">
          <Col xs={24} md={13}>
            <motion.div
              className="flex flex-col items-start gap-8"
              variants={stagger}
              initial="hidden"
              animate="visible"
            >
              <motion.div
                className="flex items-center gap-4"
                variants={fadeUp}
                transition={{ duration: 0.8, ease: easeOutExpo }}
              >
                <motion.span
                  className="h-px bg-primary"
                  initial={{ width: 0 }}
                  animate={{ width: 48 }}
                  transition={{ duration: 0.9, delay: 0.25, ease: easeOutExpo }}
                />
                <p className="text-primary uppercase tracking-[0.35em] text-xs">
                  Luxury Development • Trusted Management
                </p>
              </motion.div>

              <motion.div
                variants={fadeUp}
                transition={{ duration: 0.8, ease: easeOutExpo }}
                dir="ltr"
                className="text-5xl md:text-6xl font-bold leading-tight min-h-[200px] md:min-h-[220px]"
              >
                <Typewriter
                  options={{
                    loop: true,
                    delay: 70,
                    deleteSpeed: 40,
                    cursor: "|",
                  }}
                  onInit={(typewriter) => {
                    typewriter
                      .typeString(
                        '<span class="block text-white mb-6 mt-4">Transforming Ideas Into</span>'
                      )
                      .typeString(
                        '<span class="block text-primary">Digital Reality.</span>'
                      )
                      .pauseFor(1800)
                      .deleteAll(40)
                      .pauseFor(500)
                      .start();
                  }}
                />
              </motion.div>

              <motion.p
                className="text-white text-xl md:text-xl leading-relaxed font-light"
                variants={fadeUp}
                transition={{ duration: 0.8, ease: easeOutExpo }}
              >
                We are a Saudi Company working on a new Generation of Business.
                <br />
                By keeping up with a new technology and managing working Time.
              </motion.p>

              <motion.div
                variants={fadeUp}
                transition={{ duration: 0.8, ease: easeOutExpo }}
              >
                <motion.div
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    type="primary"
                    className="!rounded-full !h-14 !px-10"
                    onClick={() => router.push("/projects")}
                  >
                    Explore Projects
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>
          </Col>
          <Col xs={24} md={11}>
            <motion.div
              initial={{ opacity: 0, x: 56, scale: 0.96 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 1, delay: 0.35, ease: easeOutExpo }}
            >
              <motion.div
                animate={{ y: [0, -14, 0] }}
                transition={{
                  duration: 5.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Image
                  src={"/images/hero-main-image.png"}
                  width={495}
                  height={368}
                  objectFit="cover"
                  alt="A place for restless innovators"
                />
              </motion.div>
            </motion.div>
          </Col>
        </Row>
      </div>
    </section>
  );
};
