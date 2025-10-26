"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsoleAlert = void 0;
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
exports.ConsoleAlert = React.forwardRef((props, ref) => {
    const isLarge = props.size >= iconTypes_1.IconSize.LARGE;
    const pixelGridSize = isLarge ? iconTypes_1.IconSize.LARGE : iconTypes_1.IconSize.STANDARD;
    const translation = `${-1 * pixelGridSize / 0.05 / 2}`;
    const style = { transformOrigin: "center" };
    return ((0, jsx_runtime_1.jsx)(svgIconContainer_1.SVGIconContainer, { iconName: "console-alert", ref: ref, ...props, children: (0, jsx_runtime_1.jsx)("path", { d: isLarge ? "M300 280H40V60H360V160C375.39 160 389.38 165.846 400 175.372V40C400 29 391 20 380 20H20C9 20 0 29 0 40V360C0 371 9 380 20 380H300V280zM80 240C85.6 240 90.5992 237.7992 94.1992 234.1992L134.1992 194.2C137.7992 190.6 140 185.6 140 180C140 174.4 137.7992 169.4 134.1992 165.8L94.1992 125.8C90.5992 122.2 85.6 120 80 120C69 120 60 129 60 140C60 145.6 62.2008 150.6 65.8008 154.2L91.7968 180L65.8008 205.8008C62.2008 209.4008 60 214.4 60 220C60 231 69 240 80 240zM240 160C251 160 260 151 260 140C260 129 251 120 240 120H180C169 120 160 129 160 140C160 151 169 160 180 160H240zM360 240C371.046 240 380 231.0456 380 220C380 208.9544 371.046 200 360 200C348.954 200 340 208.9544 340 220C340 231.0456 348.954 240 360 240zM360 400C371.046 400 380 391.0457 380 380V280C380 268.9544 371.046 260 360 260C348.954 260 340 268.9544 340 280V380C340 391.0457 348.954 400 360 400z" : "M260 300C260 311.0457 268.954 320 280 320C291.046 320 300 311.0457 300 300V240C300 228.9544 291.046 220 280 220C268.954 220 260 228.9544 260 240V300zM260 180C260 191.0456 268.954 200 280 200C291.046 200 300 191.0456 300 180C300 168.9544 291.046 160 280 160C268.954 160 260 168.9544 260 180zM20 300H220V240C220 232.9872 221.204 226.2556 223.414 220H40V60H280V120C295.368 120 309.384 125.777 320 135.2778V40C320 29 311 20 300 20H20C9 20 0 29 0 40V280C0 291 9 300 20 300zM80 200C85.6 200 90.6 197.8 94.2 194.2L134.2 154.2C137.8 150.6 140 145.6 140 140C140 134.4 137.8 129.4 134.2 125.8L94.2 85.8C90.6 82.2 85.6 80 80 80C69 80 60 89 60 100C60 105.6 62.2 110.6 65.8 114.2L91.8 140L65.8 165.8C62.2 169.4 60 174.4 60 180C60 191 69 200 80 200zM180 120H240C251 120 260 111 260 100C260 89 251 80 240 80H180C169 80 160 89 160 100C160 111 169 120 180 120z", fillRule: "evenodd", transform: `scale(0.05, -0.05) translate(${translation}, ${translation})`, style: style }) }));
});
exports.ConsoleAlert.defaultProps = {
    size: iconTypes_1.IconSize.STANDARD,
};
exports.ConsoleAlert.displayName = `Blueprint6.Icon.ConsoleAlert`;
exports.default = exports.ConsoleAlert;
//# sourceMappingURL=console-alert.js.map