import CategoryPageMetadataCell from 'src/components/CategoryPageMetadataCell'

interface CategoryProps {
  idString: string
}

const CategoryPage = ({ idString }: CategoryProps) => {
  return (
    <>
      <CategoryPageMetadataCell idString={idString} />
    </>
  )
}

export default CategoryPage
