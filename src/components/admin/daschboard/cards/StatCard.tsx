import { Skeleton } from "antd";

interface StatCardProps {
  title?: string;
  value?: string | number;
  percentage?: string;
  icon?: React.ReactNode;
  color?: string;
}

const StatCard = ({ title, value, percentage, icon, color }: StatCardProps) => {
  const isLoading = !title || value === undefined || percentage === undefined;

  return (
    <div className="flex w-full flex-col gap-1 rounded-xl bg-white p-6 border border-[#eaeef0">
      <div className="flex items-center justify-between flex-1">
        <h4 className="font-medium text-gray-500">{title}</h4>
        <div className={`rounded-md bg-[#eaeef0] p-3 text-2xl text-[#385B66]`}>
          {icon}
        </div>
      </div>
      {value !== undefined ? (
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      ) : (
        <Skeleton.Input
          active
          size="default"
          style={{ width: 50 }}
          className="mb-2"
        />
      )}

      {/* {value !== undefined ? (
        <p className="mt-1 text-sm text-green-600">{percentage}</p>
      ) : (
        <Skeleton.Input active size="small" style={{ width: 30 }} />
      )} */}
    </div>
  );
};

export default StatCard;
