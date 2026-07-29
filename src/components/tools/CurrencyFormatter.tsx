import Image from "next/image";
import React from "react";

interface CurrencyFormatterProps {
    amount?: string | number;
    currency?: string;
    className?: string;
    amountClassName?: string;
    iconSize?: number;
}

/**
 * A reusable component to format currency amounts.
 * If the currency is "SAR" or "ر.س", it displays the SAR icon.
 */
export const CurrencyFormatter: React.FC<CurrencyFormatterProps> = ({
    amount,
    currency = "SAR",
    className = "flex items-center gap-1",
    amountClassName = "font-bold",
    iconSize = 20,
}) => {
    const isSAR = currency === "SAR" || currency === "ر.س" || !currency;

    return (
        <span className={className}>
            {amount !== undefined && <span className={amountClassName}>{amount}</span>}
            {isSAR ? (
                <Image
                    src="/icons/SAR.svg"
                    alt="SAR"
                    width={iconSize}
                    height={iconSize}
                    className="inline-block"
                />
            ) : (
                <span className="text-sm font-medium">{currency}</span>
            )}
        </span>
    );
};
