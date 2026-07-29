import { Col, Row } from "antd";
import { NewsLetter_form } from "./forms/NewsLetter_form";
import { FiFacebook } from "react-icons/fi";
import { PiYoutubeLogo } from "react-icons/pi";
import { FaInstagram, FaXTwitter } from "react-icons/fa6";

export const NewsLetter = () => {
  const socialLinks = [
    // {
    //   href: "",
    //   icon: <FiFacebook />,
    // },
    {
      href: "https://x.com/tai1381ES ",
      icon: <FaXTwitter />,
    },
    // {
    //   href: "",
    //   icon: <FaInstagram />,
    // },
    // {
    //   href: "",
    //   icon: <PiYoutubeLogo />,
    // },
  ];
  return (
    <div className="newsletter py-10">
      <div className="container">
        <Row gutter={[40, 40]} className="items-center lg:text-center">
          <Col span={24} lg={10}>
            <h3 className="font-bold mb-3 text-2xl">
              اشترك في النشرة الاخبارية لدينا
            </h3>
            <p className="text-[#2D2D31] text-md">
              من خلال الاشتراك، فإنك توافق على إستلام آخر الأخبار والعروض
              والمنتجات والمسابقات من المتجر الخاص بنادي الطائي. يمكنك إلغاء
              الاشتراك في أي وقت. لمزيد من المعلومات، يرجى الاطلاع على سياسة
              الخصوصية الخاصة بنا.{" "}
            </p>
          </Col>
          <Col span={24} lg={10}>
            <NewsLetter_form />
          </Col>
          <Col span={24} lg={4}>
            <ul className="social flex items-center justify-end gap-2 lg:justify-center">
              {socialLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-primary text-3xl flex items-center justify-center  rounded-full hover:bg-primary hover:text-white transition-colors duration-300 p-2`}
                  >
                    {link.icon}
                  </a>
                </li>
              ))}
            </ul>
          </Col>
        </Row>
      </div>
    </div>
  );
};
