interface MessageAlertProps {
  message: string;
}

export default function MessageAlert({
  message,
}: MessageAlertProps) {
  if (!message) return null;

  return (
    <div className="mb-4 rounded bg-blue-100 border border-blue-300 text-blue-800 p-3">
      {message}
    </div>
  );
}