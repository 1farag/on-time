interface TermsAndConditionsHeadingProps {
  pageData: {
    updated_at: string;
  };
  JSONData: {
    content_en: string;
    content_ar: string;
  };
}

export const TermsAndConditionsHeading = ({
  JSONData,
  pageData,
}: TermsAndConditionsHeadingProps) => {
  const sections = [
    {
      id: 1,
      title: "مقدمة",
      content: [
        "أهلاً بكم في متجر نادي الطائي الإلكتروني. باستخدامكم لهذا الموقع، فإنكم توافقون على الالتزام بالشروط والأحكام التالية.",
        "تمثل هذه الشروط اتفاقية قانونية بين المتجر والمستخدم، ويهدف المتجر من خلالها إلى تقديم أفضل تجربة شراء لمنتجات النادي الرسمية.",
      ],
    },
    {
      id: 2,
      title: "حساب المستخدم والخصوصية",
      content: [
        "يجب على المستخدم تقديم معلومات دقيقة وصحيحة عند إنشاء حساب في المتجر.",
        "يتحمل المستخدم مسؤولية الحفاظ على سرية معلومات حسابه وكلمة المرور الخاصة به.",
        "يلتزم المتجر بحماية بيانات المستخدمين وفقاً لسياسة الخصوصية المتبعة.",
      ],
    },
    {
      id: 3,
      title: "الطلبات والمشتريات",
      content: [
        "تخضع جميع الطلبات لمدى توفر المنتجات في المخزون.",
        "يحتفظ المتجر بالحق في إلغاء أو رفض أي طلب لأي سبب كان، مع إخطار العميل بذلك.",
        "يتم عرض أسعار المنتجات شاملة جميع الرسوم الموضحة عند إتمام عملية الشراء.",
      ],
    },
    {
      id: 4,
      title: "الدفع والأمان",
      content: [
        "يوفر المتجر وسائل دفع إلكترونية آمنة ومتنوعة.",
        "يتم معالجة جميع عمليات الدفع عبر بوابات دفع معتمدة تضمن حماية بيانات بطاقات الائتمان الخاصة بالمستخدمين.",
      ],
    },
    {
      id: 5,
      title: "الشحن والتوصيل",
      content: [
        "نسعى لتوصيل الطلبات في أسرع وقت ممكن وفقاً لفترة التوصيل المحددة.",
        "تعتمد رسوم الشحن على موقع العميل ووزن الشحنة، ويتم توضيحها قبل تأكيد الطلب.",
      ],
    },
    {
      id: 6,
      title: "القانون الواجب التطبيق",
      content: [
        "تخضع هذه الشروط والأحكام وتفسر وفقاً للأنظمة والقوانين المعمول بها في المملكة العربية السعودية.",
      ],
    },
  ];

  return (
    <div className="privacy-terms-banner">
      <div className="container">
        <h1 className="text-center mb-24">Terms &amp; Conditions</h1>

        <div className="space-y-12">
          {sections.map((section) => (
            <div key={section.id} className="">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                {section.id}. {section.title}
              </h2>
              <div className="space-y-4">
                {section.content.map((paragraph, idx) => (
                  <p
                    key={idx}
                    className="text-gray-700 leading-relaxed text-sm md:text-base"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
