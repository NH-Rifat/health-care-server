import { Admin, Prisma, PrismaClient } from "@prisma/client";
import { searchAbleFields } from "./admin.constant";
import { calculatePagination } from "../../../helpers/paginationHelper";
import prisma from "../../../shared/prisma";

const getAllFromDB = async (params: any, options: any) => {
  const { searchTerm, ...filteredData } = params;
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
  const totalRecords = await prisma.admin.count({
    where: whereConditions,
  });
  return {
    data: result,
    meta: {
      page,
      limit,
      totalRecords,
    },
  };
};

const getAdminByIdFromDB = async (id: string) => {
  return await prisma.admin.findUnique({
    where: {
      id,
    },
    include: {
      user: true,
    },
  });
};

const updateAdminByIdFromDB = async (id: string, data: Partial<Admin>) => {
  await prisma.admin.findUniqueOrThrow({
    where: {
      id,
    },
  });

  return await prisma.admin.update({
    where: {
      id,
    },
    data,
  });
};

const deleteAdminByIdFromDB = async (id: string) => {
  await prisma.admin.findUniqueOrThrow({
    where: {
      id,
    },
  });

  const result = await prisma.$transaction(async (transactionClient) => {
    const deletedAdmin = await transactionClient.admin.delete({
      where: {
        id,
      },
    });
    const deleteFromUser = await transactionClient.user.delete({
      where: {
        email: deletedAdmin.email,
      },
    });
    return deletedAdmin;
  });
  return result;
};

export const AdminService = {
  getAllFromDB,
  getAdminByIdFromDB,
  updateAdminByIdFromDB,
  deleteAdminByIdFromDB,
};
