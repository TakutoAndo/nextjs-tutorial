import Layout from '../../components/layout'
import { getAllPostIds, getPostData } from '../../lib/posts'
import Head from 'next/head'
import Date from '../../components/date'
import utilStyles from '/styles/utils.module.css'
import { GetStaticPaths, GetStaticProps } from 'next'

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = getAllPostIds()
    return {
        paths,
        fallback: false //404エラーを返すように
    }
}

//params == getStaticPathsでreturnしたObjectのpath内のObjectにあるparams <- 必ず返すようにしている
export const getStaticProps: GetStaticProps = async ({params}) => {
    const postData = await getPostData(params.id as string)//.join()) :params.idは配列なので、joinで要素をつなげる
    return {
        props: {
            postData
        }
    }
}

export default function Post({
    postData
    }: {
    postData: {
        title: string
        date: string
        contentHtml: string
    }
}) {
    return (
        <Layout>
        <Head>
            <title>{postData.title}</title>
        </Head>
        <article>
            <h1 className={utilStyles.headingXl}>{postData.title}</h1>
            <div className={utilStyles.lightText}>
                <Date dateString={postData.date} />
            </div>
            <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        </article>
        </Layout>
    )}