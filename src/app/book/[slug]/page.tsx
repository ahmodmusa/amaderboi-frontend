interface BookPageProps {
  params: {
    slug: string
  }
}

export const metadata = {
  title: "Book Details"
}

export default function BookPage({ params }: BookPageProps) {
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold my-4 text-center">Book: {params.slug}</h1>
    </div>
  )
}
