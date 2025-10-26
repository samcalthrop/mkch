"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.More = void 0;
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
exports.More = React.forwardRef((props, ref) => {
    const isLarge = props.size >= iconTypes_1.IconSize.LARGE;
    const pixelGridSize = isLarge ? iconTypes_1.IconSize.LARGE : iconTypes_1.IconSize.STANDARD;
    const translation = `${-1 * pixelGridSize / 0.05 / 2}`;
    const style = { transformOrigin: "center" };
    return ((0, jsx_runtime_1.jsx)(svgIconContainer_1.SVGIconContainer, { iconName: "more", ref: ref, ...props, children: (0, jsx_runtime_1.jsx)("path", { d: isLarge ? "M20 190A50 50 0 0 1 120 190A50 50 0 0 1 20 190M300 190A50 50 0 0 1 400 190A50 50 0 0 1 300 190M160 190A50 50 0 0 1 260 190A50 50 0 0 1 160 190" : "M0 159.4A40 40 0 0 1 80 159.4A40 40 0 0 1 0 159.4M240 159.4A40 40 0 0 1 320 159.4A40 40 0 0 1 240 159.4M120 159.4A40 40 0 0 1 200 159.4A40 40 0 0 1 120 159.4", fillRule: "evenodd", transform: `scale(0.05, -0.05) translate(${translation}, ${translation})`, style: style }) }));
});
exports.More.defaultProps = {
    size: iconTypes_1.IconSize.STANDARD,
};
exports.More.displayName = `Blueprint6.Icon.More`;
exports.default = exports.More;
//# sourceMappingURL=more.js.map