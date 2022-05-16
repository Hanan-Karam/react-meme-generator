import React from "react";

export default function Form() {
      const [meme, setMemeImage] = React.useState({
        topText: "",
        bottomText: "",
        randomImage: "http://i.imgflip.com/1bij.jpg"
        })
    

    const [allMemes, setAllMemes] = React.useState([])

   
    function getImage(){
    //const memesArray = allMemes.data.memes;
    const randomIndex = Math.floor(Math.random() * allMemes.length);
    const url = allMemes[randomIndex].url;
    setMemeImage((prevMeme) => {
        return {...prevMeme,
                randomImage: url
        }
    });
    }
        function addTextToImage(event){
        const {name, value} = event.target
        setMemeImage(prevMeme => ({
                ...prevMeme,
                [name]:value
        }))
    }
     
    
    React.useEffect(() =>{
        fetch("https://api.imgflip.com/get_memes")
        .then(res => res.json())
        .then(data => setAllMemes(data.data.memes))
    }, [])
    
    
    return (
        <div>
            <div className="form">
                <input 
                type="text" 
                name="topText"  
                className="form--input" 
                placeholder="Top text"
                value={meme.topText}
                onChange={addTextToImage}
                />
                
                <input 
                type="text" 
                name="bottomText"  
                className="form--input"
                placeholder="Bottom text"
                onChange={addTextToImage}
                value={meme.bottomText}
                />
                <button onClick={getImage} >Get a new meme image 🖼</button>
            </div>
            
            <div className ="meme">
                <img src={meme.randomImage} className="meme--img"/>
                <h2 className="meme--text top">{meme.topText}</h2>
                <h2 className="meme--text bottom">{meme.bottomText}</h2>
                
            </div>
        </div>
    )
    
    
}