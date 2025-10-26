"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Projects = void 0;
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
exports.Projects = React.forwardRef((props, ref) => {
    const isLarge = props.size >= iconTypes_1.IconSize.LARGE;
    const pixelGridSize = isLarge ? iconTypes_1.IconSize.LARGE : iconTypes_1.IconSize.STANDARD;
    const translation = `${-1 * pixelGridSize / 0.05 / 2}`;
    const style = { transformOrigin: "center" };
    return ((0, jsx_runtime_1.jsx)(svgIconContainer_1.SVGIconContainer, { iconName: "projects", ref: ref, ...props, children: (0, jsx_runtime_1.jsx)("path", { d: isLarge ? "M360 320C360 331 351 340 340 340H60C49 340 40 331 40 320V280H360V320zM320 380C320 391 311 400 300 400H100C89 400 80 391 80 380V360H320V380zM380 260H20C9 260 0 251 0 240V20C0 9 9 0 20 0H380C391 0 400 9 400 20V240C400 251 391 260 380 260zM280 120C280 109 271 100 260 100H140C129 100 120 109 120 120V160H140V120H260V160H280V120z" : "M280 260C280 271 271 280 260 280H60C49 280 40 271 40 260V240H280V260zM240 320H80C69 320 60 311 60 300H260C260 311 251 320 240 320zM300 220H20C9 220 0 211 0 200V20C0 9 9 0 20 0H300C311 0 320 9 320 20V200C320 211 311 220 300 220zM240 100C240 89 231 80 220 80H100C89 80 80 89 80 100V140H100V100H220V140H240V100z", fillRule: "evenodd", transform: `scale(0.05, -0.05) translate(${translation}, ${translation})`, style: style }) }));
});
exports.Projects.defaultProps = {
    size: iconTypes_1.IconSize.STANDARD,
};
exports.Projects.displayName = `Blueprint6.Icon.Projects`;
exports.default = exports.Projects;
//# sourceMappingURL=projects.js.map