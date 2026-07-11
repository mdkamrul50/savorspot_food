import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-zinc-900 text-zinc-300 py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p>&copy; {new Date().getFullYear()} SavorSpot. All rights reserved.</p>
      </div>
    </footer>
  );
}
