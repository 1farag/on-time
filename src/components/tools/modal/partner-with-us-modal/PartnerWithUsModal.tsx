"use client";
import { useState } from "react";
import Modal from "antd/es/modal/Modal";
import { Button } from "antd";
import { PartnerWithUsForm } from "./forms/PartnerWithUsForm";
import Link from "next/link";
import { useLocalizedLink } from "@/hooks/useLocalizedLink";
import { useGetPartnerPopupContent } from "./hooks/useGetPartnerPopupContent";

interface PartnerWithUsModalProps {
  icon?: React.ReactNode;
}

const PartnerWithUsModal = ({ icon }: PartnerWithUsModalProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const getLink = useLocalizedLink();
  const { data } = useGetPartnerPopupContent();
  const popupContent = JSON.parse(data?.page?.data || "{}");

  const showModal = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    //
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button type="primary" className="buttonS1 sm:w-full" onClick={showModal}>
        Partner with us {icon}
      </Button>
      <Modal
        title=""
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width="644px"
        wrapClassName="partner-with-us-modal"
        centered
        footer={null}
      >
        <div className="">
          <h3>{popupContent?.title_en}</h3>
          <p>{popupContent?.description_en}</p>

          <PartnerWithUsForm handleCancel={handleCancel} />

          <p className="privacy-policy-link">
            For more information on how Sanad handles personal data, <br />
            please see our{" "}
            <Link
              href={getLink("/privacy-policy")}
              onClick={() => {
                handleCancel();
              }}
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </Modal>
    </>
  );
};

export default PartnerWithUsModal;
