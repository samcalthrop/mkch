"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LayoutLeftColumnTwoTiles = void 0;
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
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
const React = tslib_1.__importStar(require("react"));
const iconTypes_1 = require("../../iconTypes");
const svgIconContainer_1 = require("../../svgIconContainer");
exports.LayoutLeftColumnTwoTiles = React.forwardRef((props, ref) => {
    const isLarge = props.size >= iconTypes_1.IconSize.LARGE;
    const pixelGridSize = isLarge ? iconTypes_1.IconSize.LARGE : iconTypes_1.IconSize.STANDARD;
    const translation = `${-1 * pixelGridSize / 0.05 / 2}`;
    const style = { transformOrigin: "center" };
    return ((0, jsx_runtime_1.jsx)(svgIconContainer_1.SVGIconContainer, { iconName: "layout-left-column-two-tiles", ref: ref, ...props, children: (0, jsx_runtime_1.jsx)("path", { d: isLarge ? "M0 380C0 391.0457 8.9543 400 20 400H160C171.0456 400 180 391.0457 180 380V240C180 228.9544 171.0456 220 160 220H20C8.9543 220 0 228.9544 0 240V380zM0 160C0 171.046 8.9543 180 20 180H160C171.0456 180 180 171.046 180 160V20C180 8.954 171.0456 0 160 0H20C8.9543 0 0 8.954 0 20V160zM220 380C220 391.04568 228.954 400 240 400H380C391.046 400 400 391.0457 400 380V20C400 8.954 391.046 0 380 0H240C228.954 0 220 8.954 220 20V380z" : "M140 300C140 311.0457 131.0456 320 120 320H20C8.9543 320 0 311.0457 0 300V200C0 188.9544 8.9543 180 20 180H120C131.0456 180 140 188.9544 140 200V300zM140 120C140 131.0456 131.0456 140 120 140H20C8.9543 140 0 131.0456 0 120V20C0 8.954 8.9543 0 20 0H120C131.0456 0 140 8.954 140 20V120zM320 300C320 311.0457 311.046 320 300 320H200C188.9544 320 180 311.0457 180 300V20C180 8.954 188.9544 0 200 0H300C311.046 0 320 8.954 320 20V300z", fillRule: "evenodd", transform: `scale(0.05, -0.05) translate(${translation}, ${translation})`, style: style }) }));
});
exports.LayoutLeftColumnTwoTiles.defaultProps = {
    size: iconTypes_1.IconSize.STANDARD,
};
exports.LayoutLeftColumnTwoTiles.displayName = `Blueprint6.Icon.LayoutLeftColumnTwoTiles`;
exports.default = exports.LayoutLeftColumnTwoTiles;
//# sourceMappingURL=layout-left-column-two-tiles.js.map