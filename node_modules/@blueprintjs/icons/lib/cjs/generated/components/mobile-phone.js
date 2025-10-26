"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MobilePhone = void 0;
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
exports.MobilePhone = React.forwardRef((props, ref) => {
    const isLarge = props.size >= iconTypes_1.IconSize.LARGE;
    const pixelGridSize = isLarge ? iconTypes_1.IconSize.LARGE : iconTypes_1.IconSize.STANDARD;
    const translation = `${-1 * pixelGridSize / 0.05 / 2}`;
    const style = { transformOrigin: "center" };
    return ((0, jsx_runtime_1.jsx)(svgIconContainer_1.SVGIconContainer, { iconName: "mobile-phone", ref: ref, ...props, children: (0, jsx_runtime_1.jsx)("path", { d: isLarge ? "M300 400H100C89 400 80 391 80 380V20C80 9 89 0 100 0H300C311 0 320 9 320 20V380C320 391 311 400 300 400zM200 20C189 20 180 29 180 40C180 51 189 60 200 60S220 51 220 40C220 29 211 20 200 20zM280 80H120V340H280V80z" : "M240 320H80C69 320 60 311 60 300V20C60 9 69 0 80 0H240C251 0 260 9 260 20V300C260 311 251 320 240 320zM160 20C149 20 140 29 140 40C140 51 149 60 160 60S180 51 180 40C180 29 171 20 160 20zM220 80H100V260H220V80z", fillRule: "evenodd", transform: `scale(0.05, -0.05) translate(${translation}, ${translation})`, style: style }) }));
});
exports.MobilePhone.defaultProps = {
    size: iconTypes_1.IconSize.STANDARD,
};
exports.MobilePhone.displayName = `Blueprint6.Icon.MobilePhone`;
exports.default = exports.MobilePhone;
//# sourceMappingURL=mobile-phone.js.map