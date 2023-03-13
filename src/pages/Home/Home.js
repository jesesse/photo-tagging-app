import React from "react";
import styled from 'styled-components';
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";

function Home({ app }) {

    const storage = getStorage(app)
    const [imgURLs, setImgURLs] = React.useState([])

    React.useEffect(() => {
        getlevelImageURLs()
    }, [])

    async function getlevelImageURLs() {
        const listRef = ref(storage, 'level-images')
        const list = await listAll(listRef);
        let urls = await Promise.all(list.items.map(item => ((getDownloadURL(item)))))
        setImgURLs(urls)
    }

    return (
        <Container>
            {imgURLs.map((url, index) => {
                return(
                <LevelSelectContainer key={index}>
                    <LevelImg src={url}></LevelImg>
                    <LevelName>Level {index + 1}</LevelName>
                </LevelSelectContainer>)
            })}
        </Container>
    );
}

const Container = styled.div`
display: flex;
gap: 80px;
`
const LevelSelectContainer = styled.div`
cursor: pointer;
width: 500px;
height: 300px;
display: flex;
justify-content: center;
border: 1px solid black;
position: relative;
&:hover{
   border: 4px solid black;
   background-color: aliceblue;
   box-shadow: 0px 0px 8px black;
}
`
const LevelImg = styled.img`
width: 100%;
height: 100%;
`
const LevelName = styled.div`
color: white;
width: 100%;
text-align: center;
background-color: rgba(0,0,0,0.6);
font-size: 2.5rem;
position: absolute;
bottom: 10%;
`

export default Home;
