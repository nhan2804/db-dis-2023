import moment from "moment";

export const displayDate = (date: string, formatString?: string) => {
  return moment(date).format(formatString || "DD-MM-YYYY h:mm:ss");
};
