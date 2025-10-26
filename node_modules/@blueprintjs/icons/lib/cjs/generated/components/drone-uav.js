"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DroneUav = void 0;
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
exports.DroneUav = React.forwardRef((props, ref) => {
    const isLarge = props.size >= iconTypes_1.IconSize.LARGE;
    const pixelGridSize = isLarge ? iconTypes_1.IconSize.LARGE : iconTypes_1.IconSize.STANDARD;
    const translation = `${-1 * pixelGridSize / 0.05 / 2}`;
    const style = { transformOrigin: "center" };
    return ((0, jsx_runtime_1.jsx)(svgIconContainer_1.SVGIconContainer, { iconName: "drone-uav", ref: ref, ...props, children: (0, jsx_runtime_1.jsx)("path", { d: isLarge ? "M200 400C257.938 399.9999602548 240 320 220 280V220L400 175V160H220V80L320 60V40H218.71L217.872 20H240V0H160V20H182.129L181.289 40H80V60L180 80V160H0V175L180 220V280C160 320 142.0628 399.99998496416 200 400z" : "M160 320C206.35 320.0000103428 200 260 180 220V180L320 140V120H180V78.672L260 60V40H179.2774L178.1446 20H200V0H120V20H141.8554L140.7226 40H60V60L140 78.672V120H0V140L140 180V220C120 260 113.6504 319.9998274784 160 320z", fillRule: "evenodd", transform: `scale(0.05, -0.05) translate(${translation}, ${translation})`, style: style }) }));
});
exports.DroneUav.defaultProps = {
    size: iconTypes_1.IconSize.STANDARD,
};
exports.DroneUav.displayName = `Blueprint6.Icon.DroneUav`;
exports.default = exports.DroneUav;
//# sourceMappingURL=drone-uav.js.map