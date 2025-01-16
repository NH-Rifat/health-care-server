import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getAllFromDB = async (params: any) => {
  const { searchTerm, ...filteredData } = params;
  console.log(params);
  console.log(filteredData);
  const conditions = [];
  const searchAbleFields = ["name", "email"];
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
    include: {
      user: true,
    },
  });
  return result;
};

export const AdminService = {
  getAllFromDB,
};
