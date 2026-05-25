import crypto from "crypto";

interface PayURequest {
  orderId: string;
  amount: number;
  firstname: string;
  email: string;
  phone: string;
}

const getEnv = (key: string) => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`${key} is not defined in environment variables`);
  }
  return value;
};

const createHash = (data: string) => {
  return crypto.createHash("sha512").update(data).digest("hex");
};

export const generatePayUPaymentData = (payload: PayURequest) => {
  const key = getEnv("PAYU_KEY");
  const salt = getEnv("PAYU_SALT");
  const baseUrl = getEnv("PAYU_BASE_URL");
  const txnid = `ORDER_${payload.orderId}_${Date.now()}`;
  const productinfo = "Uncover-D payment";
  const amount = payload.amount.toFixed(2);
  const hashString = `${key}|${txnid}|${amount}|${productinfo}|${payload.firstname}|${payload.email}|||||||||||${salt}`;
  const hash = createHash(hashString);

  return {
    action: `${baseUrl}/_payment`,
    key,
    txnid,
    amount,
    productinfo,
    firstname: payload.firstname,
    email: payload.email,
    phone: payload.phone,
    surl: getEnv("PAYU_SUCCESS_URL"),
    furl: getEnv("PAYU_FAILURE_URL"),
    hash,
    udf1: payload.orderId,
  };
};

export const verifyPayUHash = (response: Record<string, any>) => {
  const salt = getEnv("PAYU_SALT");
  const reverseString = `${salt}|${response.status}|${response.udf1 || ""}|${response.udf2 || ""}|${response.udf3 || ""}|${response.udf4 || ""}|${response.udf5 || ""}|${response.email}|${response.firstname}|${response.productinfo}|${response.amount}|${response.txnid}|${response.key}`;
  const hash = createHash(reverseString);
  return hash === response.hash;
};
