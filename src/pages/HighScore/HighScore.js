import React, { useEffect } from "react";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import Header from "../../components/Header";
import { getDoc, doc, getFirestore } from "firebase/firestore";
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";

function HighScore({ app }) {
    const db = getFirestore(app)
    const params = useParams();
    const storage = getStorage(app)
    const [highScores, setHighScores] = React.useState();
    const [imgURLs, setImgURLs] = React.useState([])

    React.useEffect(() => {
        getlevelImageURLs().then(urls => setImgURLs(urls))
        if (params.level) {
            getHighScores().then(scores => {
                scores.sort((a, b) => (a.time > b.time) ? 1 : ((b.time > a.time) ? -1 : 0))
                setHighScores(scores)
            })
        }
    }, [params])

    async function getlevelImageURLs() {
        const listRef = ref(storage, 'level-images')
        const list = await listAll(listRef);
        let urls = await Promise.all(list.items.map(item => ((getDownloadURL(item)))))
        return (urls)
    }

    async function getHighScores() {
        const highScoresRef = doc(db, "highScores", `level${params.level}`);
        const highScoresRefSnapshot = await getDoc(highScoresRef);
        let scoresObject = highScoresRefSnapshot.data();
        return scoresObject.scores;
    }

    return (
        <HighScorePage className="high-score-page">
            <Header></Header>

            {!params.level && <h1>HIGH SCORES</h1>}
            {!params.level && <LevelSelectWrapper>
                {imgURLs.map((url, index) => {
                    return (
                        <LevelSelectContainer to={`/high-scores/level/${index + 1}`} key={index}>
                            <LevelImg src={url}></LevelImg>
                            <LevelName>High Score Level {index + 1}</LevelName>
                        </LevelSelectContainer>)
                })}
                
            </LevelSelectWrapper>}
            {!params.level && <StyledLink to="/"> BACK TO LEVEL SELECT</StyledLink>}

            {params.level && <h1>HIGH SCORES FOR LEVEL {params.level}</h1>}
            {params.level && <HighScoresContainer>
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {highScores && highScores.map((score, index) => {
                            return (
                                <tr key={index}>
                                    <td className="table--place">{index + 1}.</td>
                                    <td>{score.name}</td>
                                    <td className="table--time">{score.time}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                <StyledLink to="/high-scores">BACK TO HIGH SCORES</StyledLink>
            </HighScoresContainer>}
        </HighScorePage>
    );
}

const HighScorePage = styled.div`
                display: flex;
                flex-flow: column;
                align-items: center;
                gap: 50px;
                min-height: 100vh;
                background-color: rgb(209, 194, 174);
                `

const HighScoresContainer = styled.div`
                display: flex;
                flex-flow: column;
                gap: 20px;
                width: 700px;
                `

const Score = styled.div`
                font-size: 2rem;
                border-bottom: 1px solid black;
                `

const StyledLink = styled(Link)`
background-color: aliceblue;
padding: 20px;
border-radius: 10px;
border: 1px solid black;
margin: 75px;
text-decoration: none;
font-size: 2rem;
text-align: center;
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

export default HighScore;
