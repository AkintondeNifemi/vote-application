export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center min-h-screen justify-center gap-3">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600"></div>
      <p className="text-sm text-gray-500">Loading...</p>
    </div>
  );
}
