import bgImage from "../assets/BGImage/earth.png"
const Background = () => {
    return (
        <div style={{ backgroundImage: `url(${bgImage})`, height: "100vh", width: "100" }}>Background</div>
    )
}

export default Background