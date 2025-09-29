import React, { useState } from "react";
import Button from 'react-bootstrap/Button';

function KnittingCalculator() {
    const [gaugeInPattern, setGaugeInPattern] = useState("");
    const [stitchesInPattern, setStitchesInPattern] = useState("");
    const [myGauge, setMyGauge] = useState("");
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const handleClick = async () => {
        setLoading(true);
        setError(null);
        setResult(null);

        try {
            const response = await fetch(
                `/adjust-stitches?patternGauge=${gaugeInPattern}&patternStitches=${stitchesInPattern}&myGauge=${myGauge}`
            );

            if (!response.ok) {
                throw new Error("Något gick fel med API-anropet");
            }

            const data = await response.json();
            setResult(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
            <h1>Knitting Input Test</h1>
            <div>
                <label></label>
                Mönstrets stickfasthet:
                <input
                    type="text"
                    value={gaugeInPattern}
                    onChange={(e) => setGaugeInPattern(e.target.value)}
                    style={{ marginLeft: "0.5rem" }}
                />

                <label>
                    Antalet maskor i mönstret:
                    <input
                        type="text"
                        value={stitchesInPattern}
                        onChange={(e) => setStitchesInPattern(e.target.value)}
                        style={{ marginLeft: "0.5rem" }}
                    />
                </label>
                <label>
                    Min stickfasthet:
                    <input
                        type="text"
                        value={myGauge}
                        onChange={(e) => setMyGauge(e.target.value)}
                        style={{ marginLeft: "0.5rem" }}
                    />
                </label>
            </div>
            <Button variant="contained" color="primary" onClick={handleClick}>
                Calculate
            </Button>

            {error && <p style={{ color: "red" }}>{error}</p>}
            {result && (
                <ul>
                    {Object.entries(result).map(([key, value]) => (
                        <li key={key}>
                            {key}: {value}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default KnittingCalculator;
