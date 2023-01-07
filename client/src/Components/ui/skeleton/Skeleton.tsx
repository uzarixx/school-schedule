import React, {FC} from "react"
import ContentLoader from "react-content-loader";


interface SkeletonPropsTypes {
    height?: number
}

const MyLoader: FC<SkeletonPropsTypes> = ({height}) => (
    <ContentLoader
        speed={3}
        width="100%"
        height="100%"
        backgroundColor="#c4c4c4"
        foregroundColor="#ecebeb"
    >
        <rect x="0" y="0" rx="20" ry="20" width="100%" height="100%"/>
    </ContentLoader>
)

export default MyLoader