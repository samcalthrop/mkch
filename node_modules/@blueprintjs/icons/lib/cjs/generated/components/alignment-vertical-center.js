"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlignmentVerticalCenter = void 0;
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
exports.AlignmentVerticalCenter = React.forwardRef((props, ref) => {
    const isLarge = props.size >= iconTypes_1.IconSize.LARGE;
    const pixelGridSize = isLarge ? iconTypes_1.IconSize.LARGE : iconTypes_1.IconSize.STANDARD;
    const translation = `${-1 * pixelGridSize / 0.05 / 2}`;
    const style = { transformOrigin: "center" };
    return ((0, jsx_runtime_1.jsx)(svgIconContainer_1.SVGIconContainer, { iconName: "alignment-vertical-center", ref: ref, ...props, children: (0, jsx_runtime_1.jsx)("path", { d: isLarge ? "M340 340H220V380C220 391 211 400 200 400S180 391 180 380V340H60C49 340 40 331 40 320V240C40 229 49 220 60 220H180V180H140C129 180 120 171 120 160V80C120 69 129 60 140 60H180V20C180 9 189 0 200 0S220 9 220 20V60H260C271 60 280 69 280 80V160C280 171 271 180 260 180H220V220H340C351 220 360 229 360 240V320C360 331 351 340 340 340z" : "M260 280H180V300C180 311 171 320 160 320S140 311 140 300V280H60C49 280 40 271 40 260V200C40 189 49 180 60 180H140V140H120C109 140 100 131 100 120V60C100 49 109 40 120 40H140V20C140 9 149 0 160 0S180 9 180 20V40H200C211 40 220 49 220 60V120C220 131 211 140 200 140H180V180H260C271 180 280 189 280 200V260C280 271 271 280 260 280z", fillRule: "evenodd", transform: `scale(0.05, -0.05) translate(${translation}, ${translation})`, style: style }) }));
});
exports.AlignmentVerticalCenter.defaultProps = {
    size: iconTypes_1.IconSize.STANDARD,
};
exports.AlignmentVerticalCenter.displayName = `Blueprint6.Icon.AlignmentVerticalCenter`;
exports.default = exports.AlignmentVerticalCenter;
//# sourceMappingURL=alignment-vertical-center.js.map