interface AuthorPageProps {
  params: {
    slug: string
  }
}

export const metadata = {
  title: "Author"
}

export default function AuthorPage({ params }: AuthorPageProps) {
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold my-4 text-center">Author: {params.slug}</h1>
    </div>
  )
}
