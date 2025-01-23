import prisma from "../../../shared/prisma";

const insertIntoDB = async (user: any, payload: any) => {
  const { scheduleIds } = payload;
  const doctorData = await prisma.doctor.findUniqueOrThrow({
    where: {
      email: user.email,
    },
  });

  const doctorScheduleData = scheduleIds?.map((scheduleId: string) => {
    return {
      doctorId: doctorData.id,
      scheduleId: scheduleId,
    };
  });
  return await prisma.doctorSchedules.createMany({
    data: doctorScheduleData,
  });
};

export const DoctorScheduleService = {
  insertIntoDB,
};
