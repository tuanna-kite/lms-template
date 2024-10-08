import { db } from '@/lib/db';
import { Course, Purchase } from '@prisma/client';

type PurchaseWithCourse = Purchase & {
  course: Course;
};

const groupByCourse = (purchases: PurchaseWithCourse[]) => {
  const grouped: { [courseTitle: string]: number } = {};

  purchases.forEach((purchase) => {
    const courseTitle = purchase.course.title;
    if (!grouped[courseTitle]) {
      grouped[courseTitle] = 0;
    }
    grouped[courseTitle] += purchase.course.price;
  });

  return grouped;
};

export const getAnalytics = async (userId: string) => {
  try {
    const purchases = await db.purchase.findMany({
      where: {
        course: {
          userId,
        },
      },
      include: {
        course: true,
      },
    });
    const groupedEarning = groupByCourse(purchases);
    const data = Object.entries(groupedEarning).map(
      ([courseTitle, revenue]) => ({
        name: courseTitle,
        total: revenue,
      })
    );

    const totalRevenue = data.reduce((acc, curr) => acc + curr.total, 0);
    return {
      data,
      totalRevenue,
      totalSales: purchases.length,
    };
  } catch (error) {
    console.log('[GET_ANALYTICS_ERROR]', error);
    return {
      data: [],
      totalRevenue: 0,
      totalSales: 0,
    };
  }
};
