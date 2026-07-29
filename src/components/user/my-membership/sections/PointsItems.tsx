export type PointsType = "earn" | "redeem";

export interface PointsItemProps {
  date: string;
  title: string;
  subtitle: string;
  points: number;
  type: PointsType;
}

const PointsItem = ({
  date,
  title,
  subtitle,
  points,
  type,
}: PointsItemProps) => {
  const isEarn = type === "earn";

  return (
    <div className="bg-gray-50 rounded-2xl px-6 py-5 flex items-center justify-between">
      {/* Right: Content */}
      <div className="flex items-center gap-4">
        {/* Points badge */}
        <div
          className={`min-w-16 h-16 flex items-center justify-center rounded-full font-semibold text-base
              ${
                isEarn
                  ? "bg-green-100 text-green-600"
                  : "bg-gray-100 text-gray-600"
              }
            `}
        >
          {isEarn ? `+${points}` : points}
        </div>

        <div className="text-right">
          <h4 className="text-gray-900 font-semibold text-base">{title}</h4>
          <p className="text-gray-400 text-sm mt-1">{subtitle}</p>
        </div>
      </div>

      {/* Left: Date */}
      <span className="text-gray-400 text-sm whitespace-nowrap">{date}</span>
    </div>
  );
};

export default PointsItem;
