interface CategoryPageProps {
  params: {
    slug: string
  }
}

export const metadata = {
  title: "Category"
}

export default function CategoryPage({ params }: CategoryPageProps) {
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold my-4 text-center">Category: {params.slug}</h1>
    </div>
  )
}
