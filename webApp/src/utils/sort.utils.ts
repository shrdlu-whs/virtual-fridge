export const stableSort = <T>(array: T[], comparator: (a: T, b: T) => number) => {
    const stabilizedThis: [T, number][] = [];

    for (let i = 0; i < array.length; i++) {
      stabilizedThis.push([array[i], i])
    }

    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });

    const result: T[] = [];
    for (let i = 0; i < stabilizedThis.length; i++) {
      result.push(stabilizedThis[i][0]);
    }
    return result;
};

const descendingComparator = <T>(a: T, b: T, orderBy: keyof T) => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
};

export type Order = "asc" | "desc";

export const getComparator = <Key extends keyof any>(
  order: Order,
  orderBy: Key
): ((a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number) => {
  return order === "desc" ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
};