import CategoryPageMetadataCell from 'src/components/CategoryPageMetadataCell'
import CategoryPageProductsCell from 'src/components/CategoryPageProductsCell'

interface CategoryProps {
  idString: string
}

const CategoryPage = ({ idString }: CategoryProps) => {
  return (
    <>
      <CategoryPageMetadataCell idString={idString} />
      <CategoryPageProductsCell idString={idString} />
    </>
  )
}

export default CategoryPage
