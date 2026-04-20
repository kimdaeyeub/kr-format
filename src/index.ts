import { formatHomePhone, formatPhone } from "./phone";
import { residentNumber } from "./resident-number";

const KRFormatter = {
  phone: formatPhone,
  homePhone: formatHomePhone,
  residentNumber: residentNumber,
};

export default KRFormatter;

console.log(KRFormatter.residentNumber.format("9906031234567"));
