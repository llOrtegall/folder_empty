// eslint-disable-next-line react/prop-types
export function Avatar({ userId, username, online }) {

  const colors = [
    'bg-purple-200', 'bg-red-200',
    'bg-orange-200', 'bg-green-200',
    'bg-red-200', 'bg-cyan-200']

  const userIdBase10 = parseInt(userId, 24);
  const colorIndex = userIdBase10 % colors.length;
  const color = colors[colorIndex];

  return (
    <section className={`${color} w-8 h-8 relative rounded-full flex items-center`}>
      <div className="text-center w-full opacity-80 uppercase font-semibold">
        {username[0]}
      </div>
      {online && (
        <div className="absolute w-4 h-3 bg-green-600 bottom-0 right-0 rounded-full border-2 border-white"></div>
      )}
      {!online && (
        <div className="absolute w-4 h-3 bg-gray-400 bottom-0 right-0 rounded-full border-2 border-white"></div>
      )}
    </section >
  );
}