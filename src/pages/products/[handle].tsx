import { medusaClient, REVALIDATION_INTERVAL } from "@lib/config"
import { IS_BROWSER } from "@lib/constants"
import { getProductHandles } from "@lib/util/get-product-handles"
import Head from "@modules/common/components/head"
import Layout from "@modules/layout/templates"
import ProductTemplate from "@modules/products/templates"
import SkeletonProductPage from "@modules/skeletons/templates/skeleton-product-page"
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query"
import { GetStaticPaths, GetStaticProps, GetStaticPropsResult } from "next"
import { useRouter } from "next/router"
import { ParsedUrlQuery } from "querystring"
import { ReactElement, useEffect } from "react"
import { NextPageWithLayout, PrefetchedPageProps } from "types/global"
import { sendGtmEcommerceEvent, getGtmCategories } from "@lib/util/googleTagManager"
import { useCart } from "medusa-react"
import { findCheapestCurrencyPrice } from "@lib/util/prices"

interface Params extends ParsedUrlQuery {
  handle: string
}

const fetchProduct = async (handle: string) => {
  return await medusaClient.products
    .list({
      handle,
      expand: 'categories,variants,variants.options,variants.prices,options,options.values,images,tags'
    })
    .then(({ products }) => {
      const product = products[0]
      //sort variants by rank
      product.variants.sort((a, b) => {
        if (a.variant_rank !== undefined && b.variant_rank !== undefined) {
          return a.variant_rank - b.variant_rank
        }
        return 0
      }
      )
      //sort options values by variant rank
      product.options.forEach((option) => {
        option.values.sort((a, b) => {
          //get variant ids
          const aId = a.variant_id
          const bId = b.variant_id

          //find variant rank
          const aRank = product.variants.find((v) => v.id === aId)?.variant_rank
          const bRank = product.variants.find((v) => v.id === bId)?.variant_rank

          //sort by rank
          if (aRank !== undefined && bRank !== undefined) return aRank - bRank
          return 0
        })
      })
      return product
    })
}

const ProductPage: NextPageWithLayout<PrefetchedPageProps> = ({ notFound }) => {
  const { query, isFallback, replace } = useRouter()
  const handle = typeof query.handle === "string" ? query.handle : ""
  const { cart } = useCart()

  const { data, isError, isLoading, isSuccess } = useQuery(
    [`get_product`, handle],
    () => fetchProduct(handle),
    {
      enabled: handle.length > 0,
      keepPreviousData: true,
    }
  )

  useEffect(() => {
    if (data && cart?.region) {
      const price = findCheapestCurrencyPrice(data.variants, cart.region.currency_code)
      if (!price) return
      const itemPrice = price.amount / 100
      const categories = getGtmCategories(data.categories)
      sendGtmEcommerceEvent('view_item', {
        currency: cart?.region.currency_code.toUpperCase(),
        value: itemPrice,
        items: [{
          ...categories,
          item_id: data.id,
          item_name: data.title,
          price: itemPrice,
        }]
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.id, cart?.region])

  if (notFound) {
    if (IS_BROWSER) {
      replace("/404")
    }

    return <SkeletonProductPage />
  }

  if (isFallback || isLoading || !data) {
    return <SkeletonProductPage />
  }

  if (isError) {
    replace("/404")
  }

  if (isSuccess) {
    return (
      <>
        <Head
          description={data.description}
          title={data.title}
          image={data.thumbnail}
        />
        <ProductTemplate product={data} />
      </>
    )
  }

  return <></>
}

ProductPage.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const handles = await getProductHandles()
  return {
    paths: handles.map((handle) => ({ params: { handle } })),
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const result: GetStaticPropsResult<object> = {
    props: {},
    revalidate: REVALIDATION_INTERVAL,
  }
  const handle = context.params?.handle as string
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery([`get_product`, handle], () =>
    fetchProduct(handle)
  )

  const queryData = await queryClient.getQueryData([`get_product`, handle])

  if (!queryData) {
    result.props = {
      notFound: true,
    }
    return result
  }

  result.props = {
    dehydratedState: dehydrate(queryClient),
    notFound: false,
  }

  return result
}

export default ProductPage
