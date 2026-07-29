import { FaRegEdit } from "react-icons/fa";
import style from "./styles/joinNow.module.scss";
import { FaCheck } from "react-icons/fa6";
import { JoinNow_form } from "./forms/JoinNow_form";

export const AffiliateProgramJoinNowComponent = () => {
  const notes = [
    "سيتم مراجعة طلبك خلال 24-48 ساعة",
    "العمولة تتراوح من 10% إلى 15% حسب الأداء",
    "الحد الأدنى للسحب 500 ريال سعودي",
    "يتم صرف الأرباح خلال 3-5 أيام عمل",
  ];
  return (
    <main className={style.joinNow}>
      <div className="container !max-w-[780px]">
        <div className="text-center mb-10">
          <div className="w-fit mx-auto flex items-center justify-center gap-2 bg-[#F1F1F1] text-primary px-4 py-2 rounded-[9999px]">
            <FaRegEdit className="text-lg" /> التسجيل في برنامج الأفلييت
          </div>
          <h1 className="text-secondary text-6xl font-bold my-4">
            انضم إلى برنامج الشركاء
          </h1>
          <p className="text-primary text-xl">
            املأ النموذج أدناه للانضمام إلى برنامج الأفلييت وابدأ في كسب
            العمولات
          </p>
        </div>

        <div className="important-notes mb-8">
          <h3 className="text-secondary font-bold text-xl mb-4">
            معلومات مهمة
          </h3>
          <ul className="flex flex-col gap-3">
            {notes.map((note, index) => (
              <li key={index} className="text-primary">
                <FaCheck className="text-secondary" />

                {note}
              </li>
            ))}
          </ul>
        </div>

        <div className="cardS1">
          <JoinNow_form />
        </div>
      </div>
    </main>
  );
};
