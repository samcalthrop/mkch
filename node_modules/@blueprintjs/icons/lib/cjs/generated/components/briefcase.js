"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Briefcase = void 0;
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
exports.Briefcase = React.forwardRef((props, ref) => {
    const isLarge = props.size >= iconTypes_1.IconSize.LARGE;
    const pixelGridSize = isLarge ? iconTypes_1.IconSize.LARGE : iconTypes_1.IconSize.STANDARD;
    const translation = `${-1 * pixelGridSize / 0.05 / 2}`;
    const style = { transformOrigin: "center" };
    return ((0, jsx_runtime_1.jsx)(svgIconContainer_1.SVGIconContainer, { iconName: "briefcase", ref: ref, ...props, children: (0, jsx_runtime_1.jsx)("path", { d: isLarge ? "M380 300H300V360C300 371 291 380 280 380H120C109 380 100 371 100 360V300H20C9 300 0 291 0 280V180H80V200H120V180H280V200H320V180H400V280C400 291 391 300 380 300zM260 300H140V340H260V300zM320 140H280V160H120V140H80V160H0V40C0 29 9 20 20 20H380C391 20 400 29 400 40V160H320V140z" : "M300 240.4H240V280.4C240 291.4 231 300.4 220 300.4H100C89 300.4 80 291.4 80 280.4V240.4H20C9 240.4 0 231.4 0 220.4V140.4H60V160.4H100V140.4H220V160.4H260V140.4H320V220.4C320 231.4 311 240.4 300 240.4zM200 240.4H120V260.4H200V240.4zM260 100.4H220V120.4H100V100.4H60V120.4H0V40.4C0 29.4 9 20.4 20 20.4H300C311 20.4 320 29.4 320 40.4V120.4H260V100.4z", fillRule: "evenodd", transform: `scale(0.05, -0.05) translate(${translation}, ${translation})`, style: style }) }));
});
exports.Briefcase.defaultProps = {
    size: iconTypes_1.IconSize.STANDARD,
};
exports.Briefcase.displayName = `Blueprint6.Icon.Briefcase`;
exports.default = exports.Briefcase;
//# sourceMappingURL=briefcase.js.map