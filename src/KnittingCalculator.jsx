import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";

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

            const data = await response.json();
            setResult(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-5" style={{ maxWidth: "500px" }}>
            <h2 className="mb-4 text-center">Knitting Calculator</h2>

            <div className="mb-3">
                <label className="form-label">Mönstrets stickfasthet:</label>
                <input
                    type="number"
                    className="form-control"
                    value={gaugeInPattern}
                    onChange={(e) => setGaugeInPattern(e.target.value)}
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Antalet maskor i mönstret:</label>
                <input
                    type="number"
                    className="form-control"
                    value={stitchesInPattern}
                    onChange={(e) => setStitchesInPattern(e.target.value)}
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Min stickfasthet:</label>
                <input
                    type="number"
                    className="form-control"
                    value={myGauge}
                    onChange={(e) => setMyGauge(e.target.value)}
                />
            </div>

            <Button
                variant="primary"
                className="w-100 mb-3"
                onClick={handleClick}
                disabled={loading}
            >
                {loading ? "Beräknar..." : "Beräkna"}
            </Button>

            {error && <p className="text-danger">{error}</p>}

            {result && (
                <div className="mt-3 p-3 border rounded bg-light">
                    <h5>Resultat:</h5>
                    <ul className="mb-0">
                        {Object.entries(result).map(([key, value]) => (
                            <li key={key}>
                                <strong>{key}:</strong> {value}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default KnittingCalculator;
