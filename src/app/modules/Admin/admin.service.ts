import { Prisma, PrismaClient } from "@prisma/client";
import { searchAbleFields } from "./admin.constant";
import { calculatePagination } from "../../../helpers/paginationHelper";
import prisma from "../../../shared/prisma";

const getAllFromDB = async (params: any, options: any) => {
  const { searchTerm, ...filteredData } = params;
  // console.log(params);
  // console.log(filteredData);
  const { page, limit, skip, orderBy } = calculatePagination(options);
  const conditions = [];

  if (params?.searchTerm) {
    conditions.push(
      {
        OR: searchAbleFields?.map((field) => ({
          [field]: {
            contains: params.searchTerm,
            mode: Prisma.QueryMode.insensitive,
          },
        })),
      },
      {
        isDeleted: false,
      }
    );
  }

  // way to insert the conditions in the query of AND conditions
  if (Object.keys(filteredData).length > 0) {
    for (const key in filteredData) {
      if (Object.hasOwnProperty.call(filteredData, key)) {
        const value = filteredData[key];
        if (value) {
          conditions.push({
            [key]: {
              equals: value,
            },
          });
        }
      }
    }
  }

  // another way to do the same thing which will insert another AND condition in the query of AND conditions
  // if (Object.keys(filteredData).length > 0) {
  //   conditions.push({
  //     AND: Object.keys(filteredData).map((key) => ({
  //       [key]: {
  //         equals: filteredData[key],
  //       },
  //     })),
  //   });
  // }

  const whereConditions = conditions.length > 0 ? { AND: conditions } : {};
  console.dir(whereConditions, { depth: "infinity" });

  const result = await prisma.admin.findMany({
    where: whereConditions,
    take: limit,
    skip,
    orderBy,

    include: {
      user: true,
    },
  });
  return result;
};

export const AdminService = {
  getAllFromDB,
};
