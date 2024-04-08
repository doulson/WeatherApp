import moment from "moment";

export const formatDate = (
  date: Date,
  format: string = "DD-MM-YYYY hh:mm A"
): string => {
  return moment(date).format(format);
};
