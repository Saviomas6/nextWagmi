import BigNumber from "bignumber.js";

export const convertToEther = (values: number | string) => {
  const convertToEther = new BigNumber(values).dividedBy(10 ** 18).toFixed(5);
  return convertToEther;
};

export const convertToWei = (values: number | string) => {
  const ConvertToWei = new BigNumber(values).multipliedBy(10 ** 18).toFixed();
  return ConvertToWei;
};

export const shorten = (str: string) => {
  return `${str.toString().slice(0, 6)}...${str
    ?.toString()
    .slice(str.length - 4)}`;
};
