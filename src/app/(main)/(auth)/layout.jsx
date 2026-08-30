export default function AuthLayout({ children }) {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-zinc-50 dark:bg-[#0a0a0a]">
      {children}
    </div>
  );
}
