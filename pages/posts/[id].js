import Layout from '/components/layout'
import { getAllPostIds, getPostData } from '/lib/posts'

export async function getStaticPaths() {
    const paths = getAllPostIds()
    return {
        paths,
        fallback: false //404エラーを返すように
    }
}

//params == getStaticPathsでreturnしたObjectのpath内のObjectにあるparams <- 必ず返すようにしている
export async function getStaticProps({ params }) {
    const postData = getPostData(params.id)
    return {
        props: {
            postData
        }
    }
}

export default function Post({ postData }) {
    return (
        <Layout>
            {postData.title}
            <br />
            {postData.id}
            <br />
            {postData.date}
        </Layout>
    )}