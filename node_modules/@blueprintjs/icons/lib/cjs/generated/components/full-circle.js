"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FullCircle = void 0;
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
exports.FullCircle = React.forwardRef((props, ref) => {
    const isLarge = props.size >= iconTypes_1.IconSize.LARGE;
    const pixelGridSize = isLarge ? iconTypes_1.IconSize.LARGE : iconTypes_1.IconSize.STANDARD;
    const translation = `${-1 * pixelGridSize / 0.05 / 2}`;
    const style = { transformOrigin: "center" };
    return ((0, jsx_runtime_1.jsx)(svgIconContainer_1.SVGIconContainer, { iconName: "full-circle", ref: ref, ...props, children: (0, jsx_runtime_1.jsx)("path", { d: isLarge ? "M-0.8 200A200 200 0 0 1 399.2000000000001 200A200 200 0 0 1 -0.8 200" : "M0 160A160 160 0 0 1 320 160A160 160 0 0 1 0 160", fillRule: "evenodd", transform: `scale(0.05, -0.05) translate(${translation}, ${translation})`, style: style }) }));
});
exports.FullCircle.defaultProps = {
    size: iconTypes_1.IconSize.STANDARD,
};
exports.FullCircle.displayName = `Blueprint6.Icon.FullCircle`;
exports.default = exports.FullCircle;
//# sourceMappingURL=full-circle.js.map