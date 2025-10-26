"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageLayout = void 0;
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
exports.PageLayout = React.forwardRef((props, ref) => {
    const isLarge = props.size >= iconTypes_1.IconSize.LARGE;
    const pixelGridSize = isLarge ? iconTypes_1.IconSize.LARGE : iconTypes_1.IconSize.STANDARD;
    const translation = `${-1 * pixelGridSize / 0.05 / 2}`;
    const style = { transformOrigin: "center" };
    return ((0, jsx_runtime_1.jsx)(svgIconContainer_1.SVGIconContainer, { iconName: "page-layout", ref: ref, ...props, children: (0, jsx_runtime_1.jsx)("path", { d: isLarge ? "M380 380H20C9 380 0 371 0 360V40C0 29 9 20 20 20H380C391 20 400 29 400 40V360C400 371 391 380 380 380zM140 60H40V240H140V60zM360 60H160V240H360V60zM360 260H40V340H360V260z" : "M300 301H20C9 301 0 292 0 281V41C0 30 9 21 20 21H300C311 21 320 30 320 41V281C320 292 311 301 300 301zM120 61H40V181H120V61zM280 61H140V181H280V61zM280 201H40V261H280V201z", fillRule: "evenodd", transform: `scale(0.05, -0.05) translate(${translation}, ${translation})`, style: style }) }));
});
exports.PageLayout.defaultProps = {
    size: iconTypes_1.IconSize.STANDARD,
};
exports.PageLayout.displayName = `Blueprint6.Icon.PageLayout`;
exports.default = exports.PageLayout;
//# sourceMappingURL=page-layout.js.map