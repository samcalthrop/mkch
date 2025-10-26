import { jsx as _jsx } from "react/jsx-runtime";
/*
 * Copyright 2024 Palantir Technologies, Inc. All rights reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import * as React from "react";
import { IconSize } from "../../iconTypes";
import { SVGIconContainer } from "../../svgIconContainer";
export const Won = React.forwardRef((props, ref) => {
    const isLarge = props.size >= IconSize.LARGE;
    const pixelGridSize = isLarge ? IconSize.LARGE : IconSize.STANDARD;
    const translation = `${-1 * pixelGridSize / 0.05 / 2}`;
    const style = { transformOrigin: "center" };
    return (_jsx(SVGIconContainer, { iconName: "won", ref: ref, ...props, children: _jsx("path", { d: isLarge ? "M80 280H150L170 360H230L250 280H320L340 360H400L378.75 280H380C391.046 280 400 271.0456 400 260C400 248.9544 391.046 240 380 240H368.124L362.812 220H380C391.046 220 400 211.0456 400 200C400 188.954 391.046 180 380 180H352.188L315 40H255L217.812 180H182.1876L145 40H85L47.8124 180H20C8.9543 180 0 188.954 0 200C0 211.0456 8.9543 220 20 220H37.1876L31.875 240H20C8.9543 240 0 248.9544 0 260C0 271.0456 8.9543 280 20 280H21.25L0 360H60L80 280zM115 140L125 180H105L115 140zM275 180L285 140L295 180H275zM260 240L265 220H305L310 240H260zM95 220H135L140 240H90L95 220zM192.8124 220H207.188L201.876 240H198.125L192.8124 220z" : "M55 220H125L140 280H180L195 220H265L280 280H320L304.844 219.3946C313.548 217.2278 320 209.3742 320 200C320 188.9544 311.046 180 300 180H295L290 160H300C311.046 160 320 151.0456 320 140C320 128.9544 311.046 120 300 120H280L260 40H200L180 120H140L120 40H60L40 120H20C8.9543 120 0 128.9544 0 140C0 151.0456 8.9543 160 20 160H30L25 180H20C8.9543 180 0 188.9544 0 200C0 209.3676 6.4425 217.2214 15.13672 219.3946L0 280H40L55 220zM90 80L100 120H80L90 80zM220 120L230 80L240 120H220zM205 180L210 160H250L255 180H205zM70 160H110L115 180H65L70 160zM150 160H170L165 180H155L150 160z", fillRule: "evenodd", transform: `scale(0.05, -0.05) translate(${translation}, ${translation})`, style: style }) }));
});
Won.defaultProps = {
    size: IconSize.STANDARD,
};
Won.displayName = `Blueprint6.Icon.Won`;
export default Won;
//# sourceMappingURL=won.js.map