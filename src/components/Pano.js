import React, { Component, useEffect, useRef, useState } from "react";
import ReactPannellum, { getConfig, addHotSpot, mouseEventToCoords, getViewer, isLoaded } from "react-pannellum";
import './Pano.css';
import myImage from "../images/main.jpg";
import myImage2 from "../images/main.jpg";

let spotTarget = {
    pitch : 0,
    yaw : 0,
}

export const Pano = () => {

    const [spotText, setSpotText] = useState("");

    const config = {
        mediaPhoto: myImage2,
        yaww: 180,
        test: false,
        updateText: "initial",
        author: "author",
        hotspots: [],
        config: {
          autoLoad: true,
          hotSpots: [
                {
                    "pitch": -9.4,
                    "yaw": 222.6,
                    "type": "info",
                    "text": "Art Museum Drive"
                },
                {
                    "pitch": -0.9,
                    "yaw": 144.4,
                    "type": "info",
                    "text": "North Charles Street"
                },
                {
                    "pitch": -15,
                    "yaw": 165.4,
                    "type": "info",
                    "text": "North Charles Street1"
                }
          ]
        }
    };

    const ref = useRef()

    let isLoaded = false;

    useEffect(() => {
        if( !ref.current || isLoaded ) return
        setTimeout(() => {
            const viewer = getViewer()

            viewer.on('mousedown', (ev) => {
                const coords = mouseEventToCoords(ev);
                console.error(coords)
                spotTarget.pitch = coords[0]
                spotTarget.yaw = coords[1]
            })
        }, 1000);
        isLoaded = true;

    }, [ref])

    const handleAdd = () => {
        if(spotText == "") return;
        console.log(spotTarget)

        addHotSpot({
            "pitch": spotTarget.pitch,
            "yaw": spotTarget.yaw,
            "type": "info",
            "text": spotText
        }, "firstScene")

    }
    
    const handleChangeText = (e) => {
        console.log(e.target.value)
        setSpotText(e.target.value)
    }

    return (
      <div className="image_main">
        <h2 className="section_title">Image Component</h2>
        <div className="modal">
            <input type="text" onChange={handleChangeText}></input>
            <button onClick={handleAdd}>Add</button>
        </div>
        <div className="pannellum_div">
            <ReactPannellum
                ref={ref}
                id="1"
                sceneId="firstScene"
                imageSource={myImage}
                config={config.config}
            />
        </div>

      </div>
    );
}

export default Pano