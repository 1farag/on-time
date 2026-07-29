/** Spinner for pages that defer rendering until SearchParams are available on the client. */
export function AdminTablePageSuspenseFallback() {
  return (
    <main className="flex min-h-[40vh] items-center justify-center">
      <div
        className="h-9 w-9 animate-spin rounded-full border-2 border-primary border-t-transparent"
        role="status"
        aria-label="Loading"
      />
    </main>
  );
}
