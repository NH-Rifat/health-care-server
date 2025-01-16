type IOptions = {
  limit?: number;
  page?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
};

type IOptionResult = {
  page: number;
  limit: number;
  skip: number;
  orderBy: {
    [key: string]: "asc" | "desc";
  };
};

export const calculatePagination = (options: IOptions): IOptionResult => {
  const page: number = Number(options?.page) || 1;
  const limit: number = Number(options?.limit) || 10;
  const skip: number = Number((page - 1) * limit);
  const sortBy: string = options?.sortBy || "createdAt";
  const sortOrder: "asc" | "desc" = options?.sortOrder || "desc";

  return {
    page,
    limit,
    skip,
    orderBy: {
      [sortBy]: sortOrder,
    },
  };
};
