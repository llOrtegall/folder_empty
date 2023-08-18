// eslint-disable-next-line react/prop-types
export function Avatar({ userId, username }) {

  const colors = [
    'bg-yellow-200', 'bg-green-200', 'bg-orange-200',
    'bg-purple-200', 'bg-blue-200', 'bg-red-200'
  ];

  const userIdBase10 = parseInt(userId, 22);
  const colorIndex = userIdBase10 % colors.length;
  const color = colors[colorIndex];

  return (
    <div className={`w-8 h-8 rounded-full flex items-center ${color}`}>
      <div className="text-center w-full opacity-70 uppercase font-bold">{username[0]}</div>
    </div>
  )
}