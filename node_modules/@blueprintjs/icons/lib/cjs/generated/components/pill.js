"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pill = void 0;
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
exports.Pill = React.forwardRef((props, ref) => {
    const isLarge = props.size >= iconTypes_1.IconSize.LARGE;
    const pixelGridSize = isLarge ? iconTypes_1.IconSize.LARGE : iconTypes_1.IconSize.STANDARD;
    const translation = `${-1 * pixelGridSize / 0.05 / 2}`;
    const style = { transformOrigin: "center" };
    return ((0, jsx_runtime_1.jsx)(svgIconContainer_1.SVGIconContainer, { iconName: "pill", ref: ref, ...props, children: (0, jsx_runtime_1.jsx)("path", { d: isLarge ? "M100 300H200C211.046 300 220 291.0456 220 280V120C220 108.954 211.046 100 200 100H100C44.7716 100 0 144.772 0 200C0 255.2284 44.7716 300 100 300zM240 285.4546000000001C240 293.4878 246.512 300 254.546 300H300C355.2280000000001 300 400 255.2284 400 200C400 144.772 355.2280000000001 100 300 100H254.546C246.512 100 240 106.512 240 114.546V285.4546000000001zM300 140C333.1380000000001 140 360 166.862 360 200C360 233.137 333.1380000000001 260 300 260H280V140H300z" : "M80 240H145.4546C153.4878 240 160 233.4878 160 225.4546V94.546C160 86.512 153.4878 80 145.4546 80H80C35.8172 80 0 115.818 0 160C0 204.1828 35.8172 240 80 240zM320 160C320 115.818 284.182 80 240 80H192.7272C185.6982 80 180 85.698 180 92.728V227.2728C180 234.3018 185.6982 240 192.7272 240H240C284.182 240 320 204.1828 320 160zM240 200H220V120H240C262.092 120 280 137.9086 280 160S262.092 200 240 200z", fillRule: "evenodd", transform: `scale(0.05, -0.05) translate(${translation}, ${translation})`, style: style }) }));
});
exports.Pill.defaultProps = {
    size: iconTypes_1.IconSize.STANDARD,
};
exports.Pill.displayName = `Blueprint6.Icon.Pill`;
exports.default = exports.Pill;
//# sourceMappingURL=pill.js.map