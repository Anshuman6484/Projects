import { Link } from 'react-router-dom'

const posts = [
  { title: 'React Router Basics' },
  { title: 'Understanding useState' },
]

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-5">
      <h1 className="text-3xl font-bold mb-6">📜 Blog Posts</h1>
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-4">
        {posts.map((post) => (
          <Link
            key={post.title}
            to={`/post/${post.title.toLowerCase().replace(/\s+/g, '-')}`}
            className="block bg-blue-500 text-white text-lg font-semibold p-3 rounded-lg mb-3 hover:bg-blue-600 transition"
          >
            {post.title}
          </Link>
        ))}
      </div>
    </div>
  )
}

// Explanation

/*

1. Link :
- This imports the `Link` component from the `react-router-dom` library.
- `Link` is used for navigation in a React app without causing a full page reload.
- It allows client-side routing, which is efficient because only parts of the page update instead of reloading everything.

2. Array of Blog Posts : 
- This defines a list (array) of blog posts.
- Each post is represented as an object with:
  - `id`: A unique identifier for each post.
  - `title`: The title of the blog post.
- This array will be used to dynamically generate links for each blog post.

3. Home Component :
- Defines a functional component named `Home`.
- This is the default export, meaning it can be imported in another file without using curly braces (`{ Home }`).

4. Mapping Through Posts to Create Links :
- Uses the `.map()` method to iterate over the `posts` array.
- For each `post` object, it generates a `Link` component dynamically.
- `post` is a variable representing the current blog post in the loop.

5. Creating a `Link` for Each Blog Post :
- Creates a clickable link for each blog post.
- The `to` prop dynamically sets the URL to `/post/{id}`, so:
  - Clicking "React Router Basics" (id = 1) navigates to `/post/1`.
  - Clicking "Understanding useState" (id = 2) navigates to `/post/2`.
- Key Attributes:
  - `key={post.id}`: Assigns a unique key to each list item (important for performance in React).
  - `to={`/post/${post.id}`}`: Defines the route path for each post.

*/
