import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <h2 className="text-4xl font-bold text-[#D35400] mb-4">404 - Page Not Found</h2>
      <p className="text-zinc-600 dark:text-zinc-400 mb-6">The page you are looking for does not exist.</p>
      <Link href="/" className="px-6 py-2.5 bg-[#D35400] text-white rounded-full hover:bg-[#E67E22] transition-colors">
        Go Back Home
      </Link>
    </div>
  );
}
