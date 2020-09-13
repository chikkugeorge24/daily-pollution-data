/** Config file contains Responsive bar's configurations */
export default {
    keys: [
        "bc",
        "co",
        "no2",
        "o3",
        "pm10",
        "pm25",
        "so2"
    ],
    colors: [ 
        "#f00640",
        "#de9468",
        "#00f064",
        "#4bbcfe",
        "#0f0640",
        "#810d0d",
        "#f06400"
    ],
    margin: {
        "top": 50,
        "right": 130,
        "bottom": 50,
        "left": 60
    },
    axisBottom: {
        "tickSize": 5,
        "tickPadding": 5,
        "tickRotation": 0,
        "legend": "location",
        "legendPosition": "middle",
        "legendOffset": 32
    },
    axisLeft: {
        "tickSize": 5,
        "tickPadding": 5,
        "tickRotation": 0,
        "legend": "value(µg/m³)",
        "legendPosition": "middle",
        "legendOffset": -40
    },
    legends: [
        {
            "dataFrom": "keys",
            "anchor": "bottom-right",
            "direction": "column",
            "justify": false,
            "translateX": 120,
            "translateY": 0,
            "itemsSpacing": 2,
            "itemWidth": 100,
            "itemHeight": 20,
            "itemDirection": "left-to-right",
            "itemOpacity": 0.85,
            "symbolSize": 20,
            "effects": [
                {
                    "on": "hover",
                    "style": {
                        "itemOpacity": 1
                    }
                }
            ]
        }
    ]
}