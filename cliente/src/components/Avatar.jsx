// eslint-disable-next-line react/prop-types
export function Avatar({ userId, username }) {

  const colors = ['bg-red-200', 'bg-green-200', 'bg-orange-200', 'bg-yellow-200', 'bg-cyan-200', 'bg-purple-200']

  const userIdBase10 = parseInt(userId, 24);
  const colorIndex = userIdBase10 % colors.length;
  const color = colors[colorIndex];

  return (
    <section className={`w-8 h-8 ${color} rounded-full flex items-center`}>
      <div className="text-center w-full opacity-80 uppercase font-semibold">
        {username[0]}
      </div>
    </section >
  )
}