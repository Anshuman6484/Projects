import { useParams, Link } from 'react-router-dom'

const posts = [
  { title: 'React Router Basics', content: 'Learn about React Router.' },
  { title: 'Understanding useState', content: 'Master useState Hook.' },
]

export default function PostDetails() {
  const { title } = useParams()
  const newTitle = title.replace(/-/g, ' ')
  const post = posts.find(
    (p) => p.title.toLowerCase() === newTitle.toLowerCase()
  )

  if (!post)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-2xl font-bold text-red-500">Post not found ❌</h2>
      </div>
    )

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-5">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
        <p className="text-lg text-gray-700">{post.content}</p>
        <Link
          to="/"
          className="inline-block mt-5 bg-blue-500 text-white text-lg font-semibold px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          🔙 Back to Home
        </Link>
      </div>
    </div>
  )
}
