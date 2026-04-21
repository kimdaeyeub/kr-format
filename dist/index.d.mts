declare const formatPhone: (phoneNumber: string, options?: {
    international: boolean;
}) => string;
declare const formatHomePhone: (homePhoneNumber: string, options?: {
    includeLocalCode: boolean;
}) => string;

declare const nameMarking: (name: string, { onlyFamilyName }?: {
    onlyFamilyName: boolean;
}) => string;

declare const formatMoney: (money: number, options: {
    format: "full-format" | "half-format";
}) => string;

declare const residentNumber: {
    format: (number: string) => string;
    unformat: (number: string) => string;
};
declare const mask: (number: string, { type }: {
    type: "formatted" | "unformatted";
}) => string;

export { formatHomePhone, formatMoney, formatPhone, mask, nameMarking, residentNumber };
