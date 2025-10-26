"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Barcode = void 0;
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
exports.Barcode = React.forwardRef((props, ref) => {
    const isLarge = props.size >= iconTypes_1.IconSize.LARGE;
    const pixelGridSize = isLarge ? iconTypes_1.IconSize.LARGE : iconTypes_1.IconSize.STANDARD;
    const translation = `${-1 * pixelGridSize / 0.05 / 2}`;
    const style = { transformOrigin: "center" };
    return ((0, jsx_runtime_1.jsx)(svgIconContainer_1.SVGIconContainer, { iconName: "barcode", ref: ref, ...props, children: (0, jsx_runtime_1.jsx)("path", { d: isLarge ? "M120 60.4H160V340.4H120V60.4zM180 60.4H200V340.4H180V60.4zM60 60.4H100V340.4H60V60.4zM0 60.4H40V340.4H0V60.4zM320 60.4H360V340.4H320V60.4zM240 60.4H260V340.4H240V60.4zM380 340.4V60.4H400V340.4H380zM280 60.4H300V340.4H280V60.4z" : "M0 40H40V280H0V40zM120 40H140V280H120V40zM160 40H180V280H160V40zM60 40H100V280H60V40zM300 280V40H320V280H300zM200 40H220V280H200V40zM240 40H280V280H240V40z", fillRule: "evenodd", transform: `scale(0.05, -0.05) translate(${translation}, ${translation})`, style: style }) }));
});
exports.Barcode.defaultProps = {
    size: iconTypes_1.IconSize.STANDARD,
};
exports.Barcode.displayName = `Blueprint6.Icon.Barcode`;
exports.default = exports.Barcode;
//# sourceMappingURL=barcode.js.map