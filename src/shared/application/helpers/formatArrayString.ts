export const formatArrayString = (data: string | string[] | undefined) => {
  if (!data) {
    return undefined;
  }
  if (typeof data === "string") {
    return data !== "" ? data.split(",") : undefined;
  }
  return data.length > 0 ? data : undefined;
};
