"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CaretLeft = void 0;
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
exports.CaretLeft = React.forwardRef((props, ref) => {
    const isLarge = props.size >= iconTypes_1.IconSize.LARGE;
    const pixelGridSize = isLarge ? iconTypes_1.IconSize.LARGE : iconTypes_1.IconSize.STANDARD;
    const translation = `${-1 * pixelGridSize / 0.05 / 2}`;
    const style = { transformOrigin: "center" };
    return ((0, jsx_runtime_1.jsx)(svgIconContainer_1.SVGIconContainer, { iconName: "caret-left", ref: ref, ...props, children: (0, jsx_runtime_1.jsx)("path", { d: isLarge ? "M260 320C255.2 320 250.8 318 247.4 315.2L247.2 315.4L127.2 215.4L127.4 215.2C123 211.4 120 206.2 120 200C120 193.8 123 188.6 127.4 184.8L127.2 184.6L247.2 84.6L247.4 84.8C250.8 82 255.2 80 260 80C271 80 280 89 280 100V300C280 311 271 320 260 320z" : "M190 240C187.4 240 185.2 239 183.4 237.4C183.4 237.4 183.4 237.4 183.4 237.4L103.4 167.4L103.4 167.4C101.4 165.6 100 163 100 160S101.4 154.4 103.4 152.6L103.4 152.6L183.4 82.6L183.4 82.6C185.2 81 187.4 80 190 80C195.6 80 200 84.4 200 90V230C200 235.6 195.6 240 190 240z", fillRule: "evenodd", transform: `scale(0.05, -0.05) translate(${translation}, ${translation})`, style: style }) }));
});
exports.CaretLeft.defaultProps = {
    size: iconTypes_1.IconSize.STANDARD,
};
exports.CaretLeft.displayName = `Blueprint6.Icon.CaretLeft`;
exports.default = exports.CaretLeft;
//# sourceMappingURL=caret-left.js.map