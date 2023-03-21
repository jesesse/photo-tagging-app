import React from "react";
import styled from 'styled-components';
import { Link } from "react-router-dom";
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";

function Home({ app }) {

    const storage = getStorage(app)
    const [imgURLs, setImgURLs] = React.useState([])

    React.useEffect(() => {
        getlevelImageURLs().then(urls => setImgURLs(urls))
    }, [])

    async function getlevelImageURLs() {
        const listRef = ref(storage, 'level-images')
        const list = await listAll(listRef);
        let urls = await Promise.all(list.items.map(item => ((getDownloadURL(item)))))
        return (urls)
    }

    return (
        <HomePage>
            <h1>LEVEL SELECT</h1>
            <LevelSelectWrapper>
                {imgURLs.map((url, index) => {
                    return(
                    <LevelSelectContainer to={`/level/${index + 1}`} key={index}>
                        <LevelImg src={url}></LevelImg>
                        <LevelName>Level {index + 1}</LevelName>
                    </LevelSelectContainer>)
                })}
            </LevelSelectWrapper>
            <StyledLink to="/high-scores">CHECK HIGH SCORES</StyledLink>
        </HomePage>
    );
}

const StyledLink = styled(Link)`
background-color: aliceblue;
padding: 20px;
border-radius: 10px;
border: 1px solid black;
margin: 75px;
text-decoration: none;
font-size: 2rem;
&:visited{
    color: black;
}
&:hover{
    box-shadow: 0 0 5px black;
    background-color: #f0f8ffcf;
}
`

const HomePage = styled.div`
padding-top: 100px;
display: flex;
flex-flow: column;
align-items: center;
min-height: 100vh;
background-color: #d1c2ae;
`

const LevelSelectWrapper = styled.div`
margin-top: 50px;
display: flex;
gap: 50px
`

const LevelSelectContainer = styled(Link)`
cursor: pointer;
width: 400px;
height: 250px;
display: flex;
justify-content: center;
border: 1px solid black;
position: relative;
&:hover{
   border: 2px solid black;
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
