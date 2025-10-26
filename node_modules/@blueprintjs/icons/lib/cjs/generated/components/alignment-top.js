"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlignmentTop = void 0;
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
exports.AlignmentTop = React.forwardRef((props, ref) => {
    const isLarge = props.size >= iconTypes_1.IconSize.LARGE;
    const pixelGridSize = isLarge ? iconTypes_1.IconSize.LARGE : iconTypes_1.IconSize.STANDARD;
    const translation = `${-1 * pixelGridSize / 0.05 / 2}`;
    const style = { transformOrigin: "center" };
    return ((0, jsx_runtime_1.jsx)(svgIconContainer_1.SVGIconContainer, { iconName: "alignment-top", ref: ref, ...props, children: (0, jsx_runtime_1.jsx)("path", { d: isLarge ? "M160 320H80C69 320 60 311 60 300V20C60 9 69 0 80 0H160C171 0 180 9 180 20V300C180 311 171 320 160 320zM380 400H20C9 400 0 391 0 380S9 360 20 360H380C391 360 400 369 400 380S391 400 380 400zM320 320H240C229 320 220 311 220 300V160C220 149 229 140 240 140H320C331 140 340 149 340 160V300C340 311 331 320 320 320z" : "M300 320H20C9 320 0 311 0 300S9 280 20 280H300C311 280 320 289 320 300S311 320 300 320zM120 240H60C49 240 40 231 40 220V40C40 29 49 20 60 20H120C131 20 140 29 140 40V220C140 231 131 240 120 240zM260 240H200C189 240 180 231 180 220V140C180 129 189 120 200 120H260C271 120 280 129 280 140V220C280 231 271 240 260 240z", fillRule: "evenodd", transform: `scale(0.05, -0.05) translate(${translation}, ${translation})`, style: style }) }));
});
exports.AlignmentTop.defaultProps = {
    size: iconTypes_1.IconSize.STANDARD,
};
exports.AlignmentTop.displayName = `Blueprint6.Icon.AlignmentTop`;
exports.default = exports.AlignmentTop;
//# sourceMappingURL=alignment-top.js.map