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
export const WrapLines = React.forwardRef((props, ref) => {
    const isLarge = props.size >= IconSize.LARGE;
    const pixelGridSize = isLarge ? IconSize.LARGE : IconSize.STANDARD;
    const translation = `${-1 * pixelGridSize / 0.05 / 2}`;
    const style = { transformOrigin: "center" };
    return (_jsx(SVGIconContainer, { iconName: "wrap-lines", ref: ref, ...props, children: _jsx("path", { d: isLarge ? "M330 220C368.66 220 400 188.66 400 150C400 111.34 368.66 80 330 80H268.204L274.004 74.2000000000001C277.802 70.6 280 65.598 280 60C280 49 271 40 260 40C254.4 40 249.4 42.2 245.8 45.8L205.8 85.8C202.202 89.6 200 94.6 200 100C200 105.598 202.202 110.6 205.8 114.2000000000001L245.8 154.2C249.4 157.798 254.4 160 260 160C270.998 160.2 279.998 151.198 280 140C280 134.4 277.798 129.4 274.2000000000001 125.8L268.204 120H330C346.568 120 360 133.432 360 150C360 166.568 346.568 180 330 180H20C8.9543 180 0 188.954 0 200C0 211.0456 8.9543 220 20 220H330zM140 120C151.0456 120 160 111.046 160 100C160 88.954 151.0456 80 140 80H20C8.9543 80 0 88.954 0 100C0 111.046 8.9543 120 20 120H140zM380 320C391 320 400 311 400 300C400 289 391 280 380 280H20C9 280 0 289 0 300C0 311 9 320 20 320H380z" : "M250 180C288.66 180 320 148.66 320 110C320 71.34 288.66 40 250 40H208.204L214.004 34.2C217.802 30.6 220 25.598 220 20C220 9 211 0 200 0C194.4 0 189.4008 2.2 185.8008 5.8L145.8008 45.8C142.2008 49.4 140 54.4 140 60C140 65.6 142.2008 70.6 145.8008 74.2L185.8008 114.2C189.4008 117.8 194.4 120 200 120C211 120 220 111 220 100C220 94.4 217.8 89.4 214.2 85.8L208.204 80H250C266.568 80 280 93.432 280 110C280 126.5686 266.568 140 250 140H20C8.9543 140 0 148.9544 0 160C0 171.0456 8.9543 180 20 180H250zM80 80C91 80 100 71 100 60C100 49 91 40 80 40H20C9 40 0 49 0 60C0 71 9 80 20 80H80zM300 280C311 280 320 271 320 260C320 249 311 240 300 240H20C9 240 0 249 0 260C0 271 9 280 20 280H300z", fillRule: "evenodd", transform: `scale(0.05, -0.05) translate(${translation}, ${translation})`, style: style }) }));
});
WrapLines.defaultProps = {
    size: IconSize.STANDARD,
};
WrapLines.displayName = `Blueprint6.Icon.WrapLines`;
export default WrapLines;
//# sourceMappingURL=wrap-lines.js.map