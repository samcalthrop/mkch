"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoveColumn = void 0;
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
exports.RemoveColumn = React.forwardRef((props, ref) => {
    const isLarge = props.size >= iconTypes_1.IconSize.LARGE;
    const pixelGridSize = isLarge ? iconTypes_1.IconSize.LARGE : iconTypes_1.IconSize.STANDARD;
    const translation = `${-1 * pixelGridSize / 0.05 / 2}`;
    const style = { transformOrigin: "center" };
    return ((0, jsx_runtime_1.jsx)(svgIconContainer_1.SVGIconContainer, { iconName: "remove-column", ref: ref, ...props, children: (0, jsx_runtime_1.jsx)("path", { d: isLarge ? "M380 400H100C89 400 80 391 80 380V300H120V360H220V40H120V100H80V20C80 9 89 0 100 0H380C391 0 400 9 400 20V380C400 391 391 400 380 400zM360 40H260V360H360V40zM125.8 125.8C129.4 122.2 134.4 120 140 120C151 120 160 129 160 140C160 145.6 157.8 150.6 154.2 154.2L108.2 200L154 245.8C157.8 249.4 160 254.4 160 260C160 271 151 280 140 280C134.4 280 129.4 277.8 125.8 274.2L80 228.2L34.2 274.2C30.6 277.8 25.6 280 20 280C9 280 0 271 0 260C0 254.4 2.2 249.4 5.8 245.8L51.8 200L6 154.2C2.2 150.6 0 145.6 0 140C0 129 9 120 20 120C25.6 120 30.6 122.2 34.2 125.8L80 171.8L125.8 125.8z" : "M280 320H80C69 320 60 311 60 300V240H100V280H160V40H100V80H60V20C60 9 69 0 80 0H280C291 0 300 9 300 20V300C300 311 291 320 280 320zM260 40H200V280H260V40zM85.8 105.8C89.4 102.2 94.4 100 100 100C111 100 120 109 120 120C120 125.6 117.8 130.6 114.2 134.2L88.2 160L114 185.8C117.8 189.4 120 194.4 120 200C120 211 111 220 100 220C94.4 220 89.4 217.8 85.8 214.2L60 188.2L34.2 214.2C30.6 217.8 25.6 220 20 220C9 220 0 211 0 200C0 194.4 2.2 189.4 5.8 185.8L31.8 160L5.8 134.2C2.2 130.6 0 125.6 0 120C0 109 9 100 20 100C25.6 100 30.6 102.2 34.2 105.8L60 131.8L85.8 105.8z", fillRule: "evenodd", transform: `scale(0.05, -0.05) translate(${translation}, ${translation})`, style: style }) }));
});
exports.RemoveColumn.defaultProps = {
    size: iconTypes_1.IconSize.STANDARD,
};
exports.RemoveColumn.displayName = `Blueprint6.Icon.RemoveColumn`;
exports.default = exports.RemoveColumn;
//# sourceMappingURL=remove-column.js.map