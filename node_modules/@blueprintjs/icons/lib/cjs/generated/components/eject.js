"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Eject = void 0;
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
exports.Eject = React.forwardRef((props, ref) => {
    const isLarge = props.size >= iconTypes_1.IconSize.LARGE;
    const pixelGridSize = isLarge ? iconTypes_1.IconSize.LARGE : iconTypes_1.IconSize.STANDARD;
    const translation = `${-1 * pixelGridSize / 0.05 / 2}`;
    const style = { transformOrigin: "center" };
    return ((0, jsx_runtime_1.jsx)(svgIconContainer_1.SVGIconContainer, { iconName: "eject", ref: ref, ...props, children: (0, jsx_runtime_1.jsx)("path", { d: isLarge ? "M80 160H320C331 160 340 169 340 180C340 185 338 189.4 335 192.8L335.2000000000001 193L215.2000000000001 333L215 332.8C211.4 337.2 206 340 200 340S188.6 337.2 185 332.8C185 332.8 184.8 333 184.8 333L64.8 193L65 192.8C62 189.4 60 185 60 180C60 169 69 160 80 160zM320 140H80C69 140 60 131 60 120V80C60 69 69 60 80 60H320C331 60 340 69 340 80V120C340 131 331 140 320 140z" : "M80 140H240C251 140 260 149 260 160C260 165.6 257.8 170.6 254.2 174.2L174.2 254.2C170.6 257.8 165.6 260 160 260S149.4 257.8 145.8 254.2L65.8 174.2C62.2 170.6 60 165.6 60 160C60 149 69 140 80 140zM240 120H80C69 120 60 111 60 100V80C60 69 69 60 80 60H240C251 60 260 69 260 80V100C260 111 251 120 240 120z", fillRule: "evenodd", transform: `scale(0.05, -0.05) translate(${translation}, ${translation})`, style: style }) }));
});
exports.Eject.defaultProps = {
    size: iconTypes_1.IconSize.STANDARD,
};
exports.Eject.displayName = `Blueprint6.Icon.Eject`;
exports.default = exports.Eject;
//# sourceMappingURL=eject.js.map