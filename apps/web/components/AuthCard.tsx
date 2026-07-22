export function AuthCard({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md bg-white rounded-xl2 shadow-premium p-8 sm:p-10">
        <h1 className="text-2xl font-bold text-center">{title}</h1>
        <p className="text-neutral-500 text-sm text-center mt-1 mb-8">{subtitle}</p>
        {children}
      </div>
    </div>
  );
}
