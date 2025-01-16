import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getAllFromDB = async (params: any) => {
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

  const whereConditions = conditions.length > 0 ? { AND: conditions } : {};
  // console.log(whereConditions);

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
