export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          Thomas Ferrier Aviation - Admin Panel
        </h1>
        <hr className="my-4" />
      </header>
      <main>{children}</main>
      <footer className="mt-12 pt-4 border-t">
        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
          &copy; {new Date().getFullYear()} Admin Panel
        </p>
      </footer>
    </section>
  );
} 