import gradientParser from "gradient-parser";

/**
 *
 * @param {string} css
 * @param {string|function} svgId
 * @param {object|function} props
 * @returns List of all parsed gradients as SVG XML strings
 */
export default function(css = "", id = "css-2-svg-gradient-%i", props = {}) {
    return gradientParser
        .parse(css)
        .map((gradient) =>
            gradient.type === "radial-gradient"
                ? radialGradient(gradient)
                : linearGradient(gradient),
        )
        .map((xmls, i) => {
            // Generate the attributes
            const attrs = {
                id: (typeof id === "function" ? id(i) : id).replace(/%i/gm, i),
                ...(typeof props === "function" ? props(i) : props),
            };
            // Turn them into an XML compatible string
            const attrStr = Object.keys(attrs).reduce(
                (prev, cur) => `${prev} ${cur}="${attrs[cur]}"`,
                "",
            );
            // Insert the attributes into the string
            return xmls.replace(attrRegex, `$1 ${attrStr} $2`);
        });
}

// Regex to insert the attributes on the generated tags
const attrRegex = new RegExp(/^(<(?:linear|radial)Gradient)([^>]*>)/gm);

function linearGradient({ orientation, colorStops }) {
    const { x1, x2, y1, y2 } = positionsForOrientation(orientation);
    const getColorStops = (colorStop, index) => {
        const offset = (index / (colorStops.length - 1)) * 100 + "%";
        let stopColor = "rgb(0,0,0)";
        let stopOpacity = 1.0;
        switch (colorStop.type) {
            case "rgb": {
                const [r, g, b] = colorStop.value;
                stopColor = `rgb(${r},${g},${b})`;
                break;
            }
            case "rgba": {
                const [r, g, b, a] = colorStop.value;
                stopColor = `rgb(${r},${g},${b})`;
                stopOpacity = Number(a);
                break;
            }
            case "hex": {
                stopColor = `#${colorStop.value}`;
                break;
            }
            case "literal": {
                stopColor = colorStop.value;
                break;
            }
            default:
              throw new Error(`Unknown colorStop "${colorStop.type}"`);
        }
        return `<stop offset="${offset}" style="stop-color:${stopColor};stop-opacity:${stopOpacity}" />`;
    };
    return `<linearGradient x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}">${colorStops
        .map(getColorStops)
        .join("")}</linearGradient>`;
}

function radialGradient(gradient) {
    return "<radialGradient />";
}

const positionsForOrientation = (orientation = "directional") => {
    const positions = {
        x1: "0%",
        x2: "0%",
        y1: "0%",
        y2: "0%",
    };
    if (orientation.type === "angular") {
        const anglePI = orientation.value * (Math.PI / 180);
        positions.x1 = Math.round(50 + Math.sin(anglePI + Math.PI) * 50) + "%";
        positions.y1 = Math.round(50 + Math.cos(anglePI) * 50) + "%";
        positions.x2 = Math.round(50 + Math.sin(anglePI) * 50) + "%";
        positions.y2 = Math.round(50 + Math.cos(anglePI + Math.PI) * 50) + "%";
    } else if (orientation.type === "directional") {
        switch (orientation.value) {
            case "left":
                positions.x1 = "100%";
                break;
            case "top":
                positions.y1 = "100%";
                break;
            case "right":
                positions.x2 = "100%";
                break;
            case "bottom":
                positions.y2 = "100%";
                break;
            default:
                throw new Error(`Invalid orientation value: ${orientation.value}`);
        }
    }
    return positions;
};
