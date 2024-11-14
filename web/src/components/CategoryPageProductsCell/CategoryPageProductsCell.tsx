import type {
  CategoryPageProductsQuery,
  CategoryPageProductsQueryVariables,
} from 'types/graphql'

import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

import NotFound from 'src/components/NotFound/NotFound'

import CategoryPageBreadcrumb from '../CategoryPageBreadcrumb/CategoryPageBreadcrumb'
import { Input } from '../ui/Input'
import { Label } from '../ui/Label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/Select'
import { Slider } from '../ui/Slider'
import H3 from '../ui/typography/H3'
import P from '../ui/typography/P'

export const QUERY: TypedDocumentNode<
  CategoryPageProductsQuery,
  CategoryPageProductsQueryVariables
> = gql`
  query CategoryPageProductsQuery($idString: String!) {
    category(idString: $idString) {
      idString
      name
      description
      products {
        idInt
        price
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <NotFound />

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  category,
}: CellSuccessProps<CategoryPageProductsQuery>) => {
  const filtered = category.products.filter((product) => product !== null)
  const defaultMaxPrice = Math.ceil(Math.max(...filtered.map((p) => p.price)))
  const [minPrice, setMinPrice] = React.useState(0)
  const [maxPrice, setMaxPrice] = React.useState(defaultMaxPrice)
  return (
    <>
      <div className="flex max-h-[33vh] flex-col-reverse overflow-clip border-b md:flex-row">
        <div className="flex flex-1 items-center p-2 max-sm:border-t md:justify-center md:border-r md:p-16">
          <div>
            <H3>{category.name}</H3>
            <span className="mt-1 inline-block">{category.description}</span>
          </div>
        </div>
        <div className="flex-1">
          <img
            src="https://placehold.co/400x200?text=placeholder"
            className="w-full"
            alt="Diaries"
          />
        </div>
      </div>
      <div className="container mt-4">
        <CategoryPageBreadcrumb name={category.name} />
      </div>
      <div className="container mt-4 grid grid-cols-4 gap-8">
        {/* Left Filter Options */}
        <div className="hidden md:col-span-1 md:flex md:flex-col md:gap-4">
          <div>
            <Label htmlFor="sort-select">Sort By</Label>
            <Select defaultValue="featured">
              <SelectTrigger>
                <SelectValue placeholder="Select one" />
              </SelectTrigger>
              <SelectContent id="sort-select">
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="price_hl">Price, High to Low</SelectItem>
                <SelectItem value="price_lh">Price, Low to High</SelectItem>
                <SelectItem value="az">Alphabetically, A-Z</SelectItem>
                <SelectItem value="za">Alphabetically, Z-A</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Price</Label>
            <div className="flex items-center gap-2">
              <Input
                type="number"
                placeholder="Min"
                value={minPrice}
                onChange={(e) => setMinPrice(parseInt(e.target.value))}
              />
              <span>to</span>
              <Input
                type="number"
                placeholder="Max"
                value={maxPrice}
                onChange={(e) =>
                  setMaxPrice(
                    Math.min(parseInt(e.target.value), defaultMaxPrice)
                  )
                }
              />
            </div>
          </div>
          <div>
            <Slider
              defaultValue={[0, defaultMaxPrice]}
              max={defaultMaxPrice}
              step={1}
              minStepsBetweenThumbs={1}
              value={[minPrice, maxPrice]}
              onValueChange={([min, max]) => {
                setMinPrice(min)
                setMaxPrice(max)
              }}
            />
          </div>
        </div>
        {/* Products */}
        <div className="col-span-4 md:col-span-3">
          <P>Showing {filtered.length} products</P>
          {/* TODO: Show products */}
        </div>
      </div>
    </>
  )
}
