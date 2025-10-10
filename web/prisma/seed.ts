import { PrismaClient } from "../src/generated/prisma";

const prisma = new PrismaClient();

async function upsertCategory(name: string, slug: string) {
  return prisma.category.upsert({
    where: { slug },
    create: { name, slug },
    update: { name },
  });
}

async function upsertProduct(data: {
  name: string;
  slug: string;
  description?: string | null;
  price: number;
  stock: number;
  imageUrl: string;
  categoryId: string;
}) {
  return prisma.product.upsert({
    where: { slug: data.slug },
    create: data,
    update: {
      name: data.name,
      description: data.description,
      price: data.price,
      stock: data.stock,
      imageUrl: data.imageUrl,
      categoryId: data.categoryId,
    },
  });
}

async function main() {
  const mobileCategory = await upsertCategory("موبایل", "mobile");
  const laptopCategory = await upsertCategory("لپ‌تاپ", "laptop");
  await upsertCategory("لوازم خانگی", "home-appliances");
  await upsertCategory("پوشاک", "fashion");

  await Promise.all([
    upsertProduct({
      name: "گوشی موبایل A15 سامسونگ",
      slug: "samsung-a15",
      description: "گوشی اقتصادی با نمایشگر Super AMOLED",
      price: 8500000,
      stock: 25,
      imageUrl:
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80&auto=format&fit=crop",
      categoryId: mobileCategory.id,
    }),
    upsertProduct({
      name: "گوشی آیفون 14",
      slug: "iphone-14",
      description: "قدرت و دوربین فوق‌العاده",
      price: 45900000,
      stock: 10,
      imageUrl:
        "https://images.unsplash.com/photo-1603899122778-c3b3b0af29d1?w=800&q=80&auto=format&fit=crop",
      categoryId: mobileCategory.id,
    }),
    upsertProduct({
      name: "لپ‌تاپ لنوو IdeaPad 3",
      slug: "lenovo-ideapad-3",
      description: "مناسب کارهای روزمره و دانشجویی",
      price: 24500000,
      stock: 12,
      imageUrl:
        "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80&auto=format&fit=crop",
      categoryId: laptopCategory.id,
    }),
    upsertProduct({
      name: "لپ‌تاپ مک‌بوک پرو 14 اینچ",
      slug: "macbook-pro-14",
      description: "چیپ M3، عملکرد حرفه‌ای",
      price: 119900000,
      stock: 5,
      imageUrl:
        "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80&auto=format&fit=crop",
      categoryId: laptopCategory.id,
    }),
  ]);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
