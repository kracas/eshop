import { medusaClient } from "@lib/config"
import { IS_BROWSER } from "@lib/constants"
import { getCategoryHandles } from "@lib/util/get-category-handles"
import CategoryTemplate from "@modules/categories/templates"
import Head from "@modules/common/components/head"
import Layout from "@modules/layout/templates"
import SkeletonCollectionPage from "@modules/skeletons/templates/skeleton-collection-page"
import { GetStaticPaths, GetStaticProps } from "next"
import { useRouter } from "next/router"
import { ParsedUrlQuery } from "querystring"
import { ReactElement } from "react"
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query"
import { NextPageWithLayout, PrefetchedPageProps } from "../../types/global"
import { ProductCategory } from "@medusajs/medusa"

interface Params extends ParsedUrlQuery {
  handle: string[]
}

const fetchCategory = async (handle: string) => {
  return await medusaClient.productCategories.list({ handle }).then(({ product_categories }) => (product_categories[0]))
}

export const fetchCategoryProducts = async ({
  pageParam = 0,
  id,
  cartId,
}: {
  pageParam?: number
  id: string
  cartId?: string
}) => {
  const { products, count, offset } = await medusaClient.products.list({
    limit: 12,
    offset: pageParam,
    category_id: [id],
    include_category_children: true,
    cart_id: cartId,
  })

  return {
    response: { products, count },
    nextPage: count > offset + 12 ? offset + 12 : null,
  }
}

const CollectionPage: NextPageWithLayout<PrefetchedPageProps> = ({
  notFound,
}) => {
  const { query, isFallback, replace } = useRouter()
  const handle = typeof query.handle === "object" ? query.handle.join('/') : ""

  const { data, isError, isSuccess, isLoading } = useQuery(
    ["get_category", handle],
    () => fetchCategory(handle)
  )

  if (notFound) {
    if (IS_BROWSER) {
      replace("/404")
    }

    return <SkeletonCollectionPage />
  }

  if (isError) {
    replace("/404")
  }

  if (isFallback || isLoading || !data) {
    return <SkeletonCollectionPage />
  }

  if (isSuccess) {
    return (
      <>
        <Head title={data.name} description={`${data.name} category`} />
        <CategoryTemplate category={data} />
      </>
    )
  }

  return <></>
}

CollectionPage.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const handles = await getCategoryHandles();

  return {
    paths: handles.map((handle) => ({ params: { handle: handle.split('/') } })),
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const queryClient = new QueryClient();
  const handleArray = context.params?.handle as string[]
  const handle = handleArray.join('/');

  await queryClient.prefetchQuery(["get_category", handle], () =>
    fetchCategory(handle)
  )

  const category = queryClient.getQueryData(['get_category', handle]) as ProductCategory

  if (!category) {
    return {
      notFound: true,
    }
  }

  await queryClient.prefetchInfiniteQuery(
    ["get_category_products", category.id],
    ({ pageParam }) => fetchCategoryProducts({ pageParam, id: category.id }),
    {
      getNextPageParam: (lastPage) => lastPage.nextPage,
    }
  )


  return {
    props: {
      // Work around see – https://github.com/TanStack/query/issues/1458#issuecomment-747716357
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
      notFound: false,
    },
    revalidate: 60 * 60,
  }
}

export default CollectionPage
