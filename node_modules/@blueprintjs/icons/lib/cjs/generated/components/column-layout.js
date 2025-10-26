"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColumnLayout = void 0;
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
exports.ColumnLayout = React.forwardRef((props, ref) => {
    const isLarge = props.size >= iconTypes_1.IconSize.LARGE;
    const pixelGridSize = isLarge ? iconTypes_1.IconSize.LARGE : iconTypes_1.IconSize.STANDARD;
    const translation = `${-1 * pixelGridSize / 0.05 / 2}`;
    const style = { transformOrigin: "center" };
    return ((0, jsx_runtime_1.jsx)(svgIconContainer_1.SVGIconContainer, { iconName: "column-layout", ref: ref, ...props, children: (0, jsx_runtime_1.jsx)("path", { d: isLarge ? "M380 380H20C9 380 0 371 0 360V40C0 29 9 20 20 20H380C391 20 400 29 400 40V360C400 371 391 380 380 380zM100 60H40V340H100V60zM180 60H120V340H180V60zM360 60H200V340H360V60z" : "M300 300H20C9 300 0 291 0 280V40C0 29 9 20 20 20H300C311 20 320 29 320 40V280C320 291 311 300 300 300zM80 60H40V260H80V60zM140 60H100V260H140V60zM280 60H160V260H280V60z", fillRule: "evenodd", transform: `scale(0.05, -0.05) translate(${translation}, ${translation})`, style: style }) }));
});
exports.ColumnLayout.defaultProps = {
    size: iconTypes_1.IconSize.STANDARD,
};
exports.ColumnLayout.displayName = `Blueprint6.Icon.ColumnLayout`;
exports.default = exports.ColumnLayout;
//# sourceMappingURL=column-layout.js.map