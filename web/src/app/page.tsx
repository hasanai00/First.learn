export default function Home() {
  return (
    <main className="mx-auto max-w-7xl p-4 sm:p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl sm:text-3xl font-bold">فروشگاه آنلاین</h1>
        <form action="/search" className="hidden md:block w-1/2">
          <input
            name="q"
            placeholder="جستجو در محصولات..."
            className="w-full rounded-md border border-gray-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </form>
      </div>
      <p className="mt-2 text-gray-600">محصولات جدید و پرفروش</p>
    </main>
  );
}
