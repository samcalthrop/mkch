"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArrowTopLeft = void 0;
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
exports.ArrowTopLeft = React.forwardRef((props, ref) => {
    const isLarge = props.size >= iconTypes_1.IconSize.LARGE;
    const pixelGridSize = isLarge ? iconTypes_1.IconSize.LARGE : iconTypes_1.IconSize.STANDARD;
    const translation = `${-1 * pixelGridSize / 0.05 / 2}`;
    const style = { transformOrigin: "center" };
    return ((0, jsx_runtime_1.jsx)(svgIconContainer_1.SVGIconContainer, { iconName: "arrow-top-left", ref: ref, ...props, children: (0, jsx_runtime_1.jsx)("path", { d: isLarge ? "M354.2000000000001 74.2000000000001L108.2 320H260C271 320 280 329 280 340C280 351 271 360 260 360H60C49 360 40 351 40 340V140C40 129 49 120 60 120S80 129 80 140V291.8L325.8 46C329.4 42.2 334.4 40 340 40C351 40 360 49 360 60C360 65.6 357.8 70.6 354.2000000000001 74.2000000000001z" : "M274.2000000000001 74.2L108.2 240H200C211 240 220 249 220 260C220 271 211 280 200 280H60C49 280 40 271 40 260V120C40 109 49 100 60 100S80 109 80 120V211.8L245.8 46C249.4 42.2 254.4 40 260 40C271 40 280 49 280 60C280 65.6 277.8 70.6 274.2000000000001 74.2z", fillRule: "evenodd", transform: `scale(0.05, -0.05) translate(${translation}, ${translation})`, style: style }) }));
});
exports.ArrowTopLeft.defaultProps = {
    size: iconTypes_1.IconSize.STANDARD,
};
exports.ArrowTopLeft.displayName = `Blueprint6.Icon.ArrowTopLeft`;
exports.default = exports.ArrowTopLeft;
//# sourceMappingURL=arrow-top-left.js.map