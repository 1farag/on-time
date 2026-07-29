import { Button, Form, Input } from "antd";
import toast from "react-hot-toast";
import { subscribeToNewsletterAPI } from "@/apiCalls/newsletter/newsletterApi";

export const NewsLetter_form = () => {
  const [form] = Form.useForm();

  const handleNewsLetter = async () => {
    try {
      const values = await form.validateFields();

      await subscribeToNewsletterAPI({
        email: values.email,
      });

      form.resetFields();
      toast.success("تم الاشتراك في النشرة البريدية بنجاح");
    } catch (error: any) {
      if (error?.errorFields) {
        // AntD validation error – already shown by Form
        return;
      }

      const message =
        error?.response?.data?.message ||
        "حدث خطأ أثناء الاشتراك في النشرة البريدية";
      toast.error(message);
    }
  };

  return (
    <Form
      name="newsletter_form"
      form={form}
      onFinish={handleNewsLetter}
      autoComplete="off"
    >
      <div className="input-button flex align">
        <div className="inputS1 flex-1">
          <Form.Item
            label={""}
            name="email"
            rules={[
              {
                required: true,
                message: "الرجاء إدخال البريد الإلكتروني",
              },
              {
                type: "email",
                message: "الرجاء إدخال بريد إلكتروني صحيح",
              },
            ]}
          >
            <Input placeholder={"ادخل بريدك الالكتروني"} />
          </Form.Item>
        </div>
        <Button
          htmlType="submit"
          type="primary"
          //   disabled={becomePartnerLoading}
          //   loading={becomePartnerLoading}
          className="submit-btn w-full !rounded-[64px]"
        >
          اشترك
        </Button>
      </div>
    </Form>
  );
};
