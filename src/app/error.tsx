'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <h2 className="text-3xl font-bold text-red-600 mb-4">Something went wrong!</h2>
      <button
        onClick={() => reset()}
        className="px-6 py-2.5 bg-[#D35400] text-white rounded-full hover:bg-[#E67E22] transition-colors"
      >
        Try again
      </button>
    </div>
  );
}
